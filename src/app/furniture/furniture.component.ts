import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Movies {
  page: number;
  results: any[];
  total_result: number;
  total_pages: number;
}

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss'],
})
export class FurnitureComponent implements OnInit {
  constructor(private http: HttpClient) {}

  activeNavItemIndex: number = 0;
  genreId = 28;
  moviesList: Movies = {
    page: 0,
    results: [],
    total_result: 0,
    total_pages: 0,
  };

  getMoviesList(): void {
    this.http
      .get<Movies>(
        `https://api.themoviedb.org/3/discover/movie?api_key=2457bcf1079900ec3973765a5a018402&with_genres=${this.genreId}&page=1`
      )
      .subscribe((response) => {
        this.moviesList = response;
        console.log(this.moviesList.results);
      });
  }

  ngOnInit(): void {
    this.getMoviesList();
  }

  navItems = [
    { title: 'Action', icon: 'weekend', genreId: 28, isActive: true },
    { title: 'Adventure', icon: 'bed', genreId: 12, isActive: false },
    { title: 'Comedy', icon: 'table', genreId: 35, isActive: false },
    { title: 'Drama', icon: 'event_seat', genreId: 18, isActive: false },
    { title: 'Family', icon: 'single_bed', genreId: 10751, isActive: false },
    { title: 'Fantasy', icon: 'weekend', genreId: 14, isActive: false },
    { title: 'History', icon: 'bed', genreId: 36, isActive: false },
    { title: 'Music', icon: 'table', genreId: 10402, isActive: false },
    { title: 'Western', icon: 'chair_alt', genreId: 10752, isActive: false },
  ];

  changeNavItem(idx: number) {
    this.navItems[this.activeNavItemIndex].isActive = false;
    this.activeNavItemIndex = idx;
    this.navItems[idx].isActive = true;
    this.genreId = this.navItems[idx].genreId;
    this.getMoviesList();
  }
}
