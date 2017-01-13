import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../auth';
import { EqualPasswordsValidator } from '../../../theme/validators';

@Component({
  selector: 'restore-password',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./restorePassword.scss')],
  template: require('./restorePassword.html'),
})
export class RestorePassword implements OnInit {

  form: FormGroup;
  password: AbstractControl;
  repeatPassword: AbstractControl;
  passwords: FormGroup;
  submitted: boolean = false;
  token: string;
  errorMessage: string = '';
  orgName: string;

  constructor(fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private authService: AuthService) {
    this.form = (<any>fb).group({
      'passwords': (<any>fb).group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') }),
    });
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];

    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit() {
    this.orgName = this.route.snapshot.params['orgName'];
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  onSubmit(values: any): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.valid) {
      this.authService.doPasswordRest(values.passwords.password, this.token, this.orgName).subscribe(res => {
        if (res.statusCode == '200') {
          this.router.navigate([`/${this.orgName}/login/restore`]);
        } else {
          this.errorMessage = 'Your reset password request has expired, please try requesting again.'
        }
      });
    }
  }
}
