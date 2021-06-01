import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveDetalisComponent } from './move-detalis.component';

describe('MoveDetalisComponent', () => {
  let component: MoveDetalisComponent;
  let fixture: ComponentFixture<MoveDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveDetalisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
