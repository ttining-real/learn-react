import AvatarListPage from '@/pages/AvatarListPage';
import avatarsData from '@/data/avatars';

function App() {
  return (
    <div className="App">
      <AvatarListPage list={avatarsData} />
    </div>
  );
}

export default App;
