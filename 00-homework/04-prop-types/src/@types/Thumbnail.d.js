import { string, number } from 'prop-types';

export const ThumbnailType = {
  id: string.isRequired,
  text: string.isRequired,
  width: number,
  height: number,
};
