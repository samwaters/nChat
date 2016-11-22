import {Component, ElementRef} from '@angular/core';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private themeService:ThemeService, private el:ElementRef) {
    themeService.currentTheme.subscribe((theme:string) => {
      this.el.nativeElement.parentNode.className = theme;
    })
  }
}
