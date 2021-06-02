import { Component, Input, OnInit, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';

import { RoomsService, Room } from '../rooms.service';
import { RoomEdit } from '../rooms.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @Input() room: Room = { roomNumber: null, roomTitle: '', isEdit: false, isOpen: false, furnitureList: [] };
  @Input() index: number = 0;

  @Output() roomAction = new EventEmitter<RoomEdit>();
  @Output() toStopEventsBeforeSave = new EventEmitter<boolean>();

  editRoomData: { roomTitle: string; roomNumber?: number | null | undefined } = {
    roomTitle: '',
    roomNumber: null,
  };
  canCloseEdit: boolean = true;

  constructor(private roomsService: RoomsService) {}

  /*   inputTitleHandler(currentTitle: any) {
    this.roomsService.titlePreComponent = currentTitle.target.value;
  } */

  /*   onDelteRoom() {
    this.roomsService.deleteRoom(this.index);
  } */

  onRoomAction(action: string) {
    /*   if (!this.editRoomData.roomTitle) {
      this.toStopEventsBeforeSave.emit(true);
      return;
    } */
    this.canCloseEdit = this.roomsService.isCanCloseEdit;
    if (!this.editRoomData.roomTitle) {
      this.canCloseEdit = false;
      this.roomsService.isCanCloseEdit = false;
    }
    console.log(this.canCloseEdit);
    this.toStopEventsBeforeSave.emit(false);
    this.roomAction.emit({
      idRoom: this.index,
      action: action,
      roomTitle: this.editRoomData.roomTitle,
      roomNumber: this.editRoomData.roomNumber,
    });
  }

  /* onEditRoom() {
    this.roomsService.editRoom(this.index);
  }

  onOpenClose() {
    this.roomsService.openCloseRoom(this.index);
  } */

  ngOnInit(): void {
    this.editRoomData.roomTitle = this.room.roomTitle;
    this.editRoomData.roomNumber = this.room.roomNumber;
    this.canCloseEdit = this.roomsService.isCanCloseEdit;

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
