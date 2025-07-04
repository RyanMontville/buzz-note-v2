import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Hive } from '../bees.model';

@Injectable({
  providedIn: 'root'
})
export class HivesService {
  private _hives = new BehaviorSubject<Hive[]>([
    new Hive(1, 'Hive A', 3, true),
    new Hive(2, 'Hive B', 3, true)
  ]);
  public hives$ = this._hives.asObservable();

  constructor() { }

  getHiveById(hiveID: number): Observable<Hive | undefined> {
    return this.hives$.pipe(
      map((hives: Hive[]) => hives.find(hive => hive.hive_id === hiveID))
    ); 
  }

  addHive(newHive: Hive) {
    const currentHves = this._hives.getValue();
    this._hives.next([...currentHves, newHive]);
  }

  updateHive(hivetoUpdate: Hive) {
    const currentHves = this._hives.getValue();
    const updatesHives = currentHves.map(hive => 
      hive.hive_id === hivetoUpdate.hive_id ? hivetoUpdate : hive
    );
    this._hives.next(updatesHives);
  }

  getNextID(): Observable<number> {
    return this.hives$.pipe(
      map(hives => {
        if (hives.length === 0) {
          return 1;
        }
        const highestID: number = Math.max(...hives.map(hive => hive.hive_id));
        return highestID + 1;
      })
    )
  }
}
