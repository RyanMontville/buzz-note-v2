import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hive } from '../../bees.model';
import { Subscription } from 'rxjs';
import { HivesService } from '../../services/hives.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BoxDetailComponent } from "../box-detail/box-detail.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-hive-detail',
  imports: [BoxDetailComponent, FormsModule, CommonModule, HeaderComponent],
  templateUrl: './hive-detail.component.html',
  styleUrl: './hive-detail.component.css'
})
export class HiveDetailComponent implements OnInit, OnDestroy {
  hiveID: number = 0;
  hive: Hive = new Hive(0, "", 0, false);
  updatedHive: Hive = new Hive(0, "", 0, false);
  loading = false;
  error: string | null = null;
  showEdit: boolean = false;
  message: string | null = null;
  private hiveSubscription: Subscription | undefined;

  constructor(
    private hiveService: HivesService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading = true;
    this.hiveID = Number(this.route.snapshot.paramMap.get('id'));
    this.hiveSubscription = this.hiveService.getHiveById(this.hiveID).subscribe(
      (hive) => {
        if (hive) {
          this.hive = hive;
          this.updatedHive = hive;
        this.updatedHive = hive;
        this.loading = false;
        } else {
          this.error = "Error. Hive not found";
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.hiveSubscription) {
      this.hiveSubscription.unsubscribe();
    }
  }

  onSubmit(action: number) {
    if (action === 1) {
      // update hive
      this.hiveService.updateHive(this.updatedHive);
      this.showEdit = false;
          this.message = "Hive updated succefully";
          setTimeout(() => {
            this.message = null;
          }, 5000);
    } else if (action === 2) {
      // cancel
      this.showEdit = false;
      if (this.hive) this.updatedHive = this.hive;
    }
  }

}
