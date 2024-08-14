import { useId, useRef } from 'react';
import { arrayOf, bool, exact, func, string } from 'prop-types';
import S from './ChatWindow.module.css';

const MessageType = exact({
  id: string.isRequired,
  message: string.isRequired,
  isMe: bool.isRequired,
});

const MessageListType = arrayOf(MessageType);

ChatWindow.propTypes = {
  messages: MessageListType.isRequired,
  onAddMessage: func,
};

function ChatWindow({ messages, onAddMessage }) {
  const id = useId();
  const textareaRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let newMessage = formData.get('message');
    newMessage = newMessage.trim();

    if (newMessage.length <= 0) {
      alert('메시지 내용을 입력하세요!');
      textareaRef.current.select();
    }

    onAddMessage?.(newMessage);
  };

  return (
    <section className={S.component}>
      <h2 className="sr-only">채팅 화면</h2>

      <ol className={S.chats}>
        {messages.map(({ id, isMe, message }) => {
          const classNames = `${S.chat} ${isMe ? S.me : ''}`.trim();

          return (
            <li key={id} className={classNames}>
              {message}
            </li>
          );
        })}
      </ol>

      <form className={S.form} onSubmit={handleSendMessage}>
        <div className={S.messageBox}>
          <label htmlFor={id} className="sr-only">
            메시지 입력
          </label>
          <textarea ref={textareaRef} id={id} name="message" />
        </div>
        <button type="submit">보내기</button>
      </form>
    </section>
  );
}

export default ChatWindow;
