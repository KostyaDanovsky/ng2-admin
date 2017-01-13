import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login-container',
  encapsulation: ViewEncapsulation.None,
  template: require('./loginContainer.html'),
})
export class LoginContainer implements OnInit {
  orgName: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.orgName = this.route.snapshot.params['orgName'].toLowerCase();
  }
}
