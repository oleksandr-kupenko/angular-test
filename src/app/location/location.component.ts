import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';

interface RatingData {
  title: string;
  currentRating: number;
  newRating: number;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [LocationService],
})
export class LocationComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];

  showNewRating: boolean = false;

  ratingData: RatingData[] = [
    { title: '', currentRating: 0, newRating: 0 },
    { title: '', currentRating: 0, newRating: 0 },
    { title: '', currentRating: 0, newRating: 0 },
    { title: '', currentRating: 0, newRating: 0 },
    { title: '', currentRating: 0, newRating: 0 },
    { title: '', currentRating: 0, newRating: 0 },
  ];

  constructor(private localService: LocationService) {}
  ngOnInit() {
    this.localService.getRatingData$().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.ratingData[i].title = data[i].title;
        this.ratingData[i].currentRating = data[i].rating;
        this.ratingData[i].newRating = data[i].rating;
      }
    });
    console.log(this.ratingData);
  }

  onChangeRating(blockIndex: number, newRating: number) {
    this.ratingData[blockIndex].currentRating = newRating;
  }

  onShowNewRating(blockIndex: number, newRating: number) {
    this.showNewRating = true;
    console.log(this.showNewRating);
    this.ratingData[blockIndex].newRating = newRating;
  }

  onShowCurrentRating() {
    this.showNewRating = false;
    this.ratingData.map((block) => {
      block.newRating = block.currentRating;
    });
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
