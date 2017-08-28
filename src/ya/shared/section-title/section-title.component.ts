import { Component, OnInit, Input, Directive } from '@angular/core';


@Directive({
  selector: 'section-title-highlight',
})
export class SectionTitleHighlight { }


@Component({
  selector: 'section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
})
export class SectionTitleComponent {

  constructor(
  ) {
  }

}
