import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Ng2Uploader } from 'ng2-uploader/ng2-uploader';

import { AuthService } from '../auth/auth.service';
import { ConfigProvider } from '../app.config';
import { layoutPaths } from '../theme';
import { DefaultErrorHandler } from './defaultErrorHandler';

const maxFileNameLength: number = 45;
// file size is in MB
const maxPictureFileSize: number = 5;
const maxDocumentFileSize: number = 50;

@Injectable()
export class FileHelperService {

  private endpoint: string;

  constructor(private authService: AuthService,
              private configProvider: ConfigProvider,
              private injector: Injector) {
    this.endpoint = this.configProvider.getConfigParam('apiEndpoint');
  }

  generateDownloadImageLink(fileId, defaultImage: string = 'no-photo') {
    return fileId
      ? `${this.endpoint}api/file/download?file-id=${fileId}&at=${this.authService.getAuthToken()}`
      : layoutPaths.images.root + defaultImage + '.png';
  }

  generateDownloadFileLink(fileId, path = 'api/file/download') {
    return fileId && `${this.endpoint}${path}?file-id=${fileId}&at=${this.authService.getAuthToken()}`;
  }

  uploadFiles(options, files, fileType) {

    if (!this.validateFile(files[0], fileType)) {
      return Observable.create(observer => {
        observer.next({});
        observer.complete();
      })
    }

    return Observable.create(observer => {
      const uploader = new Ng2Uploader();
      uploader.setOptions({
        url: this._getUploadUrl(options),
        customHeaders: { 'at': this.authService.getAuthToken() },
      });

      uploader._emitter.subscribe((data) => {
        if (data['done'] || data['abort'] || data['error']) {
          observer.next(data);
          observer.complete();
        }
      });

      uploader.addFilesToQueue([files[0]]);
    });
  }

  validateFile(file, fileType) {
    let errorHandler = new DefaultErrorHandler(this.injector);
    let fileName = file.name.split('.')[0];
    let fileSize = file.size / 1024 / 1024;
    let isValid = true;

    if (fileName.length > maxFileNameLength) {
      errorHandler.handle({
        caption: 'Error Occurred',
        message: `File name length should be less then ${maxFileNameLength} characters.`,
      });
      isValid = false;
    }

    if (fileType === 'document' && fileSize > maxDocumentFileSize) {
      errorHandler.handle({
        caption: 'Error Occurred',
        message: `Document size is too large, it should be less than ${maxDocumentFileSize}MB.`,
      });
      isValid = false;
    }

    if (fileType === 'picture' && fileSize > maxPictureFileSize) {
      errorHandler.handle({
        caption: 'Error Occurred',
        message: `Picture size is too large, it should be less than ${maxPictureFileSize}MB.`,
      });
      isValid = false;
    }

    return isValid;
  }

  private _getUploadUrl(options) {
    return options.url
      + (options.id ? '?id=' + options.id : '')
      + (options.orgnId ? '&orgnId=' + options.orgnId : '')
      + (options.objectType ? '&objectType=' + options.objectType : '');
  }
}
