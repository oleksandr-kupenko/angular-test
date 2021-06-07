import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from 'src/shared/data-storage.service';
import { FurnitureService } from '../furniture/furniture.service';
import { TestService } from '../test.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private furnitureServices: FurnitureService,
    private testService: TestService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.furnitureServices.testGetIdFromComponent(this.id);
    });
  }

  activateObservable() {
    this.testService.userActivated.next(this.id);
  }

  saveRooms() {
    this.dataStorageService.storeRooms();
  }
}
