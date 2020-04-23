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
import { ObjectId } from 'mongodb';
import { NoteService } from '../services/note.service';

@Controller('/notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('/')
  @ReturnsArray(Note)
  get(@Required() @QueryParams('labelId') labelId: string): Promise<Note[]> {
    return this.noteService.findByLabelId(new ObjectId(labelId));
  }

  @Put('/')
  @Status(201)
  @Returns(Note)
  create(@Required() @BodyParams() note: Note): Promise<Note> {
    return this.noteService.createNote(note);
  }

  @Post('/:noteId')
  @Returns(Note)
  update(@Required() @PathParams('noteId') noteId: string, @Required() @BodyParams() note: Note): Promise<Note> {
    return this.noteService.updateNote(new ObjectId(noteId), note);
  }

  @Delete('/:noteId')
  @Status(204)
  delete(@Required() @PathParams('noteId') noteId: string): Promise<void> {
    return this.noteService.deleteNote(new ObjectId(noteId));
  }
}
