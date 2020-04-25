import { Required } from '@tsed/common';
import { Indexed, Model, ObjectID, Unique } from '@tsed/mongoose';
import { Description } from '@tsed/swagger';

@Model()
export class Label {
  @Description('ObjectID of the note in the MongoDB')
  @ObjectID()
  _id?: string;

  @Description('Label name')
  @Required()
  @Indexed()
  @Unique()
  name!: string;

  @Description('Label description')
  description?: string;
}
