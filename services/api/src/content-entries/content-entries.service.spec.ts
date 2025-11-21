import { Test, TestingModule } from '@nestjs/testing';
import { ContentEntriesService } from './content-entries.service';

describe('ContentEntriesService', () => {
  let service: ContentEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentEntriesService],
    }).compile();

    service = module.get<ContentEntriesService>(ContentEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
