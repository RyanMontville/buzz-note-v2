import { Component, OnDestroy, OnInit } from '@angular/core';
import { InspectionService } from '../../services/inspection.service';
import { Inspection } from '../../bees.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AverageDetailComponent } from "../average-detail/average-detail.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { AlertsComponent } from "../../alerts/alerts.component";
import { LoadingComponent } from "../../loading/loading.component";

@Component({
  selector: 'app-inspection-detail',
  imports: [AverageDetailComponent, FormsModule, CommonModule, HeaderComponent, AlertsComponent, LoadingComponent],
  templateUrl: './inspection-detail.component.html',
  styleUrl: './inspection-detail.component.css'
})
export class InspectionDetailComponent implements OnInit, OnDestroy {
  inspectionId: number = 0;
  inspection: Inspection | undefined = undefined;
  loading = false;
  error: string | null = null;
  message: string | null = null;
  notes: string = "";
  notesLines: string[] = [];
  newNotes: string = "";
  showTextArea: boolean = false;
  backLink: {page: string, year: string | undefined} = {page: "/past", year: undefined};
  private inspectionSubscription: Subscription | undefined;

  constructor(
    private inspectionService: InspectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inspectionId = Number(this.route.snapshot.paramMap.get('id'));
    let paramSearch = this.route.snapshot.queryParamMap.get('search');
    if (paramSearch){
      this.backLink.page = "/search";
    } else {
      this.backLink.page = "/past";
    }
    this.inspectionSubscription = this.inspectionService
      .getInspectionById(this.inspectionId)
      .subscribe(foundInspection => {
        if (!foundInspection) {
          this.error = "Error. Inspection not found";
        } else {
          console.log(foundInspection);
          this.inspection = foundInspection;
          this.notes = foundInspection.notes;
          this.newNotes = foundInspection.notes;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.inspectionSubscription) {
      this.inspectionSubscription.unsubscribe();
    }
  }

  onSubmit(action: number) {
    if (action === 1) {
      this.showTextArea = false;
      this.inspectionService.updateInspectionNotes(this.inspectionId, this.newNotes)
      this.message = "Updated notes succefully";
            setTimeout(() => {
              this.message = null;
            }, 5000);
    } else {
      this.showTextArea = false;
      this.newNotes = this.notes;
    }
  }

  formatDate() {
    return this.inspection?.inspection_date.toString().split('T')[0];
  }

  formatNotes() {
    let lines = this.notes.split("\\n");
    let formattedNotes: string = ""
    lines.forEach(line => {
      formattedNotes += line;
      formattedNotes += "<br/>"
    });
    this.notes = formattedNotes;
  }
}
