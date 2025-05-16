import { Component, Input } from '@angular/core';
import { Frame } from '../../bees.model';

@Component({
  selector: 'app-frame-detail',
  imports: [],
  templateUrl: './frame-detail.component.html',
  styleUrl: './frame-detail.component.css'
})
export class FrameDetailComponent {
  @Input() inspectionID: number = 0;
  @Input() boxName: string = "";
  frames: Frame[] = [];
}
