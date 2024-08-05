// --------------------------------------------------------------------------
// ✅ TermAndConditions 컴포넌트
// --------------------------------------------------------------------------
// - [ ] 사용자가 이용 약관에 동의하면 확인 버튼 활성화
// - [ ] 사용자가 이용 약관에 동의하지 않으면 확인 버튼 비활성화
// --------------------------------------------------------------------------
import { Component } from 'react';
import './TermAndConditions.css';

// 레거시 리액트 프로그래밍 (with Class 컴포넌트)
class TermAndConditions extends Component {
  constructor(props) {
    // 컴포넌트에 전달된 속성(props)는 읽기 전용
    super(props);

    // 컴포넌트의 데이터 기억(메모리)
    // 컴포넌트 속성(props)와 달리 상태 값 수정 가능
    this.state = {
      agreement: false,
    };
  }

  render() {
    // data (props or state) => JSX (generating markup)
    const { agreement } = this.state; // { agreement: boolean }

    // 컴포넌트 속성 또는 상태로부터 파생된 상태 (derived state: from state or props)
    const isDisabled = agreement ? false : true;

    return (
      <form className="TermAndConditions" onSubmit={this.handleSubmit}>
        <h2>이용 약관</h2>
        <p>
          OOO 서비스를 이용함으로써 귀하는 본 약관에 동의하게 되므로 본 약관을
          숙지하는 것이 중요합니다. 본 약관 외에도 OOO은 개인정보처리방침을
          게시합니다.
        </p>
        <div>
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={agreement}
            onChange={this.handleCheck}
          />{' '}
          <label htmlFor="terms">이용 약관에 동의합니다.</label>
        </div>
        <button type="submit" disabled={isDisabled}>
          확인
        </button>
      </form>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  // 사용자에 의한 액션(행동)에 의해
  // 선언된 리액트 컴포넌트의 상태 업데이트
  handleCheck = (e) => {
    const { checked: nextAgreement } = e.target;
    // 리액트에게 렌더 트리거(요청)
    // 클래스 컴포넌트에서의 상태 업데이트 API
    // this.setState(nextState)

    // console.log('previous state: ', this.state);

    this.setState({ agreement: nextAgreement }, () => {
      // console.log('updated state and callback');
      console.log('updated state: ', this.state);
    });
  };
}

export default TermAndConditions;
