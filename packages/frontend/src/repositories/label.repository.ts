import { Label } from '@zettelwirtschaft/types';
import { ObjectId } from 'mongodb';
import { useGet, UseGetReturn } from 'restful-react';

const apiPath = '/labels';

export function useGetLabels(): UseGetReturn<Label[], string> {
  return useGet<Label[]>({ path: apiPath });
}

export function useGetLabel(labelId: ObjectId | string): UseGetReturn<Label, string> {
  return useGet<Label>({ path: `${apiPath}/${labelId}` });
}
