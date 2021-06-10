import { Injectable } from '@angular/core';
import { FurnitureService, MovieForRoom } from '../furniture/furniture.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface RoomTable {
  roomNumber?: number | null | undefined;
  roomTitle: string;
  furnitureList: MovieForRoom[];
  isEdit?: boolean;
  isOpen?: boolean;
}

export interface RoomStateTable extends RoomTable {
  /*   isEdit: boolean;
  isOpen: boolean; */
}

@Injectable()
export class RoomsService {
  cuttentTitleOfEditRoom: string = '';

  //toStopEventsBeforeSave = new Subject<number | null>(); //так??
  sendFurnitureToRoom$$: Subject<MovieForRoom> = new Subject(); // так ???
  addFurnitureItemToRoom$$: Subject<number> = new Subject<number>(); // или  так???
  subFurnitureItemToRoom$$ = new Subject<number>();
  trySaveEditModeRoom = new Subject<number>();
  changeAmountFurnitureInRoom$$ = new Subject<number>();

  isCanCloseEdit: boolean = true;
  openIdxRoom: number | null = null;

  rooms: RoomTable[] = [
    { roomNumber: null, roomTitle: 'My Bedroom', furnitureList: [] },
    { roomNumber: null, roomTitle: 'My Kitchen', furnitureList: [] },
    { roomNumber: null, roomTitle: 'My Move boxes', furnitureList: [] },
  ];

  private data$$ = new BehaviorSubject<RoomTable[]>(this.rooms);

  constructor(private furnitureService: FurnitureService, private http: HttpClient) {}

  public updateData() {
    this.data$$.next(this.rooms);
  }

  public getRooms$(): Observable<RoomTable[]> {
    // return JSON.parse(JSON.stringify(this.rooms));
    return this.data$$.asObservable();
  }

  public saveRoom$(room: RoomTable, id: number): Observable<RoomTable> {
    this.rooms[id] = room; //Временная имитация изменений на сервере
    return this.http.put<RoomTable>(`https://jsonplaceholder.typicode.com/todos/${id + 1}`, room); //+1, так как не принимает 0 сервер
  }

  public deleteRoom$(id: number): Observable<RoomTable> {
    this.rooms = this.rooms.filter((room, index) => index !== id); //Временная имитация изменений на сервере
    return this.http.delete<RoomTable>(`https://jsonplaceholder.typicode.com/todos/${id + 1}`); //+1, так как не принимает 0 сервер
  }
}
