// ---------------------------------------------------------------------------
// ✅ 컴포넌트 내부에 명령형 핸들이 없을 경우 문제 해결
// ---------------------------------------------------------------------------
// - [ ] 컴포넌트 DOM 엘리먼트 참조를 외부에 노출: forwardRef()
// - [ ] 컴포넌트 DOM 엘리먼트를 제어할 수 있는 명령형 핸들 외부에 노출: useImperativeHandle()
// ---------------------------------------------------------------------------

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
  const olRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let newMessage = formData.get('message');
    newMessage = newMessage.trim();

    sendMessage(newMessage);
  };

  const handleKeyDown = (e) => {
    const { key, shiftKey } = e;

    if (key === 'Enter' && !shiftKey) {
      e.preventDefault();

      const newMessage = e.currentTarget.value.trim();

      if (newMessage.length > 0) {
        sendMessage(newMessage);
      }
    }
  };

  const sendMessage = (newMessage) => {
    const textarea = textareaRef.current;
    // const ol = olRef.current;

    if (newMessage.length <= 0) {
      alert('메시지 내용을 입력하세요!');
      textarea.select();
      return;
    }

    // 리액트는 상태를 동기적으로 업데이트 하지 않음
    // 리액트는 상태 업데이트 요청을 지켜보고, 효과적으로
    // 배치(batch, 일괄) 업데이트 합니다.
    onAddMessage?.(newMessage);

    textarea.value = '';

    // 타이머를 사용하지 않은 경우
    // ol.scrollTo(0, ol.scrollHeight);

    // 타이머 (우회적으로 리액트의 권장 방법이 아닌 방법으로 문제 해결)
    // setTimeout(() => ol.scrollTo(0, ol.scrollHeight));
    // scrollDownList(ol);
  };

  // const scrollDownList = (el) => {
  //   // 타이머 (우회적으로 리액트의 권장 방법이 아닌 방법으로 문제 해결)
  //   if (el) {
  //     setTimeout(() => el.scrollTo(0, el.scrollHeight));
  //   }
  // };

  const mountedList = (el) => {
    olRef.current = el;
    // scrollDownList(el);
  };

  return (
    <section className={S.component}>
      <h2 className="sr-only">채팅 화면</h2>

      <ol ref={mountedList} className={S.chats}>
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
          <textarea
            ref={textareaRef}
            id={id}
            name="message"
            onKeyDown={handleKeyDown}
          />
        </div>
        <button type="submit">보내기</button>
      </form>
    </section>
  );
}

export default ChatWindow;
