import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Frame } from '../../bees.model';
import { FramesService } from '../../services/frames.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-visual-detail',
  imports: [],
  templateUrl: './visual-detail.component.html',
  styleUrl: './visual-detail.component.css'
})
export class VisualDetailComponent implements OnInit, OnDestroy{
  @Input() inspectionID: number = 0;
  @Input() boxName: string = "";
  @Input() queen: string = ""
  frames: Frame[] = [];
  private frameSubscription: Subscription | undefined;

  constructor(private frameService: FramesService) {}

  ngOnInit(): void {
    this.frameSubscription = this.frameService.getFramesByInspectionAndBox(this.inspectionID, this.boxName)
    .subscribe(frames => {
      this.frames = frames;
    })
  }
  ngOnDestroy(): void {
    if (this.frameSubscription) {
      this.frameSubscription.unsubscribe();
    }
  }

}