import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceDetailsComponent } from './device/device-details/device-details.component';
import { DeviceComponent } from './device/device.component';

const routes: Routes = [
  { path: '', component: DeviceComponent },
  { path: 'device/:id', component: DeviceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
