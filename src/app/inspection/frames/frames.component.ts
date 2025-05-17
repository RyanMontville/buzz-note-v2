import { Component } from '@angular/core';
import { AlertsComponent } from "../../alerts/alerts.component";

@Component({
  selector: 'app-frames',
  imports: [AlertsComponent],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css'
})
export class FramesComponent {
  error: string | null = null;
  message: string | null = null;
  loading: boolean = false;

}
