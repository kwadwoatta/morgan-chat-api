import { ValidateUUIDPipe } from '@app/common/pipe';
import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { ValidateNotebookPipe } from '../pipe/validate-notebook.pipe';

const GetNotebookId = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  if (!req.params.notebookId) {
    throw new NotFoundException(
      'cannot get document(s) without specifying notebook_id',
    );
  }

  return req.params.notebookId;
});

export const GetNotebook = () =>
  GetNotebookId(ValidateUUIDPipe, ValidateNotebookPipe);
