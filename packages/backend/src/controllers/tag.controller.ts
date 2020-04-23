import { Controller, Get } from '@tsed/common';
import { ReturnsArray } from '@tsed/swagger';
import { NoteService } from '../services/note.service';

@Controller('/tags')
export class TagController {
  constructor(private noteService: NoteService) {}

  @Get('/')
  @ReturnsArray(String)
  get(): Promise<string[]> {
    return this.noteService.listTags();
  }
}
