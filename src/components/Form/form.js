import React, { useState, useEffect } from 'react';
import { FormEl, LabelEl, InputContact, InputSubmit } from './Form.styled';

const ContactForm = ({ onSubmit }) => {
  const [name, setIsName] = useState('');
  const [number, setIsNumber] = useState('');
   const [shouldReset, setIsShouldReset] = useState(false);

  const handleInputСhange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setIsName(value);
    } else if (name === 'number') {
      setIsNumber(value);
    }
  };

  useEffect(() => {
    if (shouldReset) {
      onSubmit({ name, number });
      reset();
      setIsShouldReset(false);
    }
  }, [onSubmit, name, number, shouldReset]);

  const handleSubmit = event => {
    event.preventDefault();

    setIsShouldReset(true);
  };

  const reset = () => {
    setIsName('');
    setIsNumber('');
  };

  return (
    <FormEl onSubmit={handleSubmit}>
      <LabelEl>
        Name
        <InputContact
          value={name}
          onChange={handleInputСhange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </LabelEl>
      <LabelEl>
        Number
        <InputContact
          value={number}
          onChange={handleInputСhange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </LabelEl>
      <InputSubmit type="submit"> Add contact</InputSubmit>
    </FormEl>
  );
};

export default ContactForm;
