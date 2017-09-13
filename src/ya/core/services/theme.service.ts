import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Theme } from '../models';

@Injectable()
export class ThemeService {

  private cyan = new Theme(
    '#0097A7',
    '#00BCD4',
    '#B2EBF2',
    '#FFFFFF',
    '#607D8B',
    '#212121',
    '#757575',
    '#BDBDBD',
  );

  private teal = new Theme(
    '#00796B',
    '#009688',
    '#B2DFDB',
    '#FFFFFF',
    '#607D8B',
    '#212121',
    '#757575',
    '#BDBDBD',
  );


  private themes = {
    'cyan': this.cyan,
    'teal': this.teal,
    'default': this.teal,
  };

  public findTheme(name: string): Theme {

    const result = this.themes[name];

    if (result) {
      return result;
    } else {
      return this.themes['default'];
    }

  }

}
