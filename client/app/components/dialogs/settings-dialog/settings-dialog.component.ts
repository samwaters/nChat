import { Component, OnInit } from '@angular/core';
import {IAppState} from '../../../reducers/state.interface';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {settingsActions} from '../../../reducers/settings.reducer';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  public fetchingKey:boolean = false;
  public generatingKeys:boolean = false;
  // Model stuff
  private keySize:number = 1024;
  // Store stuff
  private settings:Observable<any>;
  constructor(private store:Store<IAppState>) {
    this.settings = store.select('settings');
    this.settings.subscribe((settings) => {
      this.fetchingKey = false;
      this.generatingKeys = false;
      this.keySize = settings.keys.clientKeySize;
    });
  }

  public generateKeys() {
    this.generatingKeys = true;
    setTimeout(() => {
      this.store.dispatch(settingsActions.generateClientKeyPair(this.keySize));
    }, 250);
  }

  public reloadKey() {
    this.fetchingKey = true;
    setTimeout(() => {
      this.store.dispatch(settingsActions.requestServerPublicKey());
    }, 250);
  }

  ngOnInit() {
  }

}
