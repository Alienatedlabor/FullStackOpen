import { useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedName, setSearchedName] = useState('');
  const filteredEntries = !searchedName
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchedName.toLowerCase())
      );

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundPerson = persons.find((person) => newName === person.name);

    if (foundPerson) {
      alert(`${newName} is already in the phone book`);
      setNewName('');
      setNewNumber('');
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        setNewName={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        setNewNumber={(e) => setNewNumber(e.target.value)}
      />

      <h2>Numbers</h2>
      <Filter
        value={searchedName}
        onChange={(e) => setSearchedName(e.target.value)}
      />
      <Persons filteredEntries={filteredEntries} />
    </div>
  );
};

export default App;
