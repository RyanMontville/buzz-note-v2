import { Injectable, OnDestroy } from '@angular/core';
import { InspectionService } from './inspection.service';
import { HivesService } from './hives.service';
import { Hive, Inspection } from '../bees.model';
import { catchError, map, Observable, Subscription, throwError } from 'rxjs';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private inspectionService: InspectionService,
    private hivesService: HivesService
  ) { }

  getInspectionsForHiveID(hiveID: number): Observable<Inspection[]> {
    return this.inspectionService.inspections$.pipe(
      map(inspections => inspections.filter(inspection => inspection.hive_id === hiveID))
    );
  }

  getInspectionsByDateRange(startDate: string, endDate: string): Observable<Inspection[]> {
    return this.inspectionService.inspections$.pipe(
      map(inspections => {
        return inspections.filter(inspection => {
          const inspectionDate = new Date(inspection.inspection_date);
          const start = new Date(startDate);
          const end = new Date(endDate);
          return inspectionDate >= start && inspectionDate <= end;
        });
      })
    );
  }

  getInspectionsByTempRange(minTemp: number, maxTemp: number): Observable<Inspection[]> {
    return this.inspectionService.inspections$.pipe(
      map(inspections => inspections.filter(inspection => 
        inspection.weather_temp >= minTemp && inspection.weather_temp <= maxTemp))
    )
  }

  getInspectionByWeather(condition: string): Observable<Inspection[]> {
    return this.inspectionService.inspections$.pipe(
      map(Inspections => Inspections.filter(inspection => inspection.weather_condition === condition))
    )
  }
}