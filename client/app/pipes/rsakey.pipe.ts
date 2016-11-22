import {PipeTransform, Pipe} from '@angular/core';
@Pipe({name:'rsakey'})
export class RsaKeyPipe implements PipeTransform {
  transform(text:string, args:any[]) {
    text = text.replace(/-{5}[^-]+-{5}/g, '');
    return text.replace(/[\r\n]+/g, '');
  }
}
