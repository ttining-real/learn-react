import { ButtonType } from '@/@types/Button.d';

function Button({ status, size = 'sm', text }) {
  return <button className={`Button ${status} ${size}`}>{text}</button>;
}

export default Button;

Button.propTypes = ButtonType;
