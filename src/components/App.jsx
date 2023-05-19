import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Form/form';
import { ContactList } from './Contact/Contact';
import { Filter } from './Filter/Filter';
import { Title } from './App.styled';

const App = () => {
  const [contacts, setIsContacts] = useState([]);
  const [filter, setIsFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      setIsContacts(JSON.parse(contacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    const includedContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (includedContact) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name: newContact.name,
        number: newContact.number,
      };
      setIsContacts(prevState =>[...prevState, contact])
      };
    }

  const handleDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setIsContacts(updatedContacts);
  };

  const handleChangeFilter = event => {
    setIsFilter(event.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContact = getVisibleContacts();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>
        <Title>Phonebook</Title>

        <ContactForm onSubmit={(data) => handleAddContact(data)} />

        <Title>Contacts</Title>

        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList
          contacts={visibleContact}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
}

export default App;
