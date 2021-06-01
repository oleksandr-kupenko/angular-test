import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './rooms/room/room.component';
import { FormsModule } from '@angular/forms';
import { FurnitureItemComponent } from './rooms/room/furniture-item/furniture-item.component';
import { FurnitureService } from './furniture/furniture.service';
import { RoomsService } from './rooms/rooms.service';
import { LocationComponent } from './location/location.component';
import { MoveDetalisComponent } from './move-detalis/move-detalis.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ClickOtsideDeirective } from './rooms/room/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    FurnitureComponent,
    HeaderComponent,
    RoomsComponent,
    RoomComponent,
    FurnitureItemComponent,
    LocationComponent,
    MoveDetalisComponent,
    InventoryComponent,
    ClickOtsideDeirective,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatSliderModule, MatIconModule, HttpClientModule, FormsModule],
  providers: [FurnitureService, RoomsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
