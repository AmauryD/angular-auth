import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';

interface UserProfile {
  username: string;
  email: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public profile?: UserProfile;

  constructor(
    private http: HttpClient,
  ) {

  }

  public get accessToken() {
    return localStorage.getItem('accessToken');
  }

  public get isLoggedIn() {
    return this.profile !== undefined;
  }

  public loadUserProfile() {
    if (!this.accessToken) {
      return  of(false);
    }

    const observer = this.http.get<{ user: UserProfile}>('http://localhost:3000/profile', {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });

    observer.subscribe((profile) => {
      this.profile = profile['user'];
    });

    return observer;
  }

  public logUserIn(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
    return this.loadUserProfile();
  }

  public logout() {
    localStorage.setItem('accessToken', '');
    this.profile = undefined;
  }
}
