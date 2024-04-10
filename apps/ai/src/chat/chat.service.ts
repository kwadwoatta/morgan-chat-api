import { Answer, ChatDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class ChatService {
  chat(chatDto: Observable<ChatDto>): Observable<Answer> {
    return of({ answer: 'This action adds a new chat' });
  }
}
