import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Note } from '@zettelwirtschaft/types';
import { ObjectId } from 'mongodb';

@Service()
export class NoteService {
  constructor(@Inject(Note) private noteModel: MongooseModel<Note>) {}

  findByLabelId(labelId?: ObjectId): Promise<Note[]> {
    return this.noteModel.find({ label: labelId }).exec();
  }

  createNote(note: Note): Promise<Note> {
    note._id = undefined;
    note.createdAt = new Date();
    note.updatedAt = new Date();
    return new this.noteModel(note).save();
  }

  async updateNote(noteId: ObjectId, note: Note): Promise<Note> {
    const oldNote = await this.noteModel.findById(noteId).exec();

    oldNote!.title = note.title;
    oldNote!.description = note.description;
    oldNote!.label = note.label;
    oldNote!.tags = note.tags;
    oldNote!.updatedAt = new Date();

    return oldNote!.save();
  }

  async deleteNote(noteId: ObjectId): Promise<void> {
    await this.noteModel.findByIdAndDelete(noteId).exec();
  }

  async listTags(): Promise<string[]> {
    const notes: Note[] = await this.noteModel.find().exec();
    return notes.reduce((tags: string[], note: Note) => {
      return tags.concat(note.tags.filter((tag) => !tags.includes(tag)));
    }, []);
  }
}
