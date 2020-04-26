import React from 'react';
import Get, { GetProps, useGet, UseGetReturn } from 'restful-react';

const apiPath = '/tags';

export function useGetTags(): UseGetReturn<string[], string> {
  return useGet<string[]>({ path: apiPath });
}

export type TagControllerGetProps = Omit<GetProps<string[], unknown, void>, 'path'>;

export const TagControllerGet = (props: TagControllerGetProps): React.ReactElement => (
  <Get<string[], unknown, void> path={apiPath} {...props} />
);
