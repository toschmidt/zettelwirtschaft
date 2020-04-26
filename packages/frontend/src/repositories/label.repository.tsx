import { Label } from '@zettelwirtschaft/types';
import { ObjectId } from 'mongodb';
import React from 'react';
import { Get, GetProps, useGet, UseGetReturn } from 'restful-react';

const apiPath = '/labels';

export function useGetLabels(): UseGetReturn<Label[], string> {
  return useGet<Label[]>({ path: apiPath });
}

export type LabelControllerGetProps = Omit<GetProps<Label[], unknown, void>, 'path'>;

export const LabelControllerGet = (props: LabelControllerGetProps): React.ReactElement => (
  <Get<Label[], unknown, void> path={apiPath} {...props} />
);

export function useGetLabel(labelId: ObjectId | string): UseGetReturn<Label, string> {
  return useGet<Label>({ path: `${apiPath}/${labelId}` });
}

export type LabelControllerGetLabelProps = Omit<GetProps<Label, unknown, void>, 'path'> & { labelId: string };

export const LabelControllerGetLabel = ({ labelId, ...props }: LabelControllerGetLabelProps): React.ReactElement => (
  <Get<Label, unknown, void> path={`${apiPath}/${labelId}`} {...props} />
);
