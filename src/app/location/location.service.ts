import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface RatingsLevels {
  title: string;
  rating: number;
}

export interface RatingDataTable {
  ratings: RatingsLevels[];
  rewiew?: string;
  id?: number;
  images: any[];
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  ratingData: RatingDataTable = {
    ratings: [
      { title: 'Appreciate the punctuality of the movers', rating: 4.5 },
      { title: 'Were the employees polite?', rating: 3.5 },
      { title: 'Were your items handled carefully?', rating: 2.5 },
      { title: 'How would you rate the overall quality of the service?', rating: 2 },
      { title: 'Review the professionalism of the movers', rating: 2 },
      { title: 'How do you rate the staff and equipment of the movers?', rating: 1.5 },
    ],
    rewiew: '',
    images: [],
  };

  private data$$ = new BehaviorSubject<RatingDataTable>(this.ratingData);

  constructor(private http: HttpClient) {}

  public getRatingData$(): Observable<RatingDataTable> {
    return this.data$$.asObservable();
  }

  public saveRatingData$(ratingData: RatingDataTable): Observable<RatingDataTable> {
    return this.http.post<RatingDataTable>('https://jsonplaceholder.typicode.com/todos', ratingData).pipe(delay(500));
  }
}
