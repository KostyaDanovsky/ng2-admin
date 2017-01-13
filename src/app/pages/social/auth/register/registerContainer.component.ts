import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'register-container',
  encapsulation: ViewEncapsulation.None,
  template: require('./registerContainer.html'),
})
export class RegisterContainer implements OnInit {
  orgName: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.orgName = this.route.snapshot.params['orgName'].toLowerCase();
  }
}
