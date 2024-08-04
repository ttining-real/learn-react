import { oneOfType, string, number } from 'prop-types';

export const CardType = {
  id: oneOfType([string, number]).isRequired,
  title: string.isRequired,
  genre: string.isRequired,
  total: oneOfType([string, number]).isRequired,
};
