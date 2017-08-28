import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { Upload } from '../../models/upload';

import * as _ from 'lodash';

@Component({
  selector: 'upload',
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

  uploadMulti() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload);
    }
    );
  }

}
