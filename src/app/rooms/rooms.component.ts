import { Component, OnInit } from '@angular/core';

import { RoomsService } from './rooms.service';

export interface RoomEdit {
  idRoom: number;
  action: string;
  title?: string;
  number?: number | null | undefined;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms = this.roomsService.rooms;

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {}

  addRoom() {
    this.roomsService.addRoom();
  }
}
