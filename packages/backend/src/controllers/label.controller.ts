import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Required, Status } from '@tsed/common';
import { Returns, ReturnsArray } from '@tsed/swagger';
import { Label } from '@zettelwirtschaft/types';
import { ObjectId } from 'mongodb';
import { LabelService } from '../services/label.service';
import { NoteService } from '../services/note.service';

@Controller('/labels')
export class LabelController {
  constructor(private labelService: LabelService, private noteService: NoteService) {}

  @Get('/')
  @ReturnsArray(Label)
  get(): Promise<Label[]> {
    return this.labelService.find();
  }

  @Get('/:labelId')
  @Returns(Label)
  getLabel(@Required() @PathParams('labelId') labelId: string): Promise<Label> {
    return this.labelService.findById(new ObjectId(labelId));
  }

  @Put('/')
  @Status(201)
  @Returns(Label)
  create(@Required() @BodyParams() label: Label): Promise<Label> {
    return this.labelService.createLabel(label);
  }

  @Post('/:labelId')
  @Returns(Label)
  update(@Required() @PathParams('labelId') labelId: string, @Required @BodyParams() label: Label): Promise<Label> {
    return this.labelService.updateLabel(new ObjectId(labelId), label);
  }

  @Delete('/:labelId')
  @Status(204)
  async delete(@Required @PathParams('labelId') labelId: string): Promise<void> {
    for (let note of await this.noteService.findByLabelId(new ObjectId(labelId))) {
      await this.noteService.deleteNote(note._id!);
    }
    await this.labelService.deleteLabel(new ObjectId(labelId));
  }
}
