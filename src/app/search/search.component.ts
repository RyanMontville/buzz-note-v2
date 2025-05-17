import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { AlertsComponent } from "../alerts/alerts.component";
import { Hive, Inspection } from '../bees.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HivesService } from '../services/hives.service';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule, HeaderComponent, AlertsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  error: string | null = null;
  message: string | null = null;
  searchResults: Inspection[] | undefined;
  searchFor: string = "";
  showSearchOption: number = 0;
  dateRange: {startDate: string, endDate: string} = {startDate: "", endDate: ""};
  tempRange: {minTemp: number, maxTemp: number} = {minTemp: 0, maxTemp: 0};
  selectedWeatherCondition: string = "select";
  weatherConditions: string[] = ["Clear Sky", "Partly Cloudy", "Overcast", "Fog", "Drizzle", "Rain", "Freezing Rain", "Snow", "Thunderstorm"];
  hives: Hive[] | null = null;
  private hiveSubscription: Subscription | undefined;

  constructor(
    private searchService: SearchService,
    private hiveService: HivesService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchHives();
  }

  ngOnDestroy(): void {
    if (this.hiveSubscription) {
      this.hiveSubscription.unsubscribe();
    }
  }

  fetchHives() {
    this.hiveSubscription = this.hiveService.hives$.subscribe(
      (hives) => {
        this.hives = hives;
        this.loading = false;
      }
    );
  }

  viewInspection(inspectionId: number) {
    this.router.navigate([`./inspections/${inspectionId}`], { queryParams: { search: true } });
  }

  showSearchOptions(action: number) {
    this.searchResults = undefined;
    this.message = null;
    this.error = null;
    this.closeAllSearchOptions();
    this.showSearchOption = action;
    if (action === 1) {
      // show hives list
      this.searchFor = "hives";
    } else if (action === 2) {
      //show date range
      this.searchFor = "dateRange";
    } else if (action === 3) {
      // show temp range
      this.searchFor = "tempRange";
    } else if (action === 4) {
      // show weather conditions
      this.searchFor = "weather";
    }
  }

  closeAllSearchOptions() {
    this.showSearchOption = 0;
    this.searchFor = "";
    this.dateRange = {startDate: "", endDate: ""};
    this.tempRange = {minTemp: 0, maxTemp: 0};
  }

  filterForHiveID(hiveID: number, hiveName: string) {
    this.showSearchOption = 0;
    this.loading = true;
    this.searchService.getInspectionsForHiveID(hiveID).subscribe({
      next: (data) => {
        this.loading = false;
        this.searchResults = data;
        this.message = `${this.searchResults.length} results for ${hiveName}`;
      },error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }

  serchDateRange() {
    this.showSearchOption = 0;
    this.loading = true;
    this.searchService.getInspectionsByDateRange(this.dateRange.startDate, this.dateRange.endDate).subscribe({
      next: (data) => {
        this.loading = false;
        this.searchResults = data;
        this.message = `${this.searchResults.length} results between ${this.dateRange.startDate} and ${this.dateRange.endDate}`;
      },error: (error) => {
        if (error.status === 404) {
          this.error = "No reuslts"
        } else if (error.status === 500) {
          this.error = "Invalid serch input. Please try again";
        } else {
          this.error = "An error occurred. Please try again";
        }
        console.log(JSON.stringify(error));
        this.loading = false;
      },
    });
  }

  searchTempRange() {
    this.showSearchOption = 0;
    this.loading = true;
    this.searchService.getInspectionsByTempRange(this.tempRange.minTemp, this.tempRange.maxTemp).subscribe({
      next: (data) => {
        this.loading = false;
        this.searchResults = data;
        this.message = `${this.searchResults.length} results between ${this.tempRange.minTemp}F and ${this.tempRange.maxTemp}F`;
      },error: (error) => {
        if (error.status === 404) {
          this.error = "No reuslts"
        } else if (error.status === 500) {
          this.error = "Invalid serch input. Please try again";
        } else {
          this.error = "An error occurred. Please try again";
        }
        console.log(JSON.stringify(error));
        this.loading = false;
      },
    });
  }

  searchWeather() {
    this.showSearchOption = 0;
    this.loading = true;
    this.searchService.getInspectionByWeather(this.selectedWeatherCondition).subscribe({
      next: (data) => {
        this.loading = false;
        this.searchResults = data;
        this.message = `${this.searchResults.length} results for ${this.selectedWeatherCondition}`;
      },error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }

}
