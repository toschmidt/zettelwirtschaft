import { createStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { ReactElement } from 'react';
import { UseMutateReturn } from 'restful-react';
import { ErrorDialog } from './snackbar.dialog';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    bottomBorder: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    success: {
      color: theme.palette.success.contrastText,
      backgroundColor: theme.palette.success.main,
    },
    delete: {
      color: theme.palette.error.contrastText,
      backgroundColor: theme.palette.error.main,
    },
    dialogActions: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
  });
});

export interface ConfirmationDialogProps {
  useMutation: () => UseMutateReturn<void, string, string>;
  onConfirm: () => void;
  onCancel: () => void;
  type: 'CONFIRM' | 'DELETE';
  title: string;
  children: ReactElement;
}

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const classes = useStyles();
  const { useMutation, onConfirm, onCancel, type, title, children } = props;

  const { mutate, error } = useMutation();

  const [closeError, setCloseError] = React.useState(false);

  const confirm = () => {
    setCloseError(false);
    mutate('').then(() => {
      onConfirm();
    });
  };

  return (
    <div>
      <Dialog open onClose={onCancel} maxWidth={'xs'} fullWidth>
        <DialogTitle className={classes.bottomBorder}>{title}</DialogTitle>
        <DialogContent className={classes.bottomBorder}>{children}</DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={onCancel} variant="outlined" color="secondary" startIcon={<CloseIcon />}>
            Cancel
          </Button>
          {type === 'CONFIRM' && (
            <Button onClick={confirm} variant="contained" color="primary" startIcon={<DeleteIcon />}>
              Confirm
            </Button>
          )}
          {type === 'DELETE' && (
            <Button onClick={confirm} variant="contained" className={classes.delete} startIcon={<DeleteIcon />}>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {error && <ErrorDialog open={!closeError} onClose={() => setCloseError(true)} message={error.data} />}
    </div>
  );
};
