import { Component, OnInit } from '@angular/core';
import { UploadService } from '@ya-scrum/services';
import { Upload } from '@ya-scrum/models';

import * as _ from 'lodash';

@Component({
  selector: 'ya-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private upSvc: UploadService) { }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
  }


}
