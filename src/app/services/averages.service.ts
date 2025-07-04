import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AverageDetail } from '../bees.model';

@Injectable({
  providedIn: 'root'
})
export class AveragesService {
  private _averages = new BehaviorSubject<AverageDetail[]>([
new AverageDetail(1, 1, 'Box 1', 10, '40.0', '20.0', '80.0', '80.0', '40.0', 'Not Spotted', false),
new AverageDetail(2, 1, 'Box 2', 10, '40.0', '20.0', '80.0', '80.0', '40.0', 'Frame 4B', false),
new AverageDetail(3, 1, 'Box 3', 10, '40.0', '20.0', '80.0', '80.0', '40.0', 'Not Spotted', false),
new AverageDetail(4, 2, 'Box 1', 10, '20.0', '50.0', '80.0', '40.0', '50.0', 'Frame 10A', false),
new AverageDetail(5, 2, 'Box 2', 10, '40.0', '60.0', '80.0', '10.0', '60.0', 'Not Spotted', false),
new AverageDetail(6, 2, 'Box 3', 10, '40.0', '60.0', '50.0', '80.0', '70.0', 'Not Spotted', false),
new AverageDetail(7, 3, 'Box 1', 10, '60.0', '90.0', '10.0', '70.0', '50.0', 'Not Spotted', false),
new AverageDetail(8, 3, 'Box 2', 10, '70.0', '70.0', '40.0', '50.0', '70.0', 'Not Spotted', false),
new AverageDetail(9, 3, 'Box 3', 10, '90.0', '40.0', '20.0', '50.0', '60.0', 'Not Spotted', false),
new AverageDetail(10, 4, 'Box 1', 10, '80.0', '40.0', '50.0', '40.0', '60.0', 'Frame 5B', false),
new AverageDetail(11, 4, 'Box 2', 10, '50.0', '40.0', '20.0', '50.0', '80.0', 'Not Spotted', false),
new AverageDetail(12, 4, 'Box 3', 10, '30.0', '70.0', '40.0', '40.0', '60.0', 'Not Spotted', false),
new AverageDetail(13, 5, 'Box 1', 10, '40.0', '70.0', '40.0', '40.0', '70.0', 'Not Spotted', false),
new AverageDetail(14, 5, 'Box 2', 10, '60.0', '60.0', '50.0', '40.0', '40.0', 'Frame 6A', false),
new AverageDetail(15, 5, 'Box 3', 10, '40.0', '60.0', '60.0', '40.0', '40.0', 'Not Spotted', false),
new AverageDetail(16, 6, 'Box 1', 10, '40.0', '30.0', '60.0', '30.0', '70.0', 'Not Spotted', false),
new AverageDetail(17, 6, 'Box 2', 10, '60.0', '30.0', '20.0', '50.0', '50.0', 'Not Spotted', false),
new AverageDetail(18, 6, 'Box 3', 10, '60.0', '70.0', '40.0', '40.0', '60.0', 'Not Spotted', false),
new AverageDetail(19, 7, 'Box 1', 10, '40.0', '40.0', '60.0', '70.0', '60.0', 'Frame 7B', false),
new AverageDetail(20, 7, 'Box 2', 10, '70.0', '60.0', '70.0', '40.0', '50.0', 'Not Spotted', false),
new AverageDetail(21, 7, 'Box 3', 10, '50.0', '60.0', '60.0', '50.0', '60.0', 'Not Spotted', false),
new AverageDetail(22, 8, 'Box 1', 10, '60.0', '40.0', '60.0', '40.0', '50.0', 'Not Spotted', false),
new AverageDetail(23, 8, 'Box 2', 10, '70.0', '40.0', '60.0', '40.0', '60.0', 'Not Spotted', false),
new AverageDetail(24, 8, 'Box 3', 10, '40.0', '50.0', '20.0', '80.0', '40.0', 'Frame 3B', false),
new AverageDetail(25, 9, 'Box 1', 10, '70.0', '60.0', '60.0', '50.0', '50.0', 'Not Spotted', false),
new AverageDetail(26, 9, 'Box 2', 10, '70.0', '70.0', '60.0', '60.0', '80.0', 'Frame 5A', false),
new AverageDetail(27, 9, 'Box 3', 10, '60.0', '30.0', '60.0', '30.0', '40.0', 'Not Spotted', false),
new AverageDetail(28, 10, 'Box 1', 10, '50.0', '40.0', '60.0', '40.0', '30.0', 'Not Spotted', false),
new AverageDetail(29, 10, 'Box 2', 10, '50.0', '70.0', '60.0', '50.0', '60.0', 'Not Spotted', false),
new AverageDetail(30, 10, 'Box 3', 10, '50.0', '60.0', '60.0', '50.0', '50.0', 'Frame 7B', false),
new AverageDetail(31, 11, 'Box 1', 10, '50.0', '60.0', '50.0', '60.0', '80.0', 'Not Spotted', false),
new AverageDetail(32, 11, 'Box 2', 10, '50.0', '40.0', '60.0', '50.0', '60.0', 'Not Spotted', false),
new AverageDetail(33, 11, 'Box 3', 10, '50.0', '50.0', '70.0', '70.0', '30.0', 'Not Spotted', false),
new AverageDetail(34, 12, 'Box 1', 10, '40.0', '60.0', '30.0', '40.0', '30.0', 'Not Spotted', false),
new AverageDetail(35, 12, 'Box 2', 10, '40.0', '50.0', '70.0', '50.0', '60.0', 'Not Spotted', false),
new AverageDetail(36, 12, 'Box 3', 10, '60.0', '60.0', '60.0', '30.0', '50.0', 'Frame 1A', false),
new AverageDetail(37, 13, 'Box 1', 10, '50.0', '30.0', '50.0', '60.0', '60.0', 'Not Spotted', false),
new AverageDetail(38, 13, 'Box 2', 10, '40.0', '60.0', '60.0', '70.0', '30.0', 'Not Spotted', false),
new AverageDetail(39, 13, 'Box 3', 10, '30.0', '60.0', '40.0', '30.0', '20.0', 'Not Spotted', false)
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
