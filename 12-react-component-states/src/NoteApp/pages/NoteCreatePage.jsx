import { func } from 'prop-types';
import BackLink from '../components/BackLink';
import NoteForm from '../components/NoteForm';
import './NoteCreatePage.css';
import { ROUTES } from '../constants/routes';

NoteCreatePage.propTypes = {
  onChangeRoute: func.isRequired,
};

function NoteCreatePage({ onChangeRoute }) {
  const handleBackToList = () => onChangeRoute(ROUTES.list);

  return (
    <div className="NoteCreatePage">
      <BackLink onClick={handleBackToList} />
      <NoteForm mode="create" />
    </div>
  );
}

export default NoteCreatePage;
