import { Default, Format, PropertyType, Required } from '@tsed/common';
import { Model, ObjectID, Ref } from '@tsed/mongoose';
import { Description } from '@tsed/swagger';

import { Label } from './label.model';

@Model()
export class Note {
  @Description('ObjectID of the note in the MongoDB')
  @ObjectID()
  _id?: string;

  @Description('Note title')
  @Required()
  title!: string;

  @Description('Note description')
  @Required()
  description!: string;

  @Description('Label assigned to the note (can be undefined)')
  @Required()
  @Ref(Label)
  label!: Ref<Label>;

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
