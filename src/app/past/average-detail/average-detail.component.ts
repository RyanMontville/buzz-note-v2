import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AverageDetail } from '../../bees.model';
import { AveragesService } from '../../services/averages.service';
import { Subscription } from 'rxjs';
import { FrameDetailComponent } from "../frame-detail/frame-detail.component";
import { VisualDetailComponent } from "../visual-detail/visual-detail.component";

@Component({
  selector: 'app-average-detail',
  imports: [FrameDetailComponent, VisualDetailComponent],
  templateUrl: './average-detail.component.html',
  styleUrl: './average-detail.component.css'
})
export class AverageDetailComponent implements OnInit, OnDestroy {
  @Input() inspectionID: number = 0;
  averages: AverageDetail[] | undefined = undefined;
  loading = false;
  error: string | null = null;
  showTable: boolean = true;
  private averageSubscription: Subscription | undefined;

  constructor(private averageService: AveragesService) {}
  
  ngOnInit(): void {
    this.loading = true;
    this.averageSubscription = this.averageService.getAverageForInspectionId(this.inspectionID)
    .subscribe(averages => {
      this.averages = averages;
      if (averages?.length === 0) {
        this.showTable = false;
      }
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.averageSubscription) {
      this.averageSubscription.unsubscribe();
    }
  }
}
