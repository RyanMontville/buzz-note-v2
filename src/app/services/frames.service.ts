import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Frame } from '../bees.model';

@Injectable({
  providedIn: 'root'
})
export class FramesService {
  addNewFrame(newFrameSideA: any) {
    throw new Error('Method not implemented.');
  }
  private _frames = new BehaviorSubject<Frame[]>([
    new Frame(1, 1, 1, 'Box 1', '1A', true, false, true, true, false),
    new Frame(2, 1, 1, 'Box 1', '1B', false, false, false, true, false),
    new Frame(3, 1, 1, 'Box 1', '2A', false, false, true, true, true),
    new Frame(4, 1, 1, 'Box 1', '2B', true, false, true, true, false),
    new Frame(5, 1, 1, 'Box 1', '3A', false, false, true, true, true),
    new Frame(6, 1, 1, 'Box 1', '3B', true, false, true, true, false),
    new Frame(7, 1, 1, 'Box 1', '4A', false, false, true, false, true),
    new Frame(8, 1, 1, 'Box 1', '5B', true, false, false, true, false),
    new Frame(9, 1, 1, 'Box 1', '5A', false, true, true, false, true),
    new Frame(10, 1, 1, 'Box 1', '5B', false, true, true, true, false),
    new Frame(11, 1, 1, 'Box 1', '6A', true, false, true, true, false),
    new Frame(12, 1, 1, 'Box 1', '6B', false, false, false, true, false),
    new Frame(13, 1, 1, 'Box 1', '7A', false, false, true, true, true),
    new Frame(14, 1, 1, 'Box 1', '7B', true, false, true, true, false),
    new Frame(15, 1, 1, 'Box 1', '8A', false, false, true, true, true),
    new Frame(16, 1, 1, 'Box 1', '8B', true, false, true, true, false),
    new Frame(17, 1, 1, 'Box 1', '9A', false, false, true, false, true),
    new Frame(18, 1, 1, 'Box 1', '9B', true, false, false, true, false),
    new Frame(19, 1, 1, 'Box 1', '10A', false, true, true, false, true),
    new Frame(20, 1, 1, 'Box 1', '10B', false, true, true, true, false),
    new Frame(21, 2, 1, 'Box 2', '1A', true, false, true, true, false),
    new Frame(22, 2, 1, 'Box 2', '1B', false, false, false, true, false),
    new Frame(23, 2, 1, 'Box 2', '2A', false, false, true, true, true),
    new Frame(24, 2, 1, 'Box 2', '2B', true, false, true, true, false),
    new Frame(25, 2, 1, 'Box 2', '3A', false, false, true, true, true),
    new Frame(26, 2, 1, 'Box 2', '3B', true, false, true, true, false),
    new Frame(27, 2, 1, 'Box 2', '4A', false, false, true, false, true),
    new Frame(28, 2, 1, 'Box 2', '5B', true, false, false, true, false),
    new Frame(29, 2, 1, 'Box 2', '5A', false, true, true, false, true),
    new Frame(30, 2, 1, 'Box 2', '5B', false, true, true, true, false),
    new Frame(31, 2, 1, 'Box 2', '6A', true, false, true, true, false),
    new Frame(32, 2, 1, 'Box 2', '6B', false, false, false, true, false),
    new Frame(33, 2, 1, 'Box 2', '7A', false, false, true, true, true),
    new Frame(34, 2, 1, 'Box 2', '7B', true, false, true, true, false),
    new Frame(35, 2, 1, 'Box 2', '8A', false, false, true, true, true),
    new Frame(36, 2, 1, 'Box 2', '8B', true, false, true, true, false),
    new Frame(37, 2, 1, 'Box 2', '9A', false, false, true, false, true),
    new Frame(38, 2, 1, 'Box 2', '9B', true, false, false, true, false),
    new Frame(39, 2, 1, 'Box 2', '10A', false, true, true, false, true),
    new Frame(40, 2, 1, 'Box 2', '10B', false, true, true, true, false),
    new Frame(41, 3, 1, 'Box 3', '1A', true, false, true, true, false),
    new Frame(42, 3, 1, 'Box 3', '1B', false, false, false, true, false),
    new Frame(43, 3, 1, 'Box 3', '2A', false, false, true, true, true),
    new Frame(44, 3, 1, 'Box 3', '2B', true, false, true, true, false),
    new Frame(45, 3, 1, 'Box 3', '3A', false, false, true, true, true),
    new Frame(46, 3, 1, 'Box 3', '3B', true, false, true, true, false),
    new Frame(47, 3, 1, 'Box 3', '4A', false, false, true, false, true),
    new Frame(48, 3, 1, 'Box 3', '5B', true, false, false, true, false),
    new Frame(49, 3, 1, 'Box 3', '5A', false, true, true, false, true),
    new Frame(50, 3, 1, 'Box 3', '5B', false, true, true, true, false),
    new Frame(51, 3, 1, 'Box 3', '6A', true, false, true, true, false),
    new Frame(52, 3, 1, 'Box 3', '6B', false, false, false, true, false),
    new Frame(53, 3, 1, 'Box 3', '7A', false, false, true, true, true),
    new Frame(54, 3, 1, 'Box 3', '7B', true, false, true, true, false),
    new Frame(55, 3, 1, 'Box 3', '8A', false, false, true, true, true),
    new Frame(56, 3, 1, 'Box 3', '8B', true, false, true, true, false),
    new Frame(57, 3, 1, 'Box 3', '9A', false, false, true, false, true),
    new Frame(58, 3, 1, 'Box 3', '9B', true, false, false, true, false),
    new Frame(59, 3, 1, 'Box 3', '10A', false, true, true, false, true),
    new Frame(60, 3, 1, 'Box 3', '10B', false, true, true, true, false),
  ]);
  public frames$ = this._frames.asObservable();

  constructor() { }

  getFramesByInspectionAndBox(inspectionId: number, boxName: string): Observable<Frame[]> {
    return this.frames$.pipe(
      map(frames =>
        frames.filter(
          frame => frame.inspection_id === inspectionId && frame.box_name === boxName
        )
      )
    );
  }

  addFrame(newFrame: Frame) {
    const currentFrames = this._frames.getValue();
    this._frames.next([...currentFrames, newFrame]);
  }

  getNextID(): Observable<number> {
    return this.frames$.pipe(
      map(frames => {
        if (frames.length === 0) {
          return 1;
        }
        const highestID: number = Math.max(...frames.map(frame => frame.frame_id));
        return highestID + 1;
      })
    )
  }
}
