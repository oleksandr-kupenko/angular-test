import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface RatingData {
  title: string;
  rating: number;
}

export interface ObjRequest {
  [key: number]: RatingData;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  ratingData: RatingData[] = [
    { title: 'Appreciate the punctuality of the movers', rating: 4 },
    { title: 'Were the employees polite?', rating: 1 },
    { title: 'Were your items handled carefully?', rating: 2 },
    { title: 'How would you rate the overall quality of the service?', rating: 0 },
    { title: 'Review the professionalism of the movers', rating: 2 },
    { title: 'How do you rate the staff and equipment of the movers?', rating: 3 },
  ];

  private data$$ = new BehaviorSubject<RatingData[]>(this.ratingData);

  constructor(private http: HttpClient) {}

  public getRatingData$(): Observable<RatingData[]> {
    return this.data$$.asObservable();
  }

  public saveRatingData$(ratingData: RatingData[]): Observable<ObjRequest> {
    return this.http.post<ObjRequest>('https://jsonplaceholder.typicode.com/todos', ratingData);
  }
}
