import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomsService } from 'src/app/rooms/rooms.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private roomsService: RoomsService) {}

  storeRooms() {
    const rooms = this.roomsService.getRooms$();
    console.log('rroms:', rooms);
    this.http.put('https://jsonplaceholder.typicode.com/todos/1', rooms).subscribe((response) => {
      console.log(response);
    });
  }
}
