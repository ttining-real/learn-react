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
// function Button({ status, size = 'sm', text }) {
//   return h(
//     'button',
//     {
//       type: 'button',
//       className: `button button-${status} button-${size}`
//     },
//     text
//   );
// }

function Button({ status, size = 'sm', text }) {
  // return <button className={(Button, { status }, { size })}>{text}</button>;
  return <button className={`Button ${status} ${size}`}>{text}</button>;
}

export default Button;
