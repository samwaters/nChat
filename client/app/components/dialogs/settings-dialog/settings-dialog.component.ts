import { Component, OnInit } from '@angular/core';
import {IAppState} from '../../../reducers/state.interface';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {settingsActions} from '../../../reducers/settings.reducer';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  // Model stuff
  private keySize:number = 1024;
  // Store stuff
  private settings:Observable<any>;
  constructor(private store:Store<IAppState>) {
    this.settings = store.select('settings');
  }

  public generateKeys() {
    console.log('Using key size', this.keySize);
    this.store.dispatch(settingsActions.generateClientKeyPair(this.keySize));
  }

  ngOnInit() {
  }

}
