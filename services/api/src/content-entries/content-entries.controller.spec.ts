import { Test, TestingModule } from '@nestjs/testing';
import { ContentEntriesController } from './content-entries.controller';
import { ContentEntriesService } from './content-entries.service';

describe('ContentEntriesController', () => {
  let controller: ContentEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentEntriesController],
      providers: [ContentEntriesService],
    }).compile();

    controller = module.get<ContentEntriesController>(ContentEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
