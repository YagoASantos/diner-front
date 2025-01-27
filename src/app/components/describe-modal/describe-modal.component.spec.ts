import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescribeModalComponent } from './describe-modal.component';

describe('DescribeModalComponent', () => {
  let component: DescribeModalComponent;
  let fixture: ComponentFixture<DescribeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescribeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescribeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
