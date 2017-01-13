import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth';
import { LanguageService } from '../language.service';

@Component({
  selector: 'admin-login',
  styles: [require('./login.component.scss')],
  template: require('./login.component.html'),
})
export class Login implements OnInit {

  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  rememberMe: AbstractControl;
  submitted: boolean = false;
  errorMessage: string;
  languages: Array<any>;
  selectedLanguage: any = {};

  constructor(fb: FormBuilder,
              private authService: AuthService,
              private languageService: LanguageService,
              private router: Router) {

    this.form = (<any>fb).group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'rememberMe': [true],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.rememberMe = this.form.controls['rememberMe'];
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/pages/dashboard']);
    } else {
      this.languageService.getLanguages()
        .subscribe(languages => {
          this.languages = languages;
          this.selectedLanguage = languages[0];
        });
    }
  }

  onSubmit(values: any): void {
    this.submitted = true;
    if (this.form.valid) {
      this.authService.login(values)
        .subscribe(res => {
          if (this.authService.isLoggedIn()) {
            let redirect = this.authService.redirectUrl || '/pages/dashboard';
            this.router.navigate([redirect]);
          }
        }, (err) => {
          this.errorMessage = err.errorMessage;
        });
    }
  }
}
