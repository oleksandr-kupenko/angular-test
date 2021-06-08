import { Component, OnInit } from '@angular/core';
import { LocationService, ObjRequest, RatingData } from './location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [LocationService],
})
export class LocationComponent implements OnInit {
  stars: number[] = [5, 4, 3, 2, 1];

  ratingData: RatingData[] = [{ title: '', rating: 0 }];
  isLoading = false;

  constructor(private localService: LocationService) {}
  ngOnInit() {
    this.localService.getRatingData$().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.ratingData = data;
      }
    });
  }

  onChangeRating(blockIndex: number, newRating: number) {
    this.ratingData[blockIndex].rating = newRating;
  }

  onSaveNewRating() {
    if (!this.ratingData) {
      return;
    }
    this.isLoading = true;
    this.localService.saveRatingData$(this.ratingData).subscribe((newRatingData) => {
      //console.log(Object.entries(newRatingData)); //  Try changing the `lib` compiler option to 'es2017' or later.
      this.ratingData = this.objectResponseToArray(newRatingData);
    });
    this.isLoading = false;
  }

  ratingDesc(ratingLevel: number) {
    switch (ratingLevel) {
      case 5:
        return 'Perfect!';
        break;
      case 4:
        return 'Good!';
        break;
      case 3:
        return 'Normal!';
        break;
      case 2:
        return 'Bad!';
        break;
      case 1:
        return 'Awful!';
        break;
      default:
        return '';
    }
  }

  private objectResponseToArray(obj: ObjRequest) {
    let arr = [];
    for (let key in obj) {
      if (!isNaN(+key)) {
        arr.push(obj[key]);
      }
    }
    return arr;
  }
}
