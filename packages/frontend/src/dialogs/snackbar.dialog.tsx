import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

export interface SnackbarDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const SnackbarDialog = (
  props: SnackbarDialogProps & { type: 'error' | 'warning' | 'info' | 'success' },
): React.ReactElement => {
  const { open, onClose, type, message } = props;

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export const ErrorDialog = (props: SnackbarDialogProps): React.ReactElement =>
  SnackbarDialog({ ...props, type: 'error' });

export const WarningDialog = (props: SnackbarDialogProps): React.ReactElement =>
  SnackbarDialog({ ...props, type: 'warning' });

export const InfoDialog = (props: SnackbarDialogProps): React.ReactElement =>
  SnackbarDialog({ ...props, type: 'info' });

export const SuccessDialog = (props: SnackbarDialogProps): React.ReactElement =>
  SnackbarDialog({ ...props, type: 'success' });
