import { Component, ViewEncapsulation, ViewChild, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../../auth';
import { LanguageService } from '../language.service';
import { ConfigProvider } from '../../../../app.config';

@Component({
  selector: 'base-login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./baseLogin.scss')],
  template: require('./baseLogin.html'),
})
export class BaseLogin implements OnInit {

  @Input() orgName: string;

  @ViewChild('socialForm') socialForm;

  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  rememberMe: AbstractControl;
  submitted: boolean = false;
  errorMessage: string;
  languages: Array<any>;
  selectedLanguage: any = {};
  successMessage: string = '';

  showAdfsOption: boolean = false;
  isSocialApp: boolean = false;
  company: string;

  constructor(fb: FormBuilder,
              private configProvider: ConfigProvider,
              private authService: AuthService,
              private languageService: LanguageService,
              private route: ActivatedRoute,
              private router: Router) {

    this.form = (<any>fb).group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'rememberMe': [true],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.rememberMe = this.form.controls['rememberMe'];

    if (this.route.snapshot.params['from'] === 'restore') {
      this.successMessage = 'Password has been successfully changed';
    }
    this.company = this.configProvider.getConfigParam('company');
  }

  ngOnInit() {
    this.isSocialApp = APP == 'social';
    this.showAdfsOption = this.isSocialApp && this.orgName && this.orgName.toLowerCase() == 'sriyainntest';
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
      values.orgName = this.orgName;
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

  changeOrganization($event: any) {
    $event.preventDefault();
    this.authService.clearOrganization();
    this.router.navigate(['/organization']);
  }

  socialLogin(socialProvider: string) {
    let form = this.socialForm.nativeElement;
    let socialLoginEndpoint = this.configProvider.getConfigParam('socialLoginEndpoint');
    form.action = `${socialLoginEndpoint}connect/${socialProvider}?orgName=${this.orgName}`;
    form.submit();
  }

  adfsLogin($event: any) {
    $event.preventDefault();
    let apiEndpoint = this.configProvider.getConfigParam('apiEndpoint');
    window.location.href =
      `${apiEndpoint}saml/login?idp=http://WIN-DCD93O6QO6Q.sriyainntest.com/adfs/services/trust`;
  }
}
