import { TestBed } from '@angular/core/testing';

import { CollectionMoviesService } from './collection-movies.service';

describe('CollectionMoviesService', () => {
  let service: CollectionMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
