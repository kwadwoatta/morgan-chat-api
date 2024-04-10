import {
  ChatDto,
  ChatServiceController,
  ChatServiceControllerMethods,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';

@Controller()
@ChatServiceControllerMethods()
export class ChatController implements ChatServiceController {
  constructor(private readonly chatService: ChatService) {}

  chat(chatDtoStream: Observable<ChatDto>) {
    return this.chatService.chat(chatDtoStream);
  }
}
