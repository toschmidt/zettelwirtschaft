import { Required } from '@tsed/common';
import { Description } from '@tsed/swagger';

export class ExampleModel {
  @Description('Message')
  @Required()
  message!: string;
}
