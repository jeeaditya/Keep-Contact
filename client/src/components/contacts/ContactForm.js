import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, clearCurrent, current } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  // On loading
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  // Function to change state on change
  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Function to add or update on submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
      clearCurrent();
    }

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  // function to clear the fields and clear all
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>
          {current ? 'Update Contact' : 'Add Contact'}
        </h2>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={onChange}
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Phone'
          name='phone'
          value={phone}
          onChange={onChange}
        />
        <h5>Contact Type:</h5>
        <input
          type='radio'
          name='type'
          value='personal'
          onChange={onChange}
          checked={type === 'personal'}
        />
        &nbsp;Personal&nbsp;&nbsp;
        <input
          type='radio'
          name='type'
          value='professional'
          onChange={onChange}
          checked={type === 'professional'}
        />
        &nbsp;Professional&nbsp;&nbsp;
        <div>
          <input
            type='submit'
            value={current ? 'Update' : 'Add'}
            className='btn btn-primary btn-block'
          />
        </div>
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
