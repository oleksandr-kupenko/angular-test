import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieForRoom } from '../furniture/furniture.service';

import { RoomsService, RoomTable, RoomStateTable } from './rooms.service';

export interface RoomEdit {
  action: string;
  idRoom: number;
  roomTitle: string;
  roomNumber?: number | null | undefined;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  rooms: RoomStateTable[] = [];

  openId: number | null = null;
  isStopedEventsBeforeSave: boolean = false;
  isEditModeNow: number | null = null;
  subscribeGetRoom?: Subscription;
  subscribeSendFurnitureToRoom?: Subscription;
  subscribeCountAddFurniture?: Subscription;
  subscribeCountsubFurniture?: Subscription;

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.getRooms();
    this.toSubscribeFurnitureCounter();
  }

  ngOnDestroy(): void {
    this.subscribeGetRoom?.unsubscribe();
    this.subscribeSendFurnitureToRoom?.unsubscribe();
    this.subscribeCountAddFurniture?.unsubscribe();
    this.subscribeCountsubFurniture?.unsubscribe();
    this.roomsService.updateData();
  }

  private getRooms() {
    this.subscribeGetRoom = this.roomsService.getRooms$().subscribe((rooms) => {
      rooms.map((room) => {
        if (!room.isOpen && !room.isEdit) {
          room.isOpen = false;
          room.isEdit = false;
        }
      });
      this.rooms = rooms;
    });
  }

  private toSubscribeFurnitureCounter() {
    this.subscribeSendFurnitureToRoom = this.roomsService.sendFurnitureToRoom$$.subscribe((movie) => {
      this.addFurnitureItemToRoom$$(movie);
    });
    this.subscribeCountAddFurniture = this.roomsService.addFurnitureItemToRoom$$.subscribe((idxFurnitur) =>
      this.addAmountFurnitureItem(idxFurnitur)
    );
    this.subscribeCountsubFurniture = this.roomsService.subFurnitureItemToRoom$$.subscribe((idxFurnitur) =>
      this.subAmountFurnitureItem(idxFurnitur)
    );
  }

  checkIsDublicateEditMode(): boolean {
    const result = document.getElementById('edit-mode') ? true : false;
    return result;
  }

  deleteRoom(roomData: RoomEdit) {
    this.rooms = this.rooms.filter((room, index) => {
      return index != roomData.idRoom;
    });
    this.roomsService.deleteRoom$(roomData.idRoom);
  }

  editRoom(roomData: RoomEdit) {
    if (!this.roomsService.isCanCloseEdit || this.checkIsDublicateEditMode()) {
      return;
    }
    let editRooms: RoomStateTable[] = [...this.rooms];
    editRooms[roomData.idRoom].isEdit = true;
    this.rooms = editRooms;
    this.isEditModeNow = roomData.idRoom;
  }

  saveRoom(roomData: RoomEdit) {
    if (roomData.roomTitle) {
      if (roomData.roomTitle !== this.rooms[roomData.idRoom].roomTitle) {
        this.roomsService
          .saveRoom$(
            { roomNumber: roomData.roomNumber, roomTitle: roomData.roomTitle, furnitureList: this.rooms[roomData.idRoom].furnitureList },
            roomData.idRoom
          )
          .subscribe((updatedRoom) => {
            this.rooms[roomData.idRoom].roomTitle = updatedRoom.roomTitle;
            this.rooms[roomData.idRoom].roomNumber = updatedRoom.roomNumber;
          });
      }
      this.rooms[roomData.idRoom].isEdit = false;
      this.roomsService.isCanCloseEdit = true;
      this.isEditModeNow = null;
    }
  }

  openCloseRoom(roomData: RoomEdit) {
    if (this.roomsService.openIdxRoom !== null && this.roomsService.openIdxRoom !== roomData.idRoom) {
      this.rooms[this.roomsService.openIdxRoom].isOpen = false;
    }
    this.rooms[roomData.idRoom].isOpen = !this.rooms[roomData.idRoom].isOpen;
    if (this.rooms[roomData.idRoom].isOpen) {
      this.roomsService.openIdxRoom = roomData.idRoom;
    } else {
      this.roomsService.openIdxRoom = null;
    }
  }

  clearRoom(roomData: RoomEdit) {
    if (this.roomsService.openIdxRoom !== null && this.rooms[this.roomsService.openIdxRoom].furnitureList.length > 0) {
      this.roomsService
        .saveRoom$({ roomNumber: null, roomTitle: roomData.roomTitle, isOpen: true, furnitureList: [] }, roomData.idRoom) //почему комната обновляется с сервера, а при обычном save не обновляется?
        .subscribe((cleanedRoom) => {
          this.rooms[roomData.idRoom].furnitureList = cleanedRoom.furnitureList;
          this.roomsService.changeAmountFurnitureInRoom$$.next(roomData.idRoom);
        });
    }
  }

  addRoom(): void {
    const preAmountRooms: number = this.rooms.length;
    if (this.isEditModeNow != null) {
      this.roomsService.trySaveEditModeRoom.next(this.isEditModeNow);
    }
    if (!this.checkIsDublicateEditMode()) {
      let newRoom: RoomStateTable = { roomNumber: null, roomTitle: '', isEdit: true, isOpen: false, furnitureList: [] };
      this.rooms = [...this.rooms, newRoom];
    }
    const postAmountRooms: number = this.rooms.length;
    this.checkIfNeedRequireWarning(preAmountRooms, postAmountRooms);
  }

  addFurnitureItemToRoom$$(movie: MovieForRoom): void {
    if (this.roomsService.openIdxRoom != null) {
      const checkExist = this.rooms[this.roomsService.openIdxRoom].furnitureList.some((movieItem) => {
        return movieItem.id === movie.id;
      });
      if (!checkExist) {
        movie.count = 1;
        this.rooms[this.roomsService.openIdxRoom].furnitureList.push(movie);
      } else {
        const currentIndex = this.rooms[this.roomsService.openIdxRoom].furnitureList
          .map((movieItem) => {
            return movieItem.id;
          })
          .indexOf(movie.id);
        this.rooms[this.roomsService.openIdxRoom].furnitureList[currentIndex].count++;
      }
      this.roomsService.changeAmountFurnitureInRoom$$.next(this.roomsService.openIdxRoom);
    }
  }

  addAmountFurnitureItem(idxFurnitur: number): void {
    if (this.roomsService.openIdxRoom !== null) {
      this.rooms[this.roomsService.openIdxRoom].furnitureList[idxFurnitur].count++;
      this.roomsService.changeAmountFurnitureInRoom$$.next(this.roomsService.openIdxRoom);
    }
  }

  subAmountFurnitureItem(idxFurnitur: number): void {
    if (this.roomsService.openIdxRoom !== null) {
      const currentFurnitureList = this.rooms[this.roomsService.openIdxRoom].furnitureList;
      if (currentFurnitureList[idxFurnitur].count > 1) {
        this.rooms[this.roomsService.openIdxRoom].furnitureList[idxFurnitur].count--;
        this.roomsService.changeAmountFurnitureInRoom$$.next(this.roomsService.openIdxRoom);
      } else {
        this.rooms[this.roomsService.openIdxRoom].furnitureList = currentFurnitureList.filter((item, index) => index != idxFurnitur);
      }
    }
  }

  checkIfNeedRequireWarning(preCountRooms: number, postCountRooms: number): void {
    preCountRooms === postCountRooms ? (this.roomsService.isCanCloseEdit = false) : (this.roomsService.isCanCloseEdit = true);
  }

  onRoomAction(roomData: RoomEdit): void {
    const title = roomData.roomTitle;
    switch (roomData.action) {
      case 'delete':
        this.deleteRoom(roomData);
        break;
      case 'edit':
        this.editRoom(roomData);
        break;
      case 'save':
        this.saveRoom(roomData);
        break;
      case 'openClose':
        this.openCloseRoom(roomData);
        break;
      case 'clear':
        this.clearRoom(roomData);
        break;
    }
  }
}
