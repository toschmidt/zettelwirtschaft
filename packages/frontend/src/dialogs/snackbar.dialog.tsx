import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

export interface SnackbarDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export const ErrorDialog = (props: SnackbarDialogProps) => SnackbarDialog({ ...props, type: 'error' });
export const WarningDialog = (props: SnackbarDialogProps) => SnackbarDialog({ ...props, type: 'warning' });
export const InfoDialog = (props: SnackbarDialogProps) => SnackbarDialog({ ...props, type: 'info' });
export const SuccessDialog = (props: SnackbarDialogProps) => SnackbarDialog({ ...props, type: 'success' });

const SnackbarDialog = (props: SnackbarDialogProps & { type: 'error' | 'warning' | 'info' | 'success' }) => {
  const { open, onClose, type, message } = props;

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
