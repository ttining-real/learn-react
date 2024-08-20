import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.css';
import { AppSwitch } from '@/components';
import useToggle from '@/hooks/useToggle';
import { semantics } from '@/theme';

function SwitchTheme() {
  useDocumentTitle('테마 스위치');
  const [isDarkMode, setIsDarkMode] = useToggle(true);

  const theme = isDarkMode ? semantics.dark : semantics.light;
  console.log(theme);

  return (
    <main id="page" className={S.component}>
      <h1 className="headline">테마 스위치</h1>

      <div style={containerStyles}>
        <AppSwitch value={isDarkMode} onToggle={setIsDarkMode} ratio={3} />
        {isDarkMode ? '라이트' : '다크'} 테마 전환
      </div>
    </main>
  );
}

export default SwitchTheme;

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
};
