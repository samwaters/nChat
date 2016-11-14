import {Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {CaptchaService, ICaptchaWindow} from '../../services/captcha.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  @Input()
  public siteKey:string = '';
  @Input()
  public theme:string = 'light';
  @Input()
  public type:string = 'image';
  @Input()
  public size:string = 'normal';
  @Input()
  public tabIndex:number = 0;
  @Output()
  public captchaResponse:EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public captchaExpired:EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('target')
  private _targetRef:ElementRef;
  private _captchaId:string = '';
  private _readySub:Subscription;

  constructor(private captchaService:CaptchaService) {}

  ngOnInit() {
    this._readySub = this.captchaService.init().subscribe((ready:boolean) => {
      if(ready) {
        this._captchaId = (<ICaptchaWindow>window).grecaptcha.render(
          this._targetRef.nativeElement,
          {
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabIndex,
            'callback': (response) => {
              this._captchaCallback(response);
            },
            'expired-callback': () => {
              this._captchaExpiredCallback();
            }
          }
        )
      }
    });
  }

  ngOnDestroy() {
    this._readySub.unsubscribe();
  }

  public resetCaptcha():void {
    if(this._captchaId) {
      (<ICaptchaWindow>window).grecaptcha.reset(this._captchaId);
    }
  }

  private _captchaCallback(response:string) {
    this.captchaResponse.emit(response);
  }

  private _captchaExpiredCallback() {
    this.captchaExpired.emit();
  }
}
