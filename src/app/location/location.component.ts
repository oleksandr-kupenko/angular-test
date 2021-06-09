import { Component, OnInit } from '@angular/core';
import { LocationService, RatingDataTable } from './location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [LocationService],
})
export class LocationComponent implements OnInit {
  stars: number[] = [5, 4, 3, 2, 1];

  ratingData: RatingDataTable = { ratings: [{ title: '', rating: 0 }], rewiew: '' };
  rewiew?: string = '';
  isLoading = false;

  constructor(private localService: LocationService) {}
  ngOnInit() {
    this.localService.getRatingData$().subscribe((data) => {
      for (let i = 0; i < data.ratings.length; i++) {
        this.ratingData = data;
      }
    });
  }

  onChangeRating(blockIndex: number, newRating: number) {
    if (this.ratingData.ratings[blockIndex].rating === newRating) {
      this.ratingData.ratings[blockIndex].rating = 0;
      return;
    }
    this.ratingData.ratings[blockIndex].rating = newRating;
  }

  onSaveNewRating(rewiewText: HTMLTextAreaElement) {
    this.isLoading = true;
    if (rewiewText.value && rewiewText.value !== this.ratingData.rewiew) {
      this.ratingData.rewiew = rewiewText.value;
    }
    this.localService.saveRatingData$(this.ratingData).subscribe((newRatingData) => {
      console.log(newRatingData);
      this.ratingData = newRatingData;
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
}
