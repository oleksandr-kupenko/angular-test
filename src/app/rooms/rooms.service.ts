import { EventEmitter, Injectable } from '@angular/core';
import { FurnitureService, MovieForRoom } from '../furniture/furniture.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

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

  //toStopEventsBeforeSave = new Subject<number | null>(); //так??
  sendFurnitureToRoom$$: Subject<MovieForRoom> = new Subject(); // так ???
  addFurnitureItemToRoom$$: Subject<number> = new Subject<number>(); // или  так???
  subFurnitureItemToRoom$$ = new Subject<number>();
  trySaveEditModeRoom = new Subject<number>();
  //addedNewFurnitureItem = new Subject<number>();
  changeAmountFurnitureInRoom$$ = new Subject<number>();

  isCanCloseEdit: boolean = true;

  rooms: Room[] = [
    { roomNumber: 4, roomTitle: 'My Bedroom', isEdit: false, isOpen: false, furnitureList: [] },
    { roomNumber: null, roomTitle: 'My Kitchen', isEdit: false, isOpen: false, furnitureList: [] },
    { roomNumber: 14, roomTitle: 'My Move boxes', isEdit: false, isOpen: false, furnitureList: [] },
  ];

  private data$$ = new BehaviorSubject<Room[]>(this.rooms);

  constructor(private furnitureService: FurnitureService) {}

  public getRooms$(): Observable<Room[]> {
    // return JSON.parse(JSON.stringify(this.rooms));
    return this.data$$.asObservable();
  }
}
