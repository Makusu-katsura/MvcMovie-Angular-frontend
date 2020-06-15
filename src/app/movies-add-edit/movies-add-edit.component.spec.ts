import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesAddEditComponent } from './movies-add-edit.component';

describe('MoviesAddEditComponent', () => {
  let component: MoviesAddEditComponent;
  let fixture: ComponentFixture<MoviesAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
