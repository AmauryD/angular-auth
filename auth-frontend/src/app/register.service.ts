import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

interface RegisterArgs {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    @Inject(HttpClient) private http: HttpClient,
  ) { }

  public register(auth: RegisterArgs) {
    this.http.post('http://localhost:3000/register', auth).subscribe((res) => {
      console.log(res);
    });
  }
}
