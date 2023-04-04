import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { GsTableComponent } from './gs-table.component';

describe('GsTableComponent', () => {
  let component: GsTableComponent;
  let fixture: ComponentFixture<GsTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
