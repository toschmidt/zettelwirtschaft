import { Note } from '@zettelwirtschaft/types';
import { ObjectId } from 'mongodb';
import { useGet, UseGetReturn, useMutate, UseMutateReturn } from 'restful-react';

const apiPath = '/notes';

export function useGetNotes(labelId: ObjectId | string): UseGetReturn<Note[], string> {
  return useGet<Note[]>({ path: apiPath, queryParams: { labelId: labelId } });
}

export function usePutNote(): UseMutateReturn<Note, string, Note> {
  return useMutate({
    verb: 'PUT',
    path: apiPath,
  });
}

export function usePostNote(noteId: ObjectId | string): UseMutateReturn<Note, string, Note> {
  return useMutate({
    verb: 'POST',
    path: `${apiPath}/${noteId}`,
  });
}

export function useDeleteNote(noteId: ObjectId | string): UseMutateReturn<void, string, string> {
  return useMutate({
    verb: 'DELETE',
    path: `${apiPath}/${noteId}`,
  });
}
