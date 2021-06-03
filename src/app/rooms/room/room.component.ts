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
  countFurniture: number = 0;

  editRoomData: { roomTitle: string; roomNumber?: number | null | undefined } = {
    roomTitle: '',
    roomNumber: null,
  };
  hideRequireVarning: boolean = true;

  constructor(private roomsService: RoomsService) {}

  onRoomAction(action: string) {
    this.hideRequireVarning = this.roomsService.isCanCloseEdit;
    this.toStopEventsBeforeSave.emit(false);
    this.roomAction.emit({
      idRoom: this.index,
      action: action,
      roomTitle: this.editRoomData.roomTitle,
      roomNumber: this.editRoomData.roomNumber,
    });
  }

  countFurnitureInRoom() {
    console.log(this.room.furnitureList);
  }

  ngOnInit(): void {
    this.editRoomData.roomTitle = this.room.roomTitle;
    this.editRoomData.roomNumber = this.room.roomNumber;
    this.hideRequireVarning = this.roomsService.isCanCloseEdit;
    this.roomsService.trySaveEditModeRoom.subscribe((id: number) => {
      if (this.index === id) {
        this.onRoomAction('save');
      }
    });
    this.roomsService.changeAmountFurnitureInRoom.subscribe((id: number) => {
      if (id === this.index) {
        let amountFurniture: number = 0;
        this.room.furnitureList.forEach((furniture) => {
          amountFurniture = amountFurniture + furniture.count;
        });
        this.countFurniture = amountFurniture;
      }
    });
  }
}
