import {
  EmbeddingServiceController,
  EmbeddingServiceControllerMethods,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { EmbedDocumentDto } from './dto/embed-document.dto';
import { EmbeddingService } from './embedding.service';

@Controller()
@EmbeddingServiceControllerMethods()
export class EmbeddingController implements EmbeddingServiceController {
  constructor(private readonly embeddingService: EmbeddingService) {}

  embedDocument(embedDocumentDto: EmbedDocumentDto) {
    return this.embeddingService.embedDocument(embedDocumentDto);
  }
}
