import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AverageDetail } from '../bees.model';

@Injectable({
  providedIn: 'root'
})
export class AveragesService {
  private _averages = new BehaviorSubject<AverageDetail[]>([
    new AverageDetail(1, 1, 'Box 1', 10, '50', '20', '70', '0', '50', 'Not Spotted', false),
    new AverageDetail(2, 1, 'Box 2', 10, '70', '40', '55', '7', '100', '5B', false),
    new AverageDetail(3, 1, 'Box 3', 10, '23', '32', '79', '66', '98', 'Not Spotted', false)
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

  getNextID(): Observable<number> {
    return this.averages$.pipe(
      map(averages => {
        if (averages.length === 0) {
          return 1;
        }
        const highestID: number = Math.max(...averages.map(average => average.average_id));
        return highestID + 1;
      })
    )
  }
}
