import { redirect, LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return redirect('/animals');
};
