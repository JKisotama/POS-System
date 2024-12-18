import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode: boolean = false;

  isDarkMode(): boolean {
    return this.darkMode;
  }

  setDarkMode(isDarkMode: boolean): void {
    this.darkMode = isDarkMode;
    if (isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }
}