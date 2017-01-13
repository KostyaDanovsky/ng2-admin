import {Component, ViewEncapsulation, Input, OnInit, ViewChild} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EmailValidator, EqualPasswordsValidator, CheckboxValidator } from '../../../../theme/validators';
import { AuthService } from '../../../../auth';
import { LanguageService } from '../../login/language.service';
import { ConfigProvider } from '../../../../app.config';

@Component({
  selector: 'base-register',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./baseRegister.scss')],
  template: require('./baseRegister.html'),
})
export class BaseRegister implements OnInit {

  @Input() orgName: string;
  @ViewChild('recaptcha') recaptcha;

  form: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  repeatPassword: AbstractControl;
  passwords: FormGroup;
  key: AbstractControl;
  policy: AbstractControl;
  terms: AbstractControl;

  errorMessage: string;
  submitted: boolean = false;
  languages: Array<any>;
  selectedLanguage: any = {};
  company: string;

  siteKey = '6LcQshwTAAAAAKCJP8TrI2XxKkuWr0SclqO89FPp';
  captcha: string;

  constructor(fb: FormBuilder,
              private authService: AuthService,
              private languageService: LanguageService,
              private router: Router,
              private configProvider: ConfigProvider,) {

    this.form = (<any>fb).group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'policy': [false, CheckboxValidator.required],
      'terms': [false, CheckboxValidator.required],
      'passwords': (<any>fb).group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') }),
      'key': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.firstName = this.form.controls['firstName'];
    this.lastName = this.form.controls['lastName'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
    this.key = this.form.controls['key'];
    this.policy = this.form.controls['policy'];
    this.terms = this.form.controls['terms'];

    this.company = this.configProvider.getConfigParam('company');
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    } else {
      this.languageService.getLanguages()
        .subscribe(languages => {
          this.languages = languages;
          this.selectedLanguage = languages[0];
        });
    }
  }

  onSubmit(values: any) {
    this.submitted = true;
    if (this.form.valid && this.captcha) {
      values.orgName = this.orgName;
      this.authService.signUp(values, this.captcha)
        .subscribe(res => {
          if (this.authService.isLoggedIn()) {
            let redirect = this.authService.redirectUrl || '/';
            this.router.navigate([redirect]);
          }
          this.clearRecaptcha();
        }, (err) => {
          this.errorMessage = err.errorMessage;
          this.clearRecaptcha();
        });
    }
  }

  handleCorrectCaptcha(captcha) {
    this.captcha = captcha;
  }

  clearRecaptcha() {
    this.captcha = undefined;
    this.recaptcha.reset();
  }
}
