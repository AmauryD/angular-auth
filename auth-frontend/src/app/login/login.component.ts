// FILEPATH: /Users/amauryd/Projects/angular-auth/auth-frontend/src/app/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  declare loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private login: LoginService,
      private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      this.login.login(this.loginForm.value).subscribe((res) => {
        this.router.navigate(['/dashboard']);
      })
    }
  }
}
