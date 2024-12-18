import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Khởi tạo trạng thái từ localStorage hoặc mặc định là true (Dark Mode)
  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    localStorage.getItem('theme') === 'light' ? false : true
  );

  // Observable để các component khác subscribe
  isDarkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    // Áp dụng trạng thái theme khi service khởi tạo
    this.applyTheme(this.darkModeSubject.value);
  }

  // Lấy trạng thái hiện tại
  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  // Đặt trạng thái mới
  setDarkMode(isDarkMode: boolean): void {
    this.darkModeSubject.next(isDarkMode);
    this.applyTheme(isDarkMode);

    // Lưu vào localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }

  // Áp dụng class cho <body>
  private applyTheme(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
}
