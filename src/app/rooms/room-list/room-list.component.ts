import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Room, RoomEdit } from '../rooms.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  @Input() rooms: Room[] = [];

  @Output() roomAction = new EventEmitter<RoomEdit>();

  onRoomAction(roomId: { idRoom: number; action: string }) {
    this.roomAction.emit(roomId);
  }

  constructor() {}

  ngOnInit(): void {}
}
