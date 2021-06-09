import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface RatingsLevels {
  title: string;
  rating: number;
}

export interface RatingDataTable {
  ratings: RatingsLevels[];
  rewiew?: string;
  id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  ratingData: RatingDataTable = {
    ratings: [
      { title: 'Appreciate the punctuality of the movers', rating: 4 },
      { title: 'Were the employees polite?', rating: 1 },
      { title: 'Were your items handled carefully?', rating: 2 },
      { title: 'How would you rate the overall quality of the service?', rating: 0 },
      { title: 'Review the professionalism of the movers', rating: 2 },
      { title: 'How do you rate the staff and equipment of the movers?', rating: 3 },
    ],
    rewiew: 'I like it',
  };

  private data$$ = new BehaviorSubject<RatingDataTable>(this.ratingData);

  constructor(private http: HttpClient) {}

  public getRatingData$(): Observable<RatingDataTable> {
    return this.data$$.asObservable();
  }

  public saveRatingData$(ratingData: RatingDataTable): Observable<RatingDataTable> {
    return this.http.post<RatingDataTable>('https://jsonplaceholder.typicode.com/todos', ratingData);
  }
}
