import { Component, OnInit } from '@angular/core';
import { MovieForRoom } from '../furniture/furniture.service';

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

  ngOnInit(): void {
    this.rooms = this.roomsService.getRooms();
    this.roomsService.sendFurnitureToRoom.subscribe((movie) => this.addFurnitureItemToRoom(movie));
    this.roomsService.addAmountFurnitureItemInRoom.subscribe((idxFurnitur) => this.addAmountFurnitureItem(idxFurnitur));
    this.roomsService.subAmountFurnitureItemInRoom.subscribe((idxFurnitur) => this.subAmountFurnitureItem(idxFurnitur));
  }

  checkIsDublicateEditMode(): boolean {
    const result = document.getElementById('edit-mode') ? true : false;
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
        if (!this.roomsService.isCanCloseEdit || this.checkIsDublicateEditMode()) {
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
          this.roomsService.isCanCloseEdit = true;
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
        if (this.openId !== null) {
          this.rooms[this.openId].furnitureList = [];
        }
        break;
    }
  }

  addFurnitureItemToRoom(movie: MovieForRoom) {
    if (this.openId !== null) {
      const checkExist = this.rooms[this.openId].furnitureList.some((movieItem) => {
        return movieItem.id === movie.id;
      });
      if (!checkExist) {
        movie.count = 1;
        this.rooms[this.openId].furnitureList.push(movie);
      } else {
        const currentIndex = this.rooms[this.openId].furnitureList
          .map((movieItem) => {
            return movieItem.id;
          })
          .indexOf(movie.id);
        this.rooms[this.openId].furnitureList[currentIndex].count++;
      }
    }
  }

  addAmountFurnitureItem(idxFurnitur: number) {
    if (this.openId !== null) {
      this.rooms[this.openId].furnitureList[idxFurnitur].count++;
    }
  }

  subAmountFurnitureItem(idxFurnitur: number) {
    if (this.openId !== null) {
      const currentFurnitureList = this.rooms[this.openId].furnitureList;
      if (currentFurnitureList[idxFurnitur].count > 1) {
        this.rooms[this.openId].furnitureList[idxFurnitur].count--;
      } else {
        this.rooms[this.openId].furnitureList = currentFurnitureList.filter((item, index) => index != idxFurnitur);
      }
    }
  }

  constructor(private roomsService: RoomsService) {}

  checkCanAddRoom(preCountRooms: number, postCountRooms: number): void {
    preCountRooms === postCountRooms ? (this.roomsService.isCanCloseEdit = false) : (this.roomsService.isCanCloseEdit = true);
  }

  addRoom() {
    const preCountRooms: number = this.rooms.length;
    if (!this.checkIsDublicateEditMode()) {
      let newRoom: Room = { roomNumber: null, roomTitle: '', isEdit: true, isOpen: false, furnitureList: [] };
      this.rooms = [...this.rooms, newRoom];
    }
    const postCountRooms: number = this.rooms.length;
    this.checkCanAddRoom(preCountRooms, postCountRooms);
  }
}
