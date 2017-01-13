import {Component, ViewEncapsulation, Input, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../auth';
import { LanguageService } from '../../login/language.service';
import { ConfigProvider } from '../../../../app.config';
import { BaseRegister } from '../baseRegister';

@Component({
  selector: 'gm-register',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./gmRegister.scss')],
  template: require('./gmRegister.html'),
})
export class GmRegister extends BaseRegister {

  @Input() orgName: string;
  @ViewChild('recaptcha') recaptcha;

  constructor(fb: FormBuilder,
              authService: AuthService,
              languageService: LanguageService,
              router: Router,
              configProvider: ConfigProvider) {
    super(fb, authService, languageService, router, configProvider);
  }
}
