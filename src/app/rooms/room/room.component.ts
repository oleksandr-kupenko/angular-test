import { Component, Input, OnInit, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';

import { RoomsService, Room } from '../rooms.service';
import { RoomEdit } from '../rooms.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @Input() room: Room = { number: null, title: '', isEdit: false, isOpen: false, furnitureList: [] };
  @Input() index: number = 0;

  @Output() roomAction = new EventEmitter<RoomEdit>();

  title: string = this.room.title;
  number: number | null | undefined = this.room.number;
  isRequireMessage: boolean = false;

  requireValidate() {
    this.isRequireMessage = false;
    if (!this.title) {
      this.isRequireMessage = true;
    }
  }

  /*   inputTitleHandler(currentTitle: any) {
    this.roomsService.titlePreComponent = currentTitle.target.value;
  } */

  /*   onDelteRoom() {
    this.roomsService.deleteRoom(this.index);
  } */

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

  /* onEditRoom() {
    this.roomsService.editRoom(this.index);
  }

  onOpenClose() {
    this.roomsService.openCloseRoom(this.index);
  } */

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    /* this.title = this.room.title;
    this.number = this.room.number;
    this.roomsService.editOtherRoom.subscribe((preEditRoomIndex: number) => {
      if (preEditRoomIndex === this.index) {
        this.roomsService.titlePreComponent = this.title;
        this.title ? this.onSaveRoom() : (this.isRequireMessage = true);
      }
    });*/
  }

  /* onClearRoom() {
    this.roomsService.clearRoom();
  } */
}
