import { Service } from '@tsed/di';
import { ExampleModel } from '@zettelwirtschaft/types';

@Service()
export class ExampleService {
  getExamples(): ExampleModel[] {
    return [{ message: 'Hello World!' }, { message: 'Yet Another Monorepo Example' }];
  }
}
