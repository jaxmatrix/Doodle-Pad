import { TestBed } from '@angular/core/testing';

import { DocConfigService } from './doc-config.service';

describe('DocConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocConfigService = TestBed.get(DocConfigService);
    expect(service).toBeTruthy();
  });
});
