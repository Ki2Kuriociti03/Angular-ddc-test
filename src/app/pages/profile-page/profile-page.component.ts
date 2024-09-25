import {Component, inject} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {ProfileService} from "../../data/services/profile.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {switchMap} from "rxjs";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Profile} from "../../data/interfaces/profile.interface";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    JsonPipe,
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)


  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => this.profileService.getAccount(id))
    );

  editableProfile!: Profile;
  editMode = false;
  newAvatarFile: File | null = null
  newAvatarUrl: string | null = null;

  enableEditMode () {
    this.profile$.subscribe(profile => {
      this.editableProfile = {...profile}
      this.editMode = true
    })
  }

  onAvatarSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.newAvatarFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newAvatarUrl = e.target.result;
      };
      reader.readAsDataURL(this.newAvatarFile);
    }
  }

  submitProfile() {
    if (this.editableProfile) {
      const updatedProfile = {
        ...this.editableProfile,
        avatar: this.newAvatarUrl || this.editableProfile.avatar
      };

      this.profileService.updateAccount(updatedProfile).subscribe(updatedProfileResponse => {
        this.editMode = false;
        console.log('Профиль обновлен:', updatedProfileResponse);
      });
    }
  }

  cancelEditMode() {
    this.editMode = false;
    this.newAvatarFile = null;
    this.newAvatarUrl = null;
  }
}
