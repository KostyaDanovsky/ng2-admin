import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../auth';

@Component({
  selector: 'forgot-password',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./forgotPassword.scss')],
  template: require('./forgotPassword.html'),
})
export class ForgotPassword implements OnInit {

  form: FormGroup;
  email: AbstractControl;
  submitted: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  orgName: string;

  constructor(fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    this.form = (<any>fb).group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });
    this.email = this.form.controls['email'];
  }

  ngOnInit() {
    this.orgName = this.route.snapshot.params['orgName'];
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  onSubmit(values: any): void {
    this.submitted = true;
    this.successMessage = this.errorMessage = '';
    if (this.form.valid) {
      this.authService.requestPasswordRest(values.email, this.orgName).subscribe(res => {
        if (res.statusCode == '200') {
          this.successMessage = 'Email with reset password instructions has been successfully sent. Please check you mailbox.'
        } else {
          this.errorMessage = 'User with such email address was not found.'
        }
      });
    }
  }
}
