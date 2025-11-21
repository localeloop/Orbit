import { Module } from '@nestjs/common';
import { ContentEntriesService } from './content-entries.service';
import { ContentEntriesController } from './content-entries.controller';

@Module({
  controllers: [ContentEntriesController],
  providers: [ContentEntriesService],
})
export class ContentEntriesModule {}
