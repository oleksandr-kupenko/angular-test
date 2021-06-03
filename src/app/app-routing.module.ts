import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LocationComponent } from './location/location.component';
import { MoveDetalisComponent } from './move-detalis/move-detalis.component';

const routes: Routes = [
  { path: '', component: InventoryComponent },
  { path: 'location', component: LocationComponent },
  { path: 'move-detalis', component: MoveDetalisComponent, children: [{ path: ':id', component: LocationComponent }] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
