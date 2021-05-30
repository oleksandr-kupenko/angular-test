import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Room, RoomEdit } from '../rooms.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @Input() room: Room = { number: null, title: '', isEdit: false };
  @Input() index: number = 0;

  @Output() roomAction = new EventEmitter<RoomEdit>();

  title: string = this.room.title;
  number: number | null | undefined = this.room.number;
  isRequireMessage: boolean = false;

  requireValidate() {
    this.isRequireMessage = false;
    if (!this.title) {
      this.isRequireMessage = true;
      return;
    }
  }

  onRoomAction(action: string) {
    if (action === 'save') {
      this.requireValidate();
    }
    this.roomAction.emit({
      idRoom: this.index,
      action: action,
      title: this.title,
      number: this.number,
    });
  }

  constructor() {}

  ngOnInit(): void {
    this.title = this.room.title;
    this.number = this.room.number;
  }
}
