import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Hive, TempAndCondition, Inspection } from '../bees.model';
import { HivesService } from '../services/hives.service';
import { InspectionService } from '../services/inspection.service';
import { Subscription } from 'rxjs';
import { AlertsComponent } from "../alerts/alerts.component";

@Component({
  selector: 'app-inspection',
  imports: [AlertsComponent],
  templateUrl: './inspection.component.html',
  styleUrl: './inspection.component.css'
})
export class InspectionComponent implements OnInit, OnDestroy {
  hives: Hive[] | null = null;
  loading: boolean = false;
  error: string | null = null;
  message: string | null = null;
  weather: TempAndCondition = new TempAndCondition(0, "");
  selectedHiveID: number = 0;
  inspection: Inspection | undefined;
  private hiveSubscription: Subscription | undefined;

  constructor(
    private hiveService: HivesService,
    private inspectionService: InspectionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.hiveSubscription = this.hiveService.hives$.subscribe(
      (hives) => {
        this.hives = hives;
        this.loading = false;
      }
    )
  }
  ngOnDestroy(): void {
    if (this.hiveSubscription) {
      this.hiveSubscription.unsubscribe();
    }
  }

}
