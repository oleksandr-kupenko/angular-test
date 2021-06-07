import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
export class RoomsService {
  cuttentTitleOfEditRoom: string = '';

  private rooms: Room[] = [
    { roomNumber: 4, roomTitle: 'My Bedroom', isEdit: false, isOpen: false, furnitureList: [] },
    { roomNumber: null, roomTitle: 'My Kitchen', isEdit: false, isOpen: false, furnitureList: [] },
    { roomNumber: 14, roomTitle: 'My Move boxes', isEdit: false, isOpen: false, furnitureList: [] },
  ];

  private data$$ = new BehaviorSubject<Room[]>(this.rooms);

  public getRooms$(): Observable<Room[]> {

    // return JSON.parse(JSON.stringify(this.rooms));
    return this.data$$.asObservable();
  }

  public setRooms(val: Room[]) {
    this.data$$.next(val);
  }

  toStopEventsBeforeSave = new Subject<number | null>(); //так??
  sendFurnitureToRoom: Subject<MovieForRoom> = new Subject(); // так ???
  addFurnitureItemToRoom: Subject<number> = new Subject<number>(); // или  так???
  subFurnitureItemToRoom = new EventEmitter<number>();
  trySaveEditModeRoom = new EventEmitter<number>();
  addedNewFurnitureItem = new EventEmitter<number>();
  changeAmountFurnitureInRoom = new EventEmitter<number>();

  isCanCloseEdit: boolean = true;

  constructor(private furnitureService: FurnitureService) {}

}

