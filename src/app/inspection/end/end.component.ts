import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertsComponent } from "../../alerts/alerts.component";
import { HeaderComponent } from "../../header/header.component";
import { Router, ActivatedRoute } from '@angular/router';
import { InspectionService } from '../../services/inspection.service';
import { WeatherService } from '../../services/weather.service';
import { interval, Subscription, take } from 'rxjs';
import { TempAndCondition, Inspection } from '../../bees.model';

@Component({
  selector: 'app-end',
  imports: [AlertsComponent, HeaderComponent],
  templateUrl: './end.component.html',
  styleUrl: './end.component.css'
})
export class EndComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  message: string | null = null;
  error: string | null = null;
  weather: TempAndCondition = new TempAndCondition(0, "");
  inspectionID: number = 0;
  countdownSubscription?: Subscription;
  updatedInspection: Inspection = new Inspection(0, 0, "", "", 0, 0, "", 0, "", "", "", "", "", "", "", "");
  allFilledIn: boolean = false;
  private inspectionSubscription: Subscription | undefined;

  constructor(
    private weatherService: WeatherService,
    private inspectionService: InspectionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let paraminspectionID = this.route.snapshot.queryParamMap.get('inspectionID');
    if (!paraminspectionID) {
      this.errorCountdown();
    } else {
      this.inspectionID = +paraminspectionID;
      this.updatedInspection.inspection_id = +paraminspectionID;
      this.inspectionSubscription = this.inspectionService.getInspectionById(this.inspectionID).subscribe(data => {
        this.updatedInspection.hive_id = data?.hive_id ?? 0;
          this.updatedInspection.hive_name = data?.hive_name ?? '';
          this.updatedInspection.start_time = data?.start_time ?? '';
          this.updatedInspection.inspection_date = data?.inspection_date ?? '';
      });
      this.fetchWeather();
    }
  }

  ngOnDestroy(): void {
    if (this.inspectionSubscription) {
      this.inspectionSubscription.unsubscribe();
    }
  }

  fetchWeather() {
    this.weatherService.getCurrentWeather().subscribe({
      next: (data) => {
        this.updatedInspection.weather_condition = data.condition;
        this.updatedInspection.weather_temp = Math.round(data.temp);
      }, error: (error) => {
        if (this.error) {
          this.error = this.error + " and " + error;
        } else {
          this.error = error;
        }
      },
    });
  }

  errorCountdown() {
    let counter = 7;
    this.error = `Error, inspection not set, redirecting to homepage in ${counter} seconds. Please try again`;
    this.countdownSubscription = interval(1000)
      .pipe(take(7))
      .subscribe({
        next: () => {
          counter--;
          this.error = `Error, inspection not set, redirecting to homepage in ${counter} seconds. Please try again`;
        },
        complete: () => {
          this.router.navigate(['./']);
        },
      });
  }

  onClick(key: string, value: string) {
    switch (key) {
      case "temerament": {
        this.updatedInspection.bee_temperament = value;
        this.checkIfAllFilled();
        break;
      }
      case "beePop": {
        this.updatedInspection.bee_population = value;
        this.checkIfAllFilled();
        break;
      }
      case "dronePop": {
        this.updatedInspection.drone_population = value;
        this.checkIfAllFilled();
        break;
      }
      case "laying": {
        this.updatedInspection.laying_pattern = value;
        this.checkIfAllFilled();
        break;
      }
      case "beetles": {
        this.updatedInspection.hive_beetles = value;
        this.checkIfAllFilled();
        break;
      }
      case "pests": {
        this.updatedInspection.other_pests = value;
        this.checkIfAllFilled();
        break;
      }
      default: {
        this.error = "Error. Unkown value";
        break;
      }
    }
  }

  checkIfAllFilled() {
    this.message = null;
    let errors: string[] = [];
    if (this.updatedInspection.bee_temperament === '') {
      errors.push("bee temperament");
    }
    if (this.updatedInspection.bee_population === '') {
      errors.push("bee population");
    }
    if (this.updatedInspection.drone_population === '') {
      errors.push("drone population");
    }
    if (this.updatedInspection.laying_pattern === '') {
      errors.push("laying pattern");
    }
    if (this.updatedInspection.hive_beetles === '') {
      errors.push("hive beetles");
    }
    if (this.updatedInspection.other_pests === '') {
      errors.push("other pests");
    }
    if (errors.length > 0) {
      this.message = errors.join(", ") + " must be selected";
      this.allFilledIn = false;
    } else {
      this.allFilledIn = true;
    }
  }

  finishInspection() {
    this.inspectionService.updateInspection(this.updatedInspection);
    this.router.navigate(['./']);
  }

}

