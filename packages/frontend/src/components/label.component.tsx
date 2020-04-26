import { createStyles, GridList, GridListTile, makeStyles, Typography } from '@material-ui/core';
import { Label, Note } from '@zettelwirtschaft/types';
import * as React from 'react';

import { ConfirmationDialog } from '../dialogs/confirmation.dialog';
import { NoteDialog } from '../dialogs/note.dialog';
import { SuccessDialog } from '../dialogs/snackbar.dialog';
import useWindowDimensions from '../hooks/useWindowDimensions.hook';
import { NoteControllerDelete, NoteControllerUpdate, useGetNotes } from '../repositories/note.repository';
import { NoteComponent } from './note.component';

const useStyles = makeStyles(() => {
  return createStyles({
    gridList: {
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      width: '100%',
      height: '100%',
      paddingTop: '5px',
      paddingBottom: '5px',
    },
    innerGridList: {
      height: 'auto',
    },
    innerGridListTile: {},
  });
});

export interface LabelProps {
  label: Label;
}

export const LabelComponent = (props: LabelProps): React.ReactElement => {
  const classes = useStyles();
  const { label } = props;
  const { width } = useWindowDimensions();
  const n_cols: number = Math.floor(width / 350);

  const { data: notes, refetch, loading } = useGetNotes(label._id!);

  const [editNote, setEditNote] = React.useState<Note | null>(null);
  const [deleteNote, setDeleteNote] = React.useState<Note | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const slicedNotes: Note[][] = [...Array(n_cols).keys()].map(() => []);

  if (!loading && notes) {
    notes.map((note: Note, i: number) => {
      slicedNotes[i % n_cols].push(note);
    });
  }

  return (
    <>
      <GridList cellHeight={'auto'} spacing={0} className={classes.gridList} cols={n_cols}>
        {slicedNotes.map((notes: Note[], index: number) => (
          <GridListTile key={index}>
            <GridList cellHeight={'auto'} spacing={0} className={classes.innerGridList} cols={1}>
              {notes.map((note: Note) => (
                <GridListTile key={`${note._id}`} className={classes.innerGridListTile}>
                  <NoteComponent note={note} editNote={setEditNote} deleteNote={setDeleteNote} />
                </GridListTile>
              ))}
            </GridList>
          </GridListTile>
        ))}
      </GridList>

      {editNote && (
        <NoteControllerUpdate noteId={editNote._id!}>
          {(mutate, { loading, error }): React.ReactElement => (
            <NoteDialog
              mutate={mutate}
              loading={loading}
              error={error}
              onSave={(): void => {
                setEditNote(null);
                setSuccessMessage('Updated note!');
                refetch();
              }}
              onCancel={(): void => setEditNote(null)}
              note={editNote}
              label={label}
            />
          )}
        </NoteControllerUpdate>
      )}

      {deleteNote && (
        <NoteControllerDelete>
          {(mutate, { loading, error }): React.ReactElement => (
            <ConfirmationDialog
              mutate={(): Promise<void> => mutate(deleteNote._id!)}
              loading={loading}
              error={error}
              onConfirm={(): void => {
                setDeleteNote(null);
                setSuccessMessage('Deleted note!');
                refetch();
              }}
              onCancel={(): void => setDeleteNote(null)}
              type="DELETE"
              title={'Delete Note?'}
            >
              <Typography>Are you sure you want to delete this note?</Typography>
            </ConfirmationDialog>
          )}
        </NoteControllerDelete>
      )}

      <SuccessDialog
        open={!!successMessage}
        onClose={(): void => setSuccessMessage(null)}
        message={successMessage || ''}
      />
    </>
  );
};
