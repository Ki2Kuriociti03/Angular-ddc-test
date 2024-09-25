import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile, Resource} from "../interfaces/profile.interface";
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  https = inject(HttpClient)
  baseApiUrl = "https://reqres.in/api/";
  constructor() { }

  getTestAccounts() {
    return this.https.get<{data: Profile[]}>(`${this.baseApiUrl}users?page=2`).pipe(
      map((response) => response.data)
    )
  }

  getTestResources() {
    return this.https.get<{data: Resource[] }>(`${this.baseApiUrl}unknown`).pipe(
      map((response) => response.data)
    )
  }

  getAccount(id: number) {
    return this.https.get<{ data: Profile }>(`${this.baseApiUrl}users/${id}`).pipe(
      map((response) => response.data)
    )
  }

  updateAccount(profile: Profile) {
    return this.https.put<Profile>(`${this.baseApiUrl}users/${profile.id}`, profile)
  }

  deleteProfile(profileId: number): Observable<void> {
    return this.https.delete<void>(`${this.baseApiUrl}users/${profileId}`);
  }
}
