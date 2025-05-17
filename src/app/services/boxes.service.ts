import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Box } from '../bees.model';

@Injectable({
  providedIn: 'root'
})
export class BoxesService {
  private _boxes = new BehaviorSubject<Box[]>([
    new Box(1, 1, 'Box 1', 10, 'Normal', false, true),
    new Box(2, 1, 'Box 2', 10, 'Normal', false, true),
    new Box(3, 1, 'Box 3', 10, 'Normal', false, true),
  ]);
  public boxes$ = this._boxes.asObservable();

  constructor() { }

  getBoxesForHiveId(hiveId: number): Observable<Box[] | undefined> {
    return this.boxes$.pipe(
      map((boxes: Box[]) => boxes.filter(box => box.hive_id === hiveId))
    );
  }

  addBox(newBox: Box) {
    const currentBoxes = this._boxes.getValue();
    this._boxes.next([...currentBoxes, newBox]);
  }

  updateBox(boxToUpdate: Box) {
    const currentBoxes = this._boxes.getValue();
    const updatedBoxes = currentBoxes.map(box => 
    box.box_id === boxToUpdate.box_id ? boxToUpdate : box );
    this._boxes.next(updatedBoxes);
  }

  getNextID(): Observable<number> {
    return this.boxes$.pipe(
      map(boxes => {
        if (boxes.length === 0) {
          return 1;
        }
        const highestID: number = Math.max(...boxes.map(box => box.box_id));
        return highestID + 1;
      })
    )
  }
}
