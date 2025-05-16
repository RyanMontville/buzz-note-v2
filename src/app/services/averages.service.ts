import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AverageDetail } from '../bees.model';

@Injectable({
  providedIn: 'root'
})
export class AveragesService {
  private _averages = new BehaviorSubject<AverageDetail[]>([
    new AverageDetail(1, 1, 'Box 1', 10, '50', '20', '70', '0', '50', 'Not Spotted', false)
  ]);
  public averages$ = this._averages.asObservable();

  constructor() { }

  getAverageForInspectionId(inspectionId: number): Observable<AverageDetail[] | undefined> {
    return this.averages$.pipe(
      map((averages: AverageDetail[]) => averages.filter(average => average.inspection_id === inspectionId))
    );
  }

  addAverage(newAverage: AverageDetail) {
    const currentAverages = this._averages.getValue();
    this._averages.next([...currentAverages, newAverage]);
  }

  get currentAverages(): AverageDetail[] {
    return this._averages.getValue();
  }
}
