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
  openId: number | null = 0;
  isStopedEventsBeforeSave: boolean = false;

  onStopAllEventsBeforeSave(status: boolean) {
    this.isStopedEventsBeforeSave = status;
    console.log(this.isStopedEventsBeforeSave);
  }

  checkRoomWithoutTitle(): boolean {
    const result = document.getElementById('edit-mode') ? true : false;
    console.log('result', result);
    return result;
  }

  onRoomAction(roomData: RoomEdit): void {
    const title = roomData.roomTitle;
    switch (roomData.action) {
      case 'delete':
        this.rooms = this.rooms.filter((room, index) => {
          return index != roomData.idRoom;
        });
        break;
      case 'edit':
        if (!this.roomsService.isCanCloseEdit) {
          return;
        }
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

  checkCanAddRoom(preCountRooms: number, postCountRooms: number): void {
    preCountRooms === postCountRooms ? (this.roomsService.isCanCloseEdit = false) : (this.roomsService.isCanCloseEdit = true);
  }

  addRoom() {
    const preCountRooms: number = this.rooms.length;
    if (!this.checkRoomWithoutTitle()) {
      let newRoom: Room = { roomNumber: null, roomTitle: '', isEdit: true, isOpen: false, furnitureList: [] };
      this.rooms = [...this.rooms, newRoom];
    }
    const postCountRooms: number = this.rooms.length;
    this.checkCanAddRoom(preCountRooms, postCountRooms);
  }
}
