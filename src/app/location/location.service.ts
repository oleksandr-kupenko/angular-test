import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface RatingData {
  title: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  ratingData: RatingData[] = [
    { title: 'Appreciate the punctuality of the movers', rating: 3 },
    { title: 'Were the employees polite?', rating: 3 },
    { title: 'Were your items handled carefully?', rating: 3 },
    { title: 'How would you rate the overall quality of the service?', rating: 3 },
    { title: 'Review the professionalism of the movers', rating: 3 },
    { title: 'How do you rate the staff and equipment of the movers?', rating: 3 },
  ];

  private data$$ = new BehaviorSubject<RatingData[]>(this.ratingData);

  constructor() {}

  public getRatingData$(): Observable<RatingData[]> {
    return this.data$$.asObservable();
  }
}
