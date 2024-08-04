import { string, oneOf } from 'prop-types';

export const ButtonType = {
  status: oneOf(['default', 'positive', 'negative']).isRequired,
  size: oneOf(['sm', 'md', 'lg']).isRequired,
  text: string,
};
