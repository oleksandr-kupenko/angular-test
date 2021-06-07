import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { FurnitureService, MovieForRoom } from '../furniture/furniture.service';
import { Subject } from 'rxjs';

export interface Room {
  roomNumber?: number | null | undefined;
  roomTitle: string;
  isEdit: boolean;
  isOpen: boolean;
  furnitureList: MovieForRoom[];
}

@Injectable()
export class RoomsService implements OnDestroy {
  cuttentTitleOfEditRoom: string = '';

  ngOnDestroy(): void {
    console.log('dead rooms');
  }

  toStopEventsBeforeSave = new Subject<number | null>(); //так??
  sendFurnitureToRoom: Subject<MovieForRoom> = new Subject(); // так ???
  addFurnitureItemToRoom: Subject<number> = new Subject<number>(); // или  так???
  subFurnitureItemToRoom = new EventEmitter<number>();
  trySaveEditModeRoom = new EventEmitter<number>();
  addedNewFurnitureItem = new EventEmitter<number>();
  changeAmountFurnitureInRoom = new EventEmitter<number>();

  isCanCloseEdit: boolean = true;

  rooms: Room[] = [
    { roomNumber: 4, roomTitle: 'My Bedroom', isEdit: false, isOpen: false, furnitureList: [] },
    { roomNumber: null, roomTitle: 'My Kitchen', isEdit: false, isOpen: false, furnitureList: [] },
    { roomNumber: 14, roomTitle: 'My Move boxes', isEdit: false, isOpen: false, furnitureList: [] },
  ];

  constructor(private furnitureService: FurnitureService) {}

  getRooms() {
    return JSON.parse(JSON.stringify(this.rooms));
  }
}
