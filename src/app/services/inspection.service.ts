import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Inspection } from '../bees.model';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private _inspections = new BehaviorSubject<Inspection[]>([
    new Inspection(1, 1, '2024-04-01', 'Hive A', 3, 30, '14:00:00', 75, 'Overcast', 'Calm', 'Low', 'Normal', 'Good', 'None', 'None', true, false, true, true, 'First inspection of the year.')
  ]);
  public inspections$ = this._inspections.asObservable();

  constructor() { }

  getInspectionById(id: number): Observable<Inspection | undefined> {
    return this.inspections$.pipe(
      map((inspections: Inspection[]) => inspections.find(inspection => inspection.inspection_id === id))
    );
  }

  addInspection(newInspection: Inspection) {
    const currentInspections = this._inspections.getValue();
    this._inspections.next([...currentInspections, newInspection]);
  }

  updateInspection(updatedInspection: Inspection) {
    const currentInspections = this._inspections.getValue();
    const updatedInspections = currentInspections.map(inspection =>
      inspection.inspection_id === updatedInspection.inspection_id ? updatedInspection : inspection
    );
    this._inspections.next(updatedInspections);
  }

  updateInspectionNotes(inspectionId: number, newNotes: string) {
    const currentInspections = this._inspections.getValue();
    const updatedInspections = currentInspections.map(inspection => {
      if (inspection.inspection_id === inspectionId) {
        return { ...inspection, notes: newNotes };
      }
      return inspection;
    });
    this._inspections.next(updatedInspections);
  }

  getNextID(): Observable<number> {
    return this.inspections$.pipe(
      map(inspections => {
        if (inspections.length === 0) {
          return 1;
        }
        const highestID: number = Math.max(...inspections.map(inspection => inspection.inspection_id));
        return highestID + 1;
      })
    )
  }
}