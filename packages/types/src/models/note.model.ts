import { Default, Format, PropertyType, Required } from '@tsed/common';
import { Model, ObjectID, Ref } from '@tsed/mongoose';
import { Description } from '@tsed/swagger';
import { ObjectId } from 'mongodb';

import { Label } from './label.model';

@Model()
export class Note {
  @Description('ObjectID of the note in the MongoDB')
  @ObjectID()
  _id?: ObjectId;

  @Description('Note title')
  @Required()
  title!: string;

  @Description('Note description')
  @Required()
  description!: string;

  @Description('Label assigned to the note (can be undefined)')
  @Required()
  @Ref(Label)
  label!: Label | ObjectId;

  @Description('Note tags')
  @Required()
  @PropertyType(String)
  @Default([])
  tags: string[] = [];

  @Description('Date when the note was last updated')
  @Required()
  @Format('date-time')
  @Default(Date.now)
  createdAt: Date = new Date();

  @Description('Date when the note was last updated')
  @Required()
  @Format('date-time')
  @Default(Date.now)
  updatedAt: Date = new Date();
}
