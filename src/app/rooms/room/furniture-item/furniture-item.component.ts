import { Component, Input, OnInit } from '@angular/core';

import { MovieForRoom } from 'src/app/furniture/furniture.service';
import { RoomsService } from '../../rooms.service';

@Component({
  selector: 'app-furniture-item',
  templateUrl: './furniture-item.component.html',
  styleUrls: ['./furniture-item.component.scss'],
})
export class FurnitureItemComponent implements OnInit {
  @Input('furnitureItem') movie: MovieForRoom = {
    poster_path: null,
    adult: false,
    overview: '',
    release_date: '',
    genre_ids: [],
    id: 0,
    original_title: '',
    original_language: '',
    title: '',
    backdrop_path: null,
    popularity: 0,
    vote_count: 0,
    video: false,
    vote_average: 0,
    count: 0,
  };

  @Input() index: number = 0;

  constructor(private roomService: RoomsService) {}

  ngOnInit(): void {}

  onIncrementCount() {
    this.roomService.addFurnitureItemToRoom$$.next(this.index);
  }

  onDecrementCount() {
    this.roomService.subFurnitureItemToRoom$$.next(this.index);
  }
}
