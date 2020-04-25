import { Container, createStyles, Fab, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Label } from '@zettelwirtschaft/types';
import * as React from 'react';

import {
  CustomExpansionPanel,
  CustomExpansionPanelDetails,
  CustomExpansionPanelSummary,
} from '../customizations/expansionPanel';
import { NoteDialog } from '../dialogs/note.dialog';
import { SuccessDialog } from '../dialogs/snackbar.dialog';
import { useGetLabels } from '../repositories/label.repository';
import { usePutNote } from '../repositories/note.repository';
import { LabelComponent } from './label.component';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    expansionPanel: {},
    fabContainer: {
      position: 'fixed',
      bottom: theme.spacing(1),
      right: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
    },
    fab: {
      margin: theme.spacing(1),
    },
  });
});

export const LabelGroupComponent = () => {
  const classes = useStyles();
  const [noteDialogOpen, setNoteDialogOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const { data: labels, refetch, loading } = useGetLabels();

  return (
    <>
      <Container maxWidth="xl">
        {!loading &&
          labels &&
          labels.map((label: Label) => (
            <CustomExpansionPanel
              key={`${label._id}`}
              defaultExpanded={true}
              className={classes.expansionPanel}
              elevation={0}
            >
              <CustomExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={'h5'} color="inherit" noWrap>
                  {label.name}
                </Typography>
              </CustomExpansionPanelSummary>
              <CustomExpansionPanelDetails>
                <LabelComponent label={label} />
              </CustomExpansionPanelDetails>
            </CustomExpansionPanel>
          ))}
      </Container>

      <div className={classes.fabContainer}>
        <Fab color="primary" size={'medium'} className={classes.fab}>
          <EditIcon />
        </Fab>
        <Fab color="primary" size={'medium'} className={classes.fab} onClick={() => setNoteDialogOpen(true)}>
          <AddIcon />
        </Fab>
      </div>

      {noteDialogOpen && (
        <NoteDialog
          useMutation={usePutNote}
          onSave={() => {
            setNoteDialogOpen(false);
            setSuccessMessage('Created new note!');
            refetch();
          }}
          onCancel={() => setNoteDialogOpen(false)}
        />
      )}

      <SuccessDialog open={!!successMessage} onClose={() => setSuccessMessage(null)} message={successMessage || ''} />
    </>
  );
};