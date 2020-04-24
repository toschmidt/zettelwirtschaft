import { useGet, UseGetReturn } from 'restful-react';

const apiPath = '/tags';

export function useGetTags(): UseGetReturn<string[], string> {
  return useGet<string[]>({ path: apiPath });
}
