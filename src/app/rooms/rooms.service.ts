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
  sendFurnitureToRoom = new EventEmitter<MovieForRoom>();
  addFurnitureItemToRoom = new EventEmitter<number>();
  subFurnitureItemToRoom = new EventEmitter<number>();
  trySaveEditModeRoom = new EventEmitter<number>();
  addedNewFurnitureItem = new EventEmitter<number>();
  changeAmountFurnitureInRoom = new EventEmitter<number>();

  isCanCloseEdit: boolean = true;

  rooms: Room[] = [
    { roomNumber: 4, roomTitle: 'My Bedroom', isEdit: false, isOpen: true, furnitureList: [] },
    { roomNumber: null, roomTitle: 'My Kitchen', isEdit: false, isOpen: false, furnitureList: [] },
    { roomNumber: 14, roomTitle: 'My Move boxes', isEdit: false, isOpen: false, furnitureList: [] },
  ];

  constructor(private furnitureService: FurnitureService) {}

  getRooms() {
    return this.rooms;
  }
}
