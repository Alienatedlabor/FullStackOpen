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
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const foundPerson = persons.find(
      (person) => newName.toLowerCase() === person.name.toLowerCase()
    );
    const updatedObject = { ...personObject, number: newNumber };

    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already in the phone book, would you like to replace the old number with the new one?`
        )
      ) {
        phonebookService
          .update(foundPerson.id, updatedObject)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== foundPerson.id ? person : returnedPerson
              )
            )
          )
          .catch((error) => alert('failed to update'));
        setNewName('');
        setNewNumber('');
      }
      setNewName('');
      setNewNumber('');
      return;
    }

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
