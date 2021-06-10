import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Movie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface MovieForRoom extends Movie {
  count: number;
}

export interface MoviesTable {
  page: number;
  results: Movie[];
  total_result: number;
  total_pages: number;
}

export interface NavItems {
  title: string;
  icon: string;
  genreId: number;
  isActive: boolean;
}

@Injectable()
export class FurnitureService {
  navItems: NavItems[] = [
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

  test: string = 'test';

  constructor(private http: HttpClient) {}

  getMoviesList(genreId: number): Observable<MoviesTable> {
    return this.http
      .get<MoviesTable>(
        `https://api.themoviedb.org/3/discover/movie?api_key=2457bcf1079900ec3973765a5a018402&with_genres=${genreId}&page=1`
      )
      .pipe(delay(300));
  }

  testGetIdFromComponent(id: number) {
    return console.log('from service', id);
  }
}
