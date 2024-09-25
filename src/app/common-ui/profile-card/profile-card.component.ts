import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Profile} from "../../data/interfaces/profile.interface";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
  @Output() onDelete = new EventEmitter<number>();

  deleteProfile() {
    this.onDelete.emit(this.profile.id)
  }
}
