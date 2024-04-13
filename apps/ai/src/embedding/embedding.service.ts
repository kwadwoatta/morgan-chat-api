import { EmbeddedDocuments, Embedding } from '@app/common';
import { TaskType } from '@google/generative-ai';
import { Document } from '@langchain/core/documents';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { EmbedDocumentDto } from './dto/embed-document.dto';

@Injectable()
export class EmbeddingService {
  private async splitDocument(
    content: Uint8Array,
  ): Promise<Document<Record<string, any>>[]> {
    const textSplitter = new RecursiveCharacterTextSplitter({
      separators: ['.', '\n'],
      chunkSize: 500,
      chunkOverlap: 0,
    });

    const blob = new Blob([content], { type: 'application/pdf' });
    const loader = new PDFLoader(blob);
    const docs = await loader.load();
    const splits = await textSplitter.splitDocuments(docs);
    return splits;
  }

  async embedDocument(dto: EmbedDocumentDto): Promise<EmbeddedDocuments> {
    const { contentAsUint8Array, filename } = dto;
    const splits = await this.splitDocument(contentAsUint8Array);

    const googleAiEmbeddings = new GoogleGenerativeAIEmbeddings({
      modelName: 'embedding-001', // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: filename,
    });

    const embeddings = await googleAiEmbeddings.embedDocuments(
      splits.map((split) => split.pageContent),
    );

    const embeddedDocuments: Embedding[] = embeddings.map(
      (embedding, index) => ({
        embedding,
        pageContent: splits[index].pageContent,
        metadata: splits[index].metadata,
      }),
    );

    return {
      embeddedDocuments,
    };
  }
}
