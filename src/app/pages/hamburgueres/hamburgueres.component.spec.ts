import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgueresComponent } from './hamburgueres.component';

describe('HamburgueresComponent', () => {
  let component: HamburgueresComponent;
  let fixture: ComponentFixture<HamburgueresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgueresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburgueresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
