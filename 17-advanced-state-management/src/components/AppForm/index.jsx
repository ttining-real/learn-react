import S from './style.module.css';

function AppForm() {
  const handleSubmit = () => {
    console.log('submit');
  };

  return <form className={S.component} onSubmit={handleSubmit}></form>;
}

export default AppForm;
