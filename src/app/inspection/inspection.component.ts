import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Hive, TempAndCondition, Inspection, Box } from '../bees.model';
import { HivesService } from '../services/hives.service';
import { InspectionService } from '../services/inspection.service';
import { Subscription } from 'rxjs';
import { AlertsComponent } from "../alerts/alerts.component";
import { BoxesService } from '../services/boxes.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-inspection',
  imports: [AlertsComponent, HeaderComponent],
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
  nextId: number = 0;
  private hiveSubscription: Subscription | undefined;
  private nextIdSubscription: Subscription | undefined;

  constructor(
    private hiveService: HivesService,
    private inspectionService: InspectionService,
    private boxService: BoxesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.hiveSubscription = this.hiveService.hives$.subscribe(
      (hives) => {
        this.hives = hives;
        this.loading = false;
      });
    this.nextIdSubscription = this.inspectionService.getNextID().subscribe({
      next: (nextId) => {
        if (this.nextId === 0) {
          this.nextId = nextId;
        } else {
          console.log(`Starting inspection. NextID called but next Id is ${this.nextId}`)
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to get next inspection ID.';
        this.loading = false;
      },
    });
  }
  ngOnDestroy(): void {
    if (this.hiveSubscription) {
      this.hiveSubscription.unsubscribe();
    }
    if (this.nextIdSubscription) {
      this.nextIdSubscription.unsubscribe();
    }
  }

  startNewIspection(hive: Hive) {
    let newInspection: Inspection = new Inspection(this.nextId, hive.hive_id, this.getFormattedDate(), hive.hive_name, hive.num_boxes,
      this.countTotalFramesForHive(hive.hive_id), this.getStartTime(), 0, "", "", "", "", "", "", "", false, false, false, false, "");
    this.inspectionService.addInspection(newInspection);
    console.log(`Inspection component: Created new inspection with ID: ${this.nextId}`);
    this.router.navigate(['./frames'], { queryParams: { inspectionID: this.nextId, hiveID: hive.hive_id, hiveName: hive.hive_name } });
  }

  countTotalFramesForHive(hiveID: number) {
    let totalFrames: number = 0;
    this.boxService.getBoxesForHiveId(hiveID).subscribe(
      (boxes) => boxes?.forEach(box => totalFrames += box.num_frames)
    );
    console.log(`Total num frames is ${totalFrames}`)
    return totalFrames;
  }

  getFormattedDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getStartTime() {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

}
