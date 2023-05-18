import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedName, setSearchedName] = useState('');
  const url = 'http://localhost:3001/persons';
  useEffect(() => {
    axios.get(url).then((response) => {
      const data = response.data;
      setPersons(data);
    });
  }, []);

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
    };

    axios.post(url, personObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName('');
      setNewNumber('');
    });
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
