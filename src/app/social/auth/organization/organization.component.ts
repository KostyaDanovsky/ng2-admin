import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, OrganizationService } from '../../../auth';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./organization.scss')],
  template: require('./organization.html'),
})
export class Organization implements OnInit {

  form: FormGroup;
  organization: AbstractControl;
  errorMessage: string;

  constructor(fb: FormBuilder,
              private authService: AuthService,
              private orgService: OrganizationService,
              private router: Router) {
    this.form = (<any>fb).group({
      'organization': ['', Validators.compose([Validators.required])],
    });
    this.organization = this.form.controls['organization'];
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/pages/dashboard']);
    } else {
      const orgName = this.authService.orgName;
      if (orgName) {
        this.router.navigate([`${orgName}/login`]);
      }
    }
  }

  onSubmit(values: any): void {
    if (this.form.valid) {
      this.orgService.getOrganizationByName(values.organization)
        .subscribe(organization => {
          if (organization) {
            this.authService.orgName = organization.orgnName;
            this.router.navigate([`${this.authService.orgName}/login`]);
          } else {
            this.errorMessage = 'Sorry, could not find this organization in the system.';
          }
        });
    }
  }
}
