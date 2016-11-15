import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

interface IMaterialElementRef extends ElementRef {
  _elementRef?:ElementRef;
  _inputElement?:ElementRef;
}

@Component({
  selector: 'app-material-input',
  templateUrl: './material-input.component.html',
  styleUrls: ['./material-input.component.scss']
})
export class MaterialInputComponent implements OnInit {

  @Input()
  public minlength:number = 0;
  @Input()
  public name:string;
  @Input()
  public pattern:string = '.*';
  @Input()
  public placeholder:string;
  @Input()
  public required:boolean;
  @Input()
  public type:string = 'text';
  @Input()
  public get value():string {
    return this._value;
  }
  public set value(val:string) {
    this._value = val;
    this.valueChange.emit(this._value);
  }
  @Output()
  public onEnter:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public valueChange:EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('current')
  private _current:IMaterialElementRef;
  private _value:string = '';

  constructor() {}
  ngOnInit() {}

  public enter() {
    this.onEnter.emit(true);
  }

  public focus() {
    if(this._current._elementRef) {
      this._current._elementRef.nativeElement.focus();
    }
    if(this._current._inputElement) {
      this._current._inputElement.nativeElement.focus();
    }
  }
}
