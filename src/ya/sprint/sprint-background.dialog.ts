import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

import { NgxCroppieComponent } from 'ngx-croppie';
import { CroppieOptions, ResultOptions, Format } from 'croppie';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';

@Component({
  selector: 'sprint-background-dialog',
  templateUrl: './sprint-background.dialog.html',
  styleUrls: ['./sprint-background.dialog.scss'],
})
export class SprintBackgroundDialogComponent implements OnInit {

  @ViewChild('ngxCroppie') ngxCroppie: NgxCroppieComponent;

  sprint: Sprint;
  image: File;
  widthPx = '1024';
  heightPx = '400';
  croppieImage: string;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    private dialogRef: MdDialogRef<SprintBackgroundDialogComponent>,
    private sprintService: SprintService,
  ) {
    if (data) {
      this.image = data.image;
      this.sprint = data.sprint;
    }
  }

  cancel() {
    this.dialogRef.close(true);
  }

  public get croppieOptions(): CroppieOptions {
    const opts: CroppieOptions = {};
    opts.viewport = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.boundary = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.enforceBoundary = true;
    return opts;
  }

  ngOnInit() {
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      this.croppieImage = fr.result;
    };
    fr.readAsDataURL(this.image);
  }

  newImageResultFromCroppie(img: string) {
    this.croppieImage = img;
  }

  public apply() {
      this.sprintService.uploadSprintBackgroundAsBase64(this.sprint, this.croppieImage);
      this.dialogRef.close(true);
  }



}
