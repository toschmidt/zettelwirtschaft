import { Note } from '@zettelwirtschaft/types';
import { ObjectId } from 'mongodb';
import React from 'react';
import Get, { GetProps, Mutate, MutateProps, useGet, UseGetReturn, useMutate, UseMutateReturn } from 'restful-react';

const apiPath = '/notes';

export function useGetNotes(labelId: ObjectId | string): UseGetReturn<Note[], string> {
  return useGet<Note[]>({ path: apiPath, queryParams: { labelId: labelId } });
}

export interface NoteControllerGetQueryParams {
  labelId: string;
}

export type NoteControllerGetProps = Omit<GetProps<Note[], void, NoteControllerGetQueryParams>, 'path'>;

export const NoteControllerGet = (props: NoteControllerGetProps): React.ReactElement => (
  <Get<Note[], void, NoteControllerGetQueryParams> path={apiPath} {...props} />
);

export function usePutNote(): UseMutateReturn<Note, string, Note, void> {
  return useMutate({
    verb: 'PUT',
    path: apiPath,
  });
}

export type NoteRequestBody = Note;

export type NoteControllerCreateProps = Omit<MutateProps<Note, void, void, NoteRequestBody>, 'path' | 'verb'>;

export const NoteControllerCreate = (props: NoteControllerCreateProps): React.ReactElement => (
  <Mutate<Note, void, void, NoteRequestBody> verb="PUT" path={apiPath} {...props} />
);

export function usePostNote(noteId: ObjectId | string): UseMutateReturn<Note, string, Note, void> {
  return useMutate({
    verb: 'POST',
    path: `${apiPath}/${noteId}`,
  });
}

export type NoteControllerUpdateProps = Omit<MutateProps<Note, void, void, NoteRequestBody>, 'path' | 'verb'> & {
  noteId: string;
};

export const NoteControllerUpdate = ({ noteId, ...props }: NoteControllerUpdateProps): React.ReactElement => (
  <Mutate<Note, void, void, NoteRequestBody> verb="POST" path={`${apiPath}/${noteId}`} {...props} />
);

export function useDeleteNote(noteId: ObjectId | string): UseMutateReturn<void, string, string, void> {
  return useMutate({
    verb: 'DELETE',
    path: `${apiPath}/${noteId}`,
  });
}

export type NoteControllerDeleteProps = Omit<MutateProps<void, unknown, void, string>, 'path' | 'verb'>;

export const NoteControllerDelete = (props: NoteControllerDeleteProps): React.ReactElement => (
  <Mutate<void, unknown, void, string> verb="DELETE" path={apiPath} {...props} />
);
