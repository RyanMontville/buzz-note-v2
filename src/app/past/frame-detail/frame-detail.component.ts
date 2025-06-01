import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Frame } from '../../bees.model';
import { Subscription } from 'rxjs';
import { FramesService } from '../../services/frames.service';
import { LoadingComponent } from "../../loading/loading.component";

@Component({
  selector: 'app-frame-detail',
  imports: [LoadingComponent],
  templateUrl: './frame-detail.component.html',
  styleUrl: './frame-detail.component.css'
})
export class FrameDetailComponent implements OnInit, OnDestroy {
  @Input() inspectionID: number = 0;
  @Input() boxName: string = "";
  frames: Frame[] = [];
  loading: boolean = false;
  private frameSubscription: Subscription | undefined;

  constructor(private frameService: FramesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.frameSubscription = this.frameService.getFramesByInspectionAndBox(this.inspectionID, this.boxName)
    .subscribe(frames => {
      this.frames = frames;
      this.loading = false;
    })
  }
  ngOnDestroy(): void {
    if (this.frameSubscription) {
      this.frameSubscription.unsubscribe();
    }
  }


}
