import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Box, Hive } from '../../bees.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BoxesService } from '../../services/boxes.service';
import { HivesService } from '../../services/hives.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-box-detail',
  imports: [FormsModule, CommonModule],
  templateUrl: './box-detail.component.html',
  styleUrl: './box-detail.component.css'
})
export class BoxDetailComponent implements OnInit, OnDestroy {
  @Input() hiveID: number = 0;
  @Input() numBoxes: number = 0;
  boxes: Box[] | null = null;
  hive: Hive | undefined;
  loading = false;
  error: string | null = null;
  message: string | null = null;
  showEdit: boolean = false;
  showAdd: boolean = false;
  updatedBox: Box = new Box(0, 0, "", 0, "", false, false);
  newBox: Box = new Box(0, 0, "", 0, "", false, false);
  nextId: number = 0;
  private boxSubscription: Subscription | undefined;
  private hiveSubscription: Subscription | undefined;
  private nextIdSubscription: Subscription | undefined;

  constructor(
    private boxService: BoxesService,
    private hiveService: HivesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.boxSubscription = this.boxService.getBoxesForHiveId(this.hiveID).subscribe(
      (boxes) => {
        if (boxes) {
          this.boxes = boxes;
          this.loading = false;
          this.newBox = new Box(0, this.hiveID, "", 0, "", false, false);
        } else {
          this.error = "Error loading boxes";
          this.loading = false;
        }
      });
    this.hiveSubscription = this.hiveService.getHiveById(this.hiveID).subscribe(
      (hive) => {
        if (hive) {
          this.hive = hive;
          this.loading = false;
        } else {
          this.error = "Error loading hive details";
          this.loading = false;
        }
      });
      this.nextIdSubscription = this.boxService.getNextID().subscribe({
        next: (nextId) => {
          this.nextId = nextId;
        },
        error: (error) => {
          this.error = 'Failed to get next box ID.';
        },
      })
  }
  ngOnDestroy(): void {
    if (this.boxSubscription) {
      this.boxSubscription.unsubscribe();
    }
    if (this.hiveSubscription) {
      this.hiveSubscription.unsubscribe();
    }
    if (this.nextIdSubscription) {
      this.nextIdSubscription.unsubscribe();
    }
  }

  editBox(boxId: number) {
    this.updatedBox = this.boxes?.find((box) => box.box_id === boxId)!;
    this.showEdit = true;
  }

  onSubmit(action: number) {
    if (action === 1) {
      // update box
      this.boxService.updateBox(this.updatedBox);
      this.showEdit = false;
      this.message = "Updated box succefully";
      setTimeout(() => {
        this.message = null;
      }, 5000);
    } else if (action === 2) {
      // cancel update box
      this.showEdit = false;
      this.updatedBox = new Box(0, 0, "", 0, "", false, false);
    } else if (action === 3) {
      // add new box
      this.boxService.addBox(this.newBox);
      this.numBoxes += 1;
      if (this.hive) {
        this.hiveService.updateHive(new Hive(this.hiveID, this.hive?.hive_name, this.numBoxes, this.hive?.active));
        this.showAdd = false;
        this.message = `Added new box succefully. This hive now has ${this.numBoxes} boxes`;
        setTimeout(() => {
          this.message = null;
        }, 5000);
      } else {
        this.error = "Error while adding box.";
      }

    } else if (action === 4) {
      // cancel add new box
      this.showAdd = false;
      this.newBox = new Box(this.nextId, this.hiveID, "", 0, "", false, false);
    }
  }
}
