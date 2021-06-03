import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms/rooms.service';

import { FurnitureService, Movies } from './furniture.service';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss'],
})
export class FurnitureComponent implements OnInit {
  activeNavItemIndex: number = 0;
  genreId = 28;
  moviesList: Movies = {
    page: 0,
    results: [],
    total_result: 0,
    total_pages: 0,
  };
  navItems = this.furnitureService.navItems;

  constructor(private furnitureService: FurnitureService, private roomService: RoomsService) {}

  getFurnitureList(genreId: number = this.genreId): void {
    this.furnitureService.getMoviesList(genreId).subscribe((movies: Movies) => (this.moviesList = movies));
  }

  ngOnInit(): void {
    this.getFurnitureList();
  }

  changeNavItem(idx: number) {
    this.navItems[this.activeNavItemIndex].isActive = false;
    this.activeNavItemIndex = idx;
    this.navItems[idx].isActive = true;
    this.genreId = this.navItems[idx].genreId;
    this.getFurnitureList();
  }

  addToRoom(furnitureItem: any) {
    this.roomService.sendFurnitureToRoom.emit(furnitureItem);
  }
}
