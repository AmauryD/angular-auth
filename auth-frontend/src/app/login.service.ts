import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SessionService } from './session.service';

interface LoginArgs {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    @Inject(HttpClient) private http: HttpClient,
    private session: SessionService,
  ) { }

  public login(auth: LoginArgs) {
    const observer = this.http.post('http://localhost:3000/login', auth);
    observer.subscribe((res) => {
      this.session.logUserIn((res as LoginResponse)['accessToken']);
    });
    return observer;
  }
}
