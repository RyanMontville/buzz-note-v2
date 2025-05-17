import { Component } from '@angular/core';
import { AlertsComponent } from "../../alerts/alerts.component";

@Component({
  selector: 'app-end',
  imports: [AlertsComponent],
  templateUrl: './end.component.html',
  styleUrl: './end.component.css'
})
export class EndComponent {
  error: string | null = null;
  message: string | null = null;
  loading: boolean = false;

}
