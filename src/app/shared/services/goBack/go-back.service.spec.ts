import { TestBed } from '@angular/core/testing';

import { GoBackService } from './go-back.service';

describe('GoBackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoBackService = TestBed.get(GoBackService);
    expect(service).toBeTruthy();
  });
});
