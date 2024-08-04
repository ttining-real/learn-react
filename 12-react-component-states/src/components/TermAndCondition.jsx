// --------------------------------------------------------------------------
// ✅ TermAndConditions 컴포넌트
// --------------------------------------------------------------------------
// - [ ] 사용자가 이용 약관에 동의하면 확인 버튼 활성화
// - [ ] 사용자가 이용 약관에 동의하지 않으면 확인 버튼 비활성화
// --------------------------------------------------------------------------

function TermAndConditions() {
  return (
    <form className="TermAndConditions">
      <h2>이용 약관</h2>
      <p>
        OOO 서비스를 이용함으로써 귀하는 본 약관에 동의하게 되므로 본 약관을
        숙지하는 것이 중요합니다. 본 약관 외에도 OOO은 개인정보처리방침을
        게시합니다.
      </p>
      <div>
        <input id="terms" name="terms" type="checkbox" />
        <label htmlFor="terms">이용 약관에 동의합니다.</label>
      </div>
      <button type="submit">확인</button>
    </form>
  );
}

export default TermAndConditions;
