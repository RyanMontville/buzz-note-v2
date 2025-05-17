import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { AlertsComponent } from "../alerts/alerts.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, HeaderComponent, AlertsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy, OnInit {
  isPopupOpen = false;
  message: string | null = null;
  private originalOverflow: string = '';

  constructor() {
    // Store the original overflow value on component initialization
    this.originalOverflow = document.body.style.overflow;
  }
  ngOnInit(): void {
    if (!this.isPwaInstalled()) {
      this.openPopup();
    } else {
      this.message = "Please note that this demo app will only keep any changes you make to the app while you have the app open.";
    }
  }

  openPopup() {
    this.isPopupOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closePopup() {
    this.isPopupOpen = false;
    document.body.style.overflow = this.originalOverflow;
  }

  ngOnDestroy() {
    // Restore the original overflow in case the component is destroyed while the popup is open
    document.body.style.overflow = this.originalOverflow;
  }

  isPwaInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches;
  }
}
