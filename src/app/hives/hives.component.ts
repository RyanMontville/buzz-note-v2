import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hive } from '../bees.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HivesService } from '../services/hives.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-hives',
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './hives.component.html',
  styleUrl: './hives.component.css'
})
export class HivesComponent implements OnInit, OnDestroy {
  hives: Hive[] | null = null;
  newHive: Hive = new Hive(0, "", 0, true);
  nextHiveID: number = 0;
  loading = false;
  error: string | null = null;
  message: string | null = null;
  showEdit: boolean = false;
  showAdd: boolean = false;
  addingHive: boolean = false;
  private hiveSubscription: Subscription | undefined;
  private nextIdSubscription: Subscription | undefined;

  constructor(
    private hiveService: HivesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchHives();
    this.getNextHiveId();
  }

  fetchHives() {
    this.hiveSubscription = this.hiveService.hives$.subscribe(
      (hives) => {
        this.hives = hives;
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.hiveSubscription) {
      this.hiveSubscription.unsubscribe();
    }
    if (this.nextIdSubscription) {
      this.nextIdSubscription.unsubscribe();
    }
  }

  viewHive(hiveID: number) {
    this.router.navigate([`./hives/${hiveID}`]);
  }

  getNextHiveId(): void {
    this.loading = true;
    this.nextIdSubscription = this.hiveService.getNextID().subscribe({
      next: (nextId) => {
        this.nextHiveID = nextId;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to get next Hive ID.';
        this.loading = false;
      },
    });
  }

  addNewHive(): void {
    this.addingHive = true;
    this.loading = true;
    if (this.nextHiveID === 0) {
      this.error = "Hive Id has not updated";
    } else {
      this.hiveService.addHive(new Hive(this.nextHiveID, this.newHive.hive_name, 0, this.newHive.active));
    this.message = `Hive ${this.newHive.hive_name} added`;
    this.showAdd = false;
    this.addingHive = false;
    this.loading = false;
    this.newHive = new Hive(0, "", 0, true);
    }
  }

  }
