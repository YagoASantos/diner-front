import { TestBed } from '@angular/core/testing';

import { DrinkService } from './drink.service';

describe('DrinkServiceService', () => {
  let service: DrinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
