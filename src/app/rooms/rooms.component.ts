import { Component, OnInit } from '@angular/core';

import { RoomsService, Room } from './rooms.service';

export interface RoomEdit {
  action: string;
  idRoom: number;
  roomTitle: string;
  roomNumber?: number | null | undefined;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  openId: number | null = null;

  onRoomAction(roomData: RoomEdit): void {
    switch (roomData.action) {
      case 'delete':
        this.rooms = this.rooms.filter((room, index) => {
          return index != roomData.idRoom;
        });
        break;
      case 'edit':
        let newRooms: Room[] = [...this.rooms];
        newRooms[roomData.idRoom].isEdit = true;
        this.rooms = newRooms;
        break;
      case 'save':
        if (roomData.roomTitle) {
          this.rooms[roomData.idRoom].roomTitle = roomData.roomTitle;
          this.rooms[roomData.idRoom].roomNumber = roomData.roomNumber;
          this.rooms[roomData.idRoom].isEdit = false;
        }
        break;
      case 'openClose':
        if (this.openId !== null && this.openId !== roomData.idRoom) {
          this.rooms[this.openId].isOpen = false;
        }
        this.rooms[roomData.idRoom].isOpen = !this.rooms[roomData.idRoom].isOpen;
        if (this.rooms[roomData.idRoom].isOpen) {
          this.openId = roomData.idRoom;
        } else {
          this.openId = null;
        }
        break;
      case 'clear':
        break;
    }
  }

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.rooms = this.roomsService.getRooms();
  }

  addRoom() {
    console.log(this.roomsService.titlePreComponent);
    if (this.roomsService.roomEditIndex != null) {
      this.roomsService.getPreTitle(this.roomsService.roomEditIndex);
    }

    let newRoom: Room = { roomNumber: null, roomTitle: '', isEdit: true, isOpen: false, furnitureList: [] };
    this.rooms = [...this.rooms, newRoom];
  }
}
