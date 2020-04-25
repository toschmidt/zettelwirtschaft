import {
  AppBar,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  PaletteType,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 16,
    },
    appBar: {
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create('width'),
    },
    noteIcon: {
      marginRight: theme.spacing(2),
    },
    brightnessIcon: {
      color: 'inherit',
    },
    title: {
      flexGrow: 1,
    },
    tab: {
      height: '64px',
    },
  });
});

export interface TitleBarProps {
  readonly themeColor: PaletteType;
  readonly toggleThemeColor: () => void;
}

export const TitleBarComponent = (props: TitleBarProps): React.ReactElement => {
  const classes = useStyles();
  const { themeColor, toggleThemeColor } = props;

  return (
    <>
      <div className={classes.root}>
        <AppBar className={classes.appBar} color="default" position={'fixed'}>
          <Toolbar>
            <Grid container justify={'flex-start'} alignItems={'center'}>
              <AssignmentIcon className={classes.noteIcon} />
              <Typography className={classes.title} variant={'h5'} noWrap>
                Zettelwirtschaft
              </Typography>
            </Grid>
            <Grid container justify={'flex-end'}>
              <IconButton onClick={toggleThemeColor} className={classes.brightnessIcon}>
                {themeColor === 'light' ? <Brightness4Icon /> : <BrightnessHighIcon />}
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    </>
  );
};
