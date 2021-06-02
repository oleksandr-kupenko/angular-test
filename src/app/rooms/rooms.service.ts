import { EventEmitter, Injectable } from '@angular/core';
import { FurnitureService, Movie, MovieForRoom } from '../furniture/furniture.service';

export interface Room {
  roomNumber?: number | null | undefined;
  roomTitle: string;
  isEdit: boolean;
  isOpen: boolean;
  furnitureList: MovieForRoom[];
}

/* export interface RoomEdit {
  action: string;
  idRoom: number;
  title: string;
  number?: number | null | undefined;
} */

@Injectable()
export class RoomsService {
  cuttentTitleOfEditRoom: string = '';

  toStopEventsBeforeSave = new EventEmitter<number | null>();

  isCanCloseEdit: boolean = true;

  roomEditIndex: number | null = null;
  titlePreComponent: string = '';
  openId: number | null = 0;

  rooms: Room[] = [
    { roomNumber: 4, roomTitle: 'My Bedroom', isEdit: false, isOpen: true, furnitureList: [] },
    { roomNumber: null, roomTitle: 'My Kitchen', isEdit: false, isOpen: false, furnitureList: [] },
    { roomNumber: 14, roomTitle: 'My Move boxes', isEdit: false, isOpen: false, furnitureList: [] },
  ];

  constructor(private furnitureService: FurnitureService) {}

  getRooms() {
    return this.rooms;
  }
  /* 
  getPreTitle(preIndex: number): boolean {
    this.editOtherRoom.emit(preIndex);
    if (!this.titlePreComponent) {
      return false;
    } else {
      return true;
    }
  } */

  /*   addRoom() {
    if (!this.isStopedEventsBeforeSave) {
      debugger;
      this.rooms.push({ roomNumber: null, roomTitle: '', isEdit: true, isOpen: false, furnitureList: [] });
      this.roomEditIndex = this.rooms.length - 1;
    }
  } */

  /*   saveRoom(roomData: RoomEdit) {
    if (this.roomEditIndex !== null && this.getPreTitle(this.roomEditIndex) === false) {
      return;
    }
    if (roomData.title) {
      this.rooms[roomData.idRoom].number = roomData.number;
      this.rooms[roomData.idRoom].isEdit = false;
      this.rooms[roomData.idRoom].title = roomData.title;
      if (this.roomEditIndex || this.roomEditIndex === 0) {
        this.rooms[this.roomEditIndex].isEdit = false;
      }
    }
  } */

  /* deleteRoom(idRoom: number) {
    if (idRoom === this.roomEditIndex) {
      this.roomEditIndex = 0;
    }
    this.rooms.splice(idRoom, 1);
  }

  editRoom(idRoom: number) {
    if (this.roomEditIndex !== null) {
      const preEditIndex = this.roomEditIndex;
      this.getPreTitle(preEditIndex);
      if (!this.titlePreComponent) {
        return;
      }
    }

    if (this.roomEditIndex !== null) {
      this.rooms[this.roomEditIndex].isEdit = false;
    }
    this.rooms[idRoom].isEdit = true;
    this.roomEditIndex = idRoom;
  }

  openCloseRoom(idRoom: number) {
    if (this.openId !== null && this.openId !== idRoom) {
      this.rooms[this.openId].isOpen = false;
    }
    this.rooms[idRoom].isOpen = !this.rooms[idRoom].isOpen;
    if (this.rooms[idRoom].isOpen) {
      this.openId = idRoom;
    } else {
      this.openId = null;
    }
  } */

  addFurniture(movie: MovieForRoom) {
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

  addAmountFurnitureItem(idxMovie: number) {
    if (this.openId !== null) {
      this.rooms[this.openId].furnitureList[idxMovie].count++;
    }
  }

  subAmountFurnitureItem(idxMovie: number) {
    if (this.openId !== null) {
      const currentFurnitureList = this.rooms[this.openId].furnitureList;
      if (currentFurnitureList[idxMovie].count > 1) {
        this.rooms[this.openId].furnitureList[idxMovie].count--;
      } else {
        this.rooms[this.openId].furnitureList = currentFurnitureList.filter((item, index) => index != idxMovie);
      }
    }
  }

  clearRoom() {
    if (this.openId !== null) {
      this.rooms[this.openId].furnitureList = [];
    }
  }
}
