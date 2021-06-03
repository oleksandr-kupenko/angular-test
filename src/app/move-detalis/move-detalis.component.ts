import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-move-detalis',
  templateUrl: './move-detalis.component.html',
  styleUrls: ['./move-detalis.component.scss'],
})
export class MoveDetalisComponent implements OnInit {
  nav1ElementActived = false;
  nav2ElementActived = false;

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.userActivated.subscribe((id: unknown | undefined) => {
      //number не проходит((
      if (id === 1) {
        this.nav1ElementActived = true;
      } else if (id === 2) {
        this.nav2ElementActived = true;
      }
    });
  }
}
