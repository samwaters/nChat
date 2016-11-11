import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class ThemeService {
  private _themes:Array<any> = [
    {
      name: 'Default',
      className: ''
    },
    {
      name: 'Theme 2',
      className: 'theme2'
    },
    {
      name: 'Theme 3',
      className: 'theme3'
    }
  ];
  private _theme$:BehaviorSubject<string>;
  constructor() {
    this._theme$ = new BehaviorSubject(this._themes[0].className);
  }

  public get currentTheme():BehaviorSubject<string> {
    return this._theme$;
  }

  public changeTheme(themeName:string) {
    this._theme$.next(themeName);
  }

  public get themeList():Array<any> {
    return this._themes;
  }
}
