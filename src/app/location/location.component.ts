import { Component, OnInit } from '@angular/core';
import { LocationService, RatingDataTable } from './location.service';

import { convertToBase64, convertToImage } from '../../utils/utils';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [LocationService],
})
export class LocationComponent implements OnInit {
  stars: number[] = [5, 4, 3, 2, 1];

  ratingData: RatingDataTable = { ratings: [{ title: '', rating: 0 }], rewiew: '', images: [] };
  uploadImages: any[] = [];
  removeThumbinalMode = false;
  isLoading = false;
  message: string = '';

  constructor(private localService: LocationService) {}
  ngOnInit() {
    this.localService.getRatingData$().subscribe((data) => {
      for (let i = 0; i < data.ratings.length; i++) {
        this.ratingData = data;
        if (this.ratingData.images) {
          this.ratingData.images.map((imageBase64) => {
            this.uploadImages.push(imageBase64);
            console.log('arr', this.uploadImages);
          });
        }
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
      this.ratingData = newRatingData;
      console.log(this.ratingData);
      this.isLoading = false;
    });
  }

  roundingRating(rating: number) {
    return Math.round(rating * 2) / 2;
  }

  showStar(rating: number, index: number) {
    rating = this.roundingRating(rating);
    const data = rating - index;
    if (data === 0.5) {
      return 'half-star';
    }
    return data > 0 ? 'full-star' : 'empty-star';
  }

  onClose() {
    alert('Close function');
  }

  onRemoveImg(index: number) {
    this.uploadImages = this.uploadImages.filter((img, idx) => {
      return index != idx;
    });
    this.ratingData.images = this.ratingData.images.filter((img, idx) => {
      return index != idx;
    });
  }

  checkIsImg(file: any): boolean {
    if (file.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return false;
    }
    return true;
  }

  async addImgToRatingData(img: File) {
    const imgBase64: string = await convertToBase64(img);
    this.ratingData.images?.push(imgBase64);
  }

  async onAddFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file: File = input.files[0];
    /*    if (!this.checkIsImg(file)) {
      return;
    } */
    this.addImgToRatingData(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadImages = [...this.uploadImages, reader.result];
      console.log(this.uploadImages);
    };
  }

  ratingDesc(ratingLevel: number) {
    switch (ratingLevel) {
      case 5:
        return 'Perfect!';
        break;
      case 4.5:
        return 'Very good!';
        break;
      case 4:
        return 'Good!';
        break;
      case 3.5:
        return 'Just ok';
        break;
      case 3:
        return 'Normal';
        break;
      case 2.5:
        return 'Not bad';
        break;
      case 2:
        return 'Bad';
        break;
      case 1.5:
        return 'Very bad';
        break;
      case 1:
        return 'Awful...';
        break;
      default:
        return '';
    }
  }
}
