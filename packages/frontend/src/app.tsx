import { createMuiTheme, CssBaseline, MuiThemeProvider, ThemeOptions } from '@material-ui/core';
import { getBaseConfiguration } from '@zettelwirtschaft/configuration';
import * as React from 'react';
import { useState } from 'react';
import { hot } from 'react-hot-loader';
import { RestfulProvider } from 'restful-react';

import { ErrorBoundaryComponent } from './components/errorBoundary.component';
import { LabelGroupComponent } from './components/labelGroup.component';
import { TitleBarComponent } from './components/titleBar.component';
import { darkTheme, lightTheme } from './theme';

const useDarkMode = (): [ThemeOptions, () => void] => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = (): void => {
    setTheme(theme.palette!.type === 'light' ? darkTheme : lightTheme);
  };
  return [theme, toggleTheme];
};

const AppComponent = (): React.ReactElement => {
  const baseConfiguration = getBaseConfiguration();
  const [theme, toggleDarkMode] = useDarkMode();

  console.log(createMuiTheme(theme));
  console.log('.AppComponent(): ' + baseConfiguration.server.port);

  return (
    <RestfulProvider base={`http://localhost:${baseConfiguration.server.port}/rest`}>
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        <ErrorBoundaryComponent>
          <TitleBarComponent themeColor={theme.palette!.type!} toggleThemeColor={toggleDarkMode} />
          <LabelGroupComponent />
        </ErrorBoundaryComponent>
      </MuiThemeProvider>
    </RestfulProvider>
  );
};

export const App = hot(module)(AppComponent);
