import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactsList/ContactsList';
import Filter from './Filters/Filters';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = { id: uuidv4(), name, number };
    if (isContactNameExists(name)) {
      alert(`Contact with name ${name} already exists!`);
    } else {
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
  };

  const isContactNameExists = (name) => {
    return contacts.some((contact) => contact.name === name);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const onDeleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={onDeleteContact} />
    </div>
  );
}

export default App;
