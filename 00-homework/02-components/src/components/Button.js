import { createElement as h } from 'https://esm.sh/react';

/* 
  <button type='button'>
    text
  </button>
*/

/* 
  props: { 
    type: 'button'
    class: 'button'
    class-status: 'default' | 'positive' | 'negative',
    class-size: 'sm' | 'md' | 'lg',
  }
*/
function Button({ status, size = 'sm', text }) {
  return h(
    'button',
    {
      type: 'button',
      className: `button button-${status} button-${size}`
    },
    text
  );
}

export default Button;
