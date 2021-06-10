import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms/rooms.service';

import { FurnitureService, MoviesTable } from './furniture.service';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss'],
})
export class FurnitureComponent implements OnInit {
  activeNavItemIndex: number = 0;
  genreId = 28;
  moviesList: MoviesTable = {
    page: 0,
    results: [],
    total_result: 0,
    total_pages: 0,
  };
  navItems = this.furnitureService.navItems;
  isLoading: boolean = false;

  constructor(private furnitureService: FurnitureService, private roomService: RoomsService) {}

  getFurnitureList(genreId: number = this.genreId): void {
    this.isLoading = true;
    this.furnitureService.getMoviesList(genreId).subscribe((movies: MoviesTable): void => {
      this.moviesList = movies;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.getFurnitureList();
  }

  changeNavItem(idx: number): void {
    this.navItems[this.activeNavItemIndex].isActive = false;
    this.activeNavItemIndex = idx;
    this.navItems[idx].isActive = true;
    this.genreId = this.navItems[idx].genreId;
    this.getFurnitureList();
  }

  addToRoom(furnitureItem: any): void {
    this.roomService.sendFurnitureToRoom$$.next(furnitureItem);
  }
}
