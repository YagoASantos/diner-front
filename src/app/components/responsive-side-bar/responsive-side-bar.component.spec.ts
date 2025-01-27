import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveSideBarComponent } from './responsive-side-bar.component';

describe('ResponsiveSideBarComponent', () => {
  let component: ResponsiveSideBarComponent;
  let fixture: ComponentFixture<ResponsiveSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsiveSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsiveSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
