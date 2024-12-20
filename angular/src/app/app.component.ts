import { Component, OnInit } from '@angular/core';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'final-ui';

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // this.languageService.initializeLanguage();
  }
}
