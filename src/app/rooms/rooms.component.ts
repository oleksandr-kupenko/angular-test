import { Component, OnInit } from '@angular/core';

import { RoomsService, Room } from './rooms.service';

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
  rooms: Room[] = [];

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.rooms = this.roomsService.getRooms();
  }

  addRoom() {
    let newRoom = { number: null, title: '', isEdit: true, isOpen: false, furnitureList: [] };
    this.rooms = [...this.rooms, newRoom];
  }
}
