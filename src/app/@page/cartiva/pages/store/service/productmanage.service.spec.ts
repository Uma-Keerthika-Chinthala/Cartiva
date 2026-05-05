import { TestBed } from '@angular/core/testing';

import { ProductmanageService } from './productmanage.service';

describe('ProductmanageService', () => {
  let service: ProductmanageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductmanageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
