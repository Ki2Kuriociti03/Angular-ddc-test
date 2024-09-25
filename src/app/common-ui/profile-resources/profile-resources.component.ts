import {Component, Input} from '@angular/core';
import {Resource} from "../../data/interfaces/profile.interface";

@Component({
  selector: 'app-profile-resources',
  standalone: true,
  imports: [],
  templateUrl: './profile-resources.component.html',
  styleUrl: './profile-resources.component.scss'
})
export class ProfileResourcesComponent {
  @Input() resource!: Resource;
}
