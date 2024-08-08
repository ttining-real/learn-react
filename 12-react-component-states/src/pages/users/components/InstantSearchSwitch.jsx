import { bool, func } from 'prop-types';

InstantSearchSwitch.propTypes = {
  isInstantSearch: bool,
  onToggle: func,
};

function InstantSearchSwitch({ isInstantSearch = false, onToggle }) {
  return (
    <div className="formControl">
      <label style={{ userSelect: 'none' }}>
        <input type="checkbox" checked={isInstantSearch} onChange={onToggle} />{' '}
        인스턴트 서치
      </label>
    </div>
  );
}

export default InstantSearchSwitch;
