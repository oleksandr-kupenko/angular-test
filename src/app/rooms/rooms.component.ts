import { Component, OnInit } from '@angular/core';

export interface Room {
  number?: number | null | undefined;
  title: string;
  isEdit: boolean;
}

export interface RoomEdit {
  idRoom: number;
  action: string;
  title?: string;
  number?: number | null | undefined;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [
    { number: 4, title: 'My Bedroom', isEdit: false },
    { number: null, title: 'My Kitchen', isEdit: false },
    { number: 14, title: 'My Move boxes', isEdit: false },
  ];

  constructor() {}

  ngOnInit(): void {}

  addRoom() {
    this.rooms.push({ number: null, title: '', isEdit: true });
  }

  onRoomAction(roomData: RoomEdit) {
    if (roomData.action === 'delete') {
      this.rooms.splice(roomData.idRoom, 1);
    }
    if (roomData.action === 'save' && roomData.title) {
      this.rooms[roomData.idRoom].title = roomData.title;
      this.rooms[roomData.idRoom].number = roomData.number;
      this.rooms[roomData.idRoom].isEdit = false;
    }
    if (roomData.action === 'edit') {
      this.rooms[roomData.idRoom].isEdit = true;
    }
  }
}
