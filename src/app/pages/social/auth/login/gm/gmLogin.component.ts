import {Component, ViewEncapsulation, Input, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../../auth';
import { LanguageService } from '../language.service';
import { ConfigProvider } from '../../../../app.config';
import { BaseLogin } from '../baseLogin';

@Component({
  selector: 'gm-login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./gmLogin.scss')],
  template: require('./gmLogin.html'),
})
export class GmLogin extends BaseLogin {

  @Input() orgName: string;
  @ViewChild('socialForm') socialForm;

  constructor(fb: FormBuilder,
              configProvider: ConfigProvider,
              authService: AuthService,
              languageService: LanguageService,
              route: ActivatedRoute,
              router: Router) {
    super(fb, configProvider, authService, languageService, route, router);
  }
}
