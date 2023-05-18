import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import phonebookService from './services/phonebook';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedName, setSearchedName] = useState('');

  const deleteEntry = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      phonebookService
        .deleteEntry(person.id)
        .then(() =>
          setPersons(
            persons.filter((loopPerson) => loopPerson.id !== person.id)
          )
        )
        .catch((error) => alert(`${person.name} failed to be deleted`));
    }
  };

  useEffect(() => {
    phonebookService.getAll().then((responseData) => setPersons(responseData));
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

    phonebookService.create(personObject).then((responseData) => {
      setPersons(persons.concat(responseData));
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
      <Persons filteredEntries={filteredEntries} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
