import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { notebooks } from '../../drizzle/schema';

@Injectable()
export class ValidateNotebookPipe implements PipeTransform {
  constructor(readonly drizzle: DrizzleService) {}

  async transform(notebookId: string) {
    const nbs = (
      await this.drizzle.db
        .select()
        .from(notebooks)
        .where(eq(notebooks.id, notebookId))
    )[0];

    if (!nbs) {
      throw new NotFoundException('no notebook for given notebook_id');
    }

    return nbs;
  }
}
