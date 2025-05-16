import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Inspection } from '../bees.model';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private _inspections = new BehaviorSubject<Inspection[]>([
    new Inspection(1, 1, '2025-04-01', 'Hive A', 3, 30, '14:00:00', 75, 'Overcast', 'Calm', 'Low', 'Normal', 'Good', 'None', 'None', 'First inspection of the year.')
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

  get currentInspections(): Inspection[] {
    return this._inspections.getValue();
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
}