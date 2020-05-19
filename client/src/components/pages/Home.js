import React, { useContext, useEffect, Fragment } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='text-center'>
        <h1>
          Hello {authContext.user && authContext.user.name}, Welcome to your own
          Phonebook
        </h1>
      </div>
      <br />
      <div className='grid-2'>
        <div>
          <ContactForm />
        </div>
        <div>
          <ContactFilter />
          <Contacts />
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
