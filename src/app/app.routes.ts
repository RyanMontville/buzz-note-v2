import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PastComponent } from './past/past.component';
import { InspectionDetailComponent } from './past/inspection-detail/inspection-detail.component';
import { HivesComponent } from './hives/hives.component';
import { HiveDetailComponent } from './hives/hive-detail/hive-detail.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'past', component: PastComponent},
    {path: 'inspections/:id', component: InspectionDetailComponent},
    {path: 'hives', component: HivesComponent},
    {path: 'hives/:id', component: HiveDetailComponent},
];
