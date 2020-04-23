import { getBaseConfiguration } from '@zettelwirtschaft/configuration';
import * as React from 'react';
import { ReactElement } from 'react';
import { RestfulProvider } from 'restful-react';

import { ErrorBoundaryComponent } from './components/errorBoundary.component';
import { ExampleComponent } from './components/example.component';

const AppComponent = (): ReactElement => {
  const baseConfiguration = getBaseConfiguration();

  return (
    <RestfulProvider base={`http://localhost:${baseConfiguration.server.port}/rest`}>
      <ErrorBoundaryComponent>
        <ExampleComponent />
      </ErrorBoundaryComponent>
    </RestfulProvider>
  );
};

export const App = AppComponent;
