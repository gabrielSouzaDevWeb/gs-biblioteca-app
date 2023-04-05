import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsFabComponent } from './gs-fab.component';

describe('GsFabComponent', () => {
  let component: GsFabComponent;
  let fixture: ComponentFixture<GsFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsFabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GsFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
