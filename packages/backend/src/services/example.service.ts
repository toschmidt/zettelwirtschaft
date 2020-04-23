import { Service } from '@tsed/di';
import { ExampleModel } from '@yame/types';

@Service()
export class ExampleService {
  getExamples(): ExampleModel[] {
    return [{ message: 'Hello World!' }, { message: 'Yet Another Monorepo Example' }];
  }
}
