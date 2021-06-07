import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TestService } from '../test.service';

@Component({
  selector: 'app-move-detalis',
  templateUrl: './move-detalis.component.html',
  styleUrls: ['./move-detalis.component.scss'],
})
export class MoveDetalisComponent implements OnInit {
  @ViewChild('testForm') someNewNameFrom: NgForm | null = null;
  nav1ElementActived = false;
  nav2ElementActived = false;

  emailDefault: string = 'fsffs@gmail.com';

  constructor(private testService: TestService) {}

  genders = ['male', 'female', 'others'];

  onSubmit() {
    this.someNewNameFrom?.form.patchValue({
      userMainData: {
        firstname: 'вфіаів',
        lastname: 'вфіаів',
        username: 'віф',
      },
    });
  }

  defaultQuestion: string = 'pet';
  answer: string = '';

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
