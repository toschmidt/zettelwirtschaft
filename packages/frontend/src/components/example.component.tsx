import { ExampleModel } from '@yame/types';
import * as React from 'react';

import { useGetExamples } from '../repositories/example.repository';

export interface ExampleProps {}

export const ExampleComponent = (): React.ReactElement => {
  const { data: examples, error } = useGetExamples();

  return (
    <>
      {!error &&
        examples &&
        examples.map((example: ExampleModel, index: number) => <p key={index}>{example.message}</p>)}
    </>
  );
};
