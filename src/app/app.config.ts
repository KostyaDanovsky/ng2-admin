import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ConfigProvider {

  private config = {
    default: {
      apiEndpoint: 'https://dev.sriyainnovations.com:8443/OIApplication/',
      socialLoginEndpoint: 'http://dev.sriyainnovations.com:8090/',
      reportingEndpoint: 'https://dev.sriyainnovations.com:8443/reporting/',
      storeEndpoint: 'https://dev.sriyainnovations.com/store',
      logo: 'logo',
      company: 'SriyaInn',
    },
    dev: {
      apiEndpoint: 'https://dev.sriyainnovations.com:8443/OIApplication/',
      socialLoginEndpoint: 'http://dev.sriyainnovations.com:8090/',
      reportingEndpoint: 'https://dev.sriyainnovations.com:8443/reporting/',
      storeEndpoint: 'https://dev.sriyainnovations.com/store',
    },
    stg: {
      apiEndpoint: 'http://stage.sriyainnovations.com:8080/OIApplication/',
      socialLoginEndpoint: 'http://stage.sriyainnovations.com:8090/',
      reportingEndpoint: 'http://stage.sriyainnovations.com:8080/reporting/',
      storeEndpoint: 'http://stage.sriyainnovations.com/store',
    },
    demo: {
      apiEndpoint: 'http://demo.sriyainnovations.com:8080/OIApplication/',
      socialLoginEndpoint: 'http://demo.sriyainnovations.com:8090/',
      reportingEndpoint: 'http://demo.sriyainnovations.com:8080/reporting/',
      storeEndpoint: 'http://demo.sriyainnovations.com/store',
      logo: 'eZassi-logo',
      company: 'Innovation',
    }
  };

  constructor(@Inject('environment') protected env: string = 'dev') {
  }

  getConfigParam(name: string, value = null): any {
    return typeof this.getConfig()[name] !== 'undefined'
      ? this.getConfig()[name]
      : this.config.default[name];
  }

  protected getConfig(): any {
    return this.config[this.env];
  }
}
