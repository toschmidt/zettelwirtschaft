import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Note } from '@zettelwirtschaft/types';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      margin: theme.spacing(1),
    },
    cardHeader: {
      paddingBottom: theme.spacing(1.5),
    },
    cardAction: {
      marginTop: theme.spacing(1),
    },
    cardContent: {
      paddingTop: theme.spacing(0),
      paddingBottom: `${theme.spacing(2)}px !important`,
    },
    description: {
      paddingBottom: theme.spacing(0.5),
      whiteSpace: 'pre-line',
      wordBreak: 'break-word'
    },
    chips: {},
    chip: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    menuText: {
      paddingLeft: theme.spacing(1),
    },
  });
});

export interface NoteProps {
  note: Note;
  editNote: (note: Note) => void;
  deleteNote: (note: Note) => void;
}

export const NoteComponent = (props: NoteProps) => {
  const classes = useStyles();
  const { note, editNote, deleteNote } = props;
  const { title, description, updatedAt, tags } = note;

  const [showMenuIcon, setShowMenuIcon] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const menuEdit = () => {
    closeMenu();
    editNote(note);
  };

  const menuDelete = () => {
    closeMenu();
    deleteNote(note);
  };

  return (
    <>
      <Card
        className={classes.card}
        onMouseEnter={() => setShowMenuIcon(true)}
        onMouseLeave={() => setShowMenuIcon(false)}
      >
        <CardHeader
          className={classes.cardHeader}
          title={title}
          subheader={new Date(updatedAt).toDateString()}
          titleTypographyProps={{ variant: 'h6' }}
          subheaderTypographyProps={{ variant: 'caption' }}
          action={
            showMenuIcon && (
              <IconButton size="small" className={classes.cardAction} onClick={openMenu}>
                <MoreVertIcon />
              </IconButton>
            )
          }
        />
        <Menu
          keepMounted
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={closeMenu}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={menuEdit}>
            <EditIcon fontSize="small" />
            <Typography variant="body1" className={classes.menuText}>
              Edit
            </Typography>
          </MenuItem>
          <MenuItem onClick={menuDelete}>
            <DeleteIcon fontSize="small" />
            <Typography variant="body1" className={classes.menuText}>
              Delete
            </Typography>
          </MenuItem>
        </Menu>
        <CardContent className={classes.cardContent}>
          <Typography variant="body1" className={classes.description} component="p">
            {description}
          </Typography>
          <div className={classes.chips}>
            {tags.map((tag: string, index: number) => {
              return <Chip key={index} label={tag} className={classes.chip} />;
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
