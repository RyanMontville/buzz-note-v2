import { Component, Input } from '@angular/core';
import { Box } from '../../bees.model';

@Component({
  selector: 'app-box-detail',
  imports: [],
  templateUrl: './box-detail.component.html',
  styleUrl: './box-detail.component.css'
})
export class BoxDetailComponent {
  @Input() hiveID: number = 0;
  @Input() numBoxes: number = 0;
  boxes: Box[] | null = null;
  loading = false;
  error: string | null = null;
  message: string | null = null;
  showEdit: boolean = false;
  showAdd: boolean = false;
  updatedBox: Box = new Box(0, 0, "", 0, "", false, false);
  newBox: Box = new Box(0, 0, "", 0, "", false, false);
}
