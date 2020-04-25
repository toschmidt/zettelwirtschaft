import { createStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { Autocomplete } from '@material-ui/lab';
import { Label, Note } from '@zettelwirtschaft/types';
import React, { ChangeEvent } from 'react';
import { GetDataError, MutateMethod } from 'restful-react';

import { useGetLabels } from '../repositories/label.repository';
import { useGetTags } from '../repositories/tag.repository';
import { ErrorDialog } from './snackbar.dialog';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    bottomBorder: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    width50: {
      width: '50%',
    },
    width100: {
      width: '100%',
    },
    dialogActions: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
  });
});

export interface NoteDialogProps {
  mutate: MutateMethod<Note, Note, void>;
  loading: boolean;
  error: GetDataError<unknown> | null | undefined;
  onSave: (note: Note) => void;
  onCancel: () => void;
  note?: Note;
  label?: Label;
}

export const NoteDialog = (props: NoteDialogProps) => {
  const classes = useStyles();
  const { mutate, error, onSave, onCancel, note, label: currentLabel } = props;

  const { data: availableLabels } = useGetLabels();
  const { data: availableTags } = useGetTags();

  const { mutate: putNote, error } = useMutation();

  const [title, setTitle] = React.useState(note?.title);
  const [description, setDescription] = React.useState(note?.description);
  const [label, setLabel] = React.useState(currentLabel);
  const [tags, setTags] = React.useState(note?.tags || []);

  const [closeError, setCloseError] = React.useState(false);

  const reset = () => {
    setTitle(undefined);
    setDescription(undefined);
    setLabel(undefined);
    setTags([]);
  };

  const save = () => {
    if (title && description && label) {
      const note: Note = {
        title: title,
        description: description,
        label: `${label._id}`,
        tags: tags,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setCloseError(false);
      mutate(note).then((savedNote: Note) => {
        reset();
        onSave(savedNote);
      });
    }
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <div>
      <Dialog open onClose={cancel} maxWidth={'sm'} fullWidth>
        <DialogTitle className={classes.bottomBorder}>Edit Note</DialogTitle>
        <DialogContent className={classes.bottomBorder}>
          <TextField
            autoFocus
            error={!title}
            id="title"
            margin="dense"
            label="Title"
            defaultValue={title}
            className={classes.width100}
            onChange={event => setTitle(event.target.value)}
          />
          <TextField
            multiline
            error={!description}
            id="description"
            margin="normal"
            label="Description"
            defaultValue={description}
            className={classes.width100}
            onChange={event => setDescription(event.target.value)}
          />
          <Autocomplete
            autoHighlight
            id="label"
            options={availableLabels || []}
            getOptionLabel={(label: Label) => label.name}
            getOptionSelected={(option: Label, value: Label) => option._id === value._id}
            defaultValue={currentLabel}
            renderInput={params => (
              <TextField {...params} error={!label} label="Label" margin="normal" className={classes.width100} />
            )}
            onChange={(event: ChangeEvent<{}>, value: Label | null) => setLabel(value || undefined)}
          />
          <Autocomplete
            multiple
            freeSolo
            id="tags"
            options={availableTags || []}
            defaultValue={tags}
            renderInput={params => (
              <TextField {...params} variant="standard" label="Tags" margin="normal" className={classes.width100} />
            )}
            onChange={(event, value) => setTags(value)}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={cancel} variant="outlined" color="secondary" startIcon={<CloseIcon />}>
            Cancel
          </Button>
          <Button onClick={save} variant="contained" color="primary" startIcon={<SaveIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {error && <ErrorDialog open={!closeError} onClose={() => setCloseError(true)} message={error.data} />}
    </div>
  );
};
