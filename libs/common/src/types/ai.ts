/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "ai";

export interface EmbedDocumentDto {
  filename: string;
  content: Uint8Array;
}

export interface Embedding {
  values: number[];
  content: string;
}

export interface ChatDto {
  embedding: Embedding | undefined;
  question: string;
}

export interface Answer {
  answer: string;
}

export const AI_PACKAGE_NAME = "ai";

export interface EmbeddingServiceClient {
  embedDocument(request: EmbedDocumentDto): Observable<Embedding>;
}

export interface EmbeddingServiceController {
  embedDocument(request: EmbedDocumentDto): Promise<Embedding> | Observable<Embedding> | Embedding;
}

export function EmbeddingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["embedDocument"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("EmbeddingService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("EmbeddingService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EMBEDDING_SERVICE_NAME = "EmbeddingService";

export interface ChatServiceClient {
  chat(request: Observable<ChatDto>): Observable<Answer>;
}

export interface ChatServiceController {
  chat(request: Observable<ChatDto>): Observable<Answer>;
}

export function ChatServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ChatService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["chat"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ChatService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CHAT_SERVICE_NAME = "ChatService";
