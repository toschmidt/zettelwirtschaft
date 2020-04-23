import { Controller, Get } from '@tsed/common';
import { ReturnsArray } from '@tsed/swagger';
import { ExampleModel } from '@zettelwirtschaft/types';

import { ExampleService } from '../services/example.service';

@Controller('/examples')
export class ExampleController {
  constructor(private exampleService: ExampleService) {}

  @Get('/')
  @ReturnsArray(ExampleModel)
  get(): ExampleModel[] {
    return this.exampleService.getExamples();
  }
}
