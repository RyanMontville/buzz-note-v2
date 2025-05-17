import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inspection } from '../bees.model';
import { InspectionService } from '../services/inspection.service';
import { HeaderComponent } from "../header/header.component";
import { Subscription } from 'rxjs';
import { AlertsComponent } from "../alerts/alerts.component";

@Component({
  selector: 'app-past',
  imports: [HeaderComponent, AlertsComponent],
  templateUrl: './past.component.html',
  styleUrl: './past.component.css'
})
export class PastComponent implements OnInit, OnDestroy {
  inspections: Inspection[] | null = null;
  private inspectionSubscription: Subscription | undefined;
  yearToShow: Inspection[] = [];
  years: string[] = [];
  showingYear: string = "";
  loading = false;
  error: string | null = null;
  message: string | null = null;

  constructor(
    private inspectionService: InspectionService,
    private router: Router,
    private route: ActivatedRoute) {}
  

  ngOnInit(): void {
    this.fetchInspections();
  }

  ngOnDestroy(): void {
    if (this.inspectionSubscription) {
      this.inspectionSubscription.unsubscribe();
    }
  }

  fetchInspections() {
    this.loading = true;
    this.error = null;

    this.inspectionSubscription = this.inspectionService.inspections$.subscribe(
      (inspections) => {
        this.inspections = inspections;
        console.log(`${this.inspections.length} inspections found`);
        this.getYears();
        let paramYear = this.route.snapshot.queryParamMap.get('year');
        if (paramYear) {
          this.filterYears(paramYear);
        } else {
          this.filterYears(this.years[this.years.length - 1]);
        }
        this.loading = false;
      }
    )
  }

  viewInspection(inspectionId: number) {
    this.router.navigate([`./inspections/${inspectionId}`]);
  }

  getYears() {
    this.inspections?.forEach((inspection) => {
      if (!this.years.includes(this.getYear(inspection.inspection_date))) {
        this.years.push(this.getYear(inspection.inspection_date));
      }
    });
  }

  getYear(date: string): string {
    return date.split("-")[0];
  }

  filterYears(year: string) {
    this.showingYear = year;
    if (this.inspections) {
      this.yearToShow = this.inspections?.filter(inspection => this.getYear(inspection.inspection_date) === year);
    }
  }

}