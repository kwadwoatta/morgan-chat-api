import { EmbedDocumentDto, Embedding } from '@app/common';
import { Document } from '@langchain/core/documents';
import { Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

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

    const docBlob = new Blob([content]); // Convert docBuffer to a Blob
    const loader = new PDFLoader(docBlob);
    const docs = await loader.load();
    const splits = await textSplitter.splitDocuments(docs);
    return splits;
  }

  async embedDocument({
    filename,
    content,
  }: EmbedDocumentDto): Promise<Embedding> {
    // const splits = await this.splitDocument(content);
    // let pageContent: string;
    // const embeddingsArray: number[][] = [];

    // const embeddings = new GoogleGenerativeAIEmbeddings({
    //   apiKey: 'YOUR_API_KEY',
    //   modelName: 'embedding-001', // 768 dimensions
    //   taskType: TaskType.RETRIEVAL_DOCUMENT,
    //   title: filename,
    // });

    // for (const split of splits) {
    //   const embedding = await embeddings.embedQuery(split.pageContent);
    //   embeddingsArray.push(embedding);
    //   pageContent += split.pageContent;
    // }

    // const flattenedEmbeddings = embeddingsArray.flat().slice(0, 768); // Truncate the array to 768 dimensions
    // while (flattenedEmbeddings.length < 768) {
    //   flattenedEmbeddings.push(0); // Pad the array with zeros to reach 768 dimensions
    // }

    // return { values: flattenedEmbeddings, content: pageContent };
    console.log('in ai microservice');
    console.log({ filename });
    return { values: [], content: '' };
  }
}
