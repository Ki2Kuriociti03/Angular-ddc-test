import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "../../common-ui/profile-card/profile-card.component";
import {ProfileService} from "../../data/services/profile.service";
import {Profile, Resource} from "../../data/interfaces/profile.interface";
import {ProfileResourcesComponent} from "../../common-ui/profile-resources/profile-resources.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileResourcesComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  profileService = inject(ProfileService)
  profiles: Profile[] = []
  resources: Resource[] = []

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(value => {
        this.profiles = value
      })

    this.profileService.getTestResources()
      .subscribe(value => {
        this.resources = value
      })
  }

  handleDelete(profileId: number) {
    this.profileService.deleteProfile(profileId).subscribe(response => {
      console.log('Ответ сервера при удалении:', response); // Вывод ответа сервера в консоль
      this.profiles = this.profiles.filter(profile => profile.id !== profileId);
    }, error => {
      console.error('Ошибка при удалении профиля:', error);
    });
  }
}
