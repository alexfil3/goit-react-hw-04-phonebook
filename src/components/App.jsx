import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { v4 as uuidv4 } from 'uuid';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const dataWithId = {
      id: uuidv4(),
      ...data,
    };

    contacts
      .map(({ name }) => name.toLocaleLowerCase())
      .includes(dataWithId.name.toLocaleLowerCase())
      ? alert(`${dataWithId.name} is already in contacts`)
      : setContacts(state => [dataWithId, ...state]);
  };

  const filterHandler = e => {
    console.log(e.currentTarget.value);
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const onFilterChange = () =>
    contacts.filter(({ name }) =>
      name
        .split(' ')
        .join('')
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase())
    );

  const deleteHandler = e => {
    const filter = contacts.filter(
      contact => contact.id !== e.currentTarget.parentNode.id
    );
    setContacts(filter);
  };

  const { container, title } = css;

  return (
    <div className={container}>
      <h1 className={title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={title}>Contacts</h2>
      <Filter onChange={filterHandler} value={filter} />
      <ContactList contacts={onFilterChange()} onDelete={deleteHandler} />
    </div>
  );
}
