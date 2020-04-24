import { withStyles } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

export const CustomExpansionPanel = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    '&:before': {
        display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(MuiExpansionPanel);

export const CustomExpansionPanelSummary = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '0px 4px',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    margin: 0,
    '&$expanded': {
      margin: 0,
    },
  },
  expandIcon: {
    padding: 0,
    margin: 0,
  },
  expanded: {},
}))(MuiExpansionPanelSummary);

export const CustomExpansionPanelDetails = withStyles(theme => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 12,
    paddingRight: 12,
  },
}))(MuiExpansionPanelDetails);
