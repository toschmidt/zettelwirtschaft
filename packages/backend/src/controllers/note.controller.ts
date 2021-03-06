import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  Put,
  QueryParams,
  Required,
  Status,
} from '@tsed/common';
import { Returns, ReturnsArray } from '@tsed/swagger';
import { Note } from '@zettelwirtschaft/types';

import { NoteService } from '../services/note.service';

@Controller('/notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('/')
  @ReturnsArray(Note)
  get(@Required() @QueryParams('labelId') labelId: string): Promise<Note[]> {
    return this.noteService.findByLabelId(labelId);
  }

  @Put('/')
  @Returns(Note)
  @Status(201)
  create(@Required() @BodyParams() note: Note): Promise<Note> {
    return this.noteService.createNote(note);
  }

  @Post('/:noteId')
  @Returns(Note)
  @Status(200)
  update(@Required() @PathParams('noteId') noteId: string, @Required() @BodyParams() note: Note): Promise<Note> {
    return this.noteService.updateNote(noteId, note);
  }

  @Delete('/:noteId')
  @Status(204)
  delete(@Required() @PathParams('noteId') noteId: string): Promise<void> {
    return this.noteService.deleteNote(noteId);
  }
}
