import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';

import { ConfigProvider } from '../../app.config';

@Injectable()
export class LanguageService {

  private endpoint: string;

  constructor(private http: Http, private configProvider: ConfigProvider) {
    this.endpoint = this.configProvider.getConfigParam('apiEndpoint');
  }

  getLanguages() {
    return this.http.get(this.endpoint + 'api/v2/languages')
      .map(res => {
        const languages = res.json().data;
        return _.orderBy(languages, (l: any) => l.langCode != 'en');
      });
  }
}
