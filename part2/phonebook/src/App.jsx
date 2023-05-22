import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import phonebookService from './services/phonebook';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedName, setSearchedName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationStyle, setNotificationStyle] = useState(null);
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const deleteEntry = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      phonebookService
        .deleteEntry(person.id)
        .then(() => {
          setPersons(
            persons.filter((loopPerson) => loopPerson.id !== person.id)
          );
          setNotificationStyle(successStyle);
          setNotificationMessage(`${person.name} deleted`);
          setTimeout(() => setNotificationMessage(null), 5000);
          setTimeout(() => setNotificationStyle(null), 5000);
        })
        .catch((error) => {
          setNotificationStyle(errorStyle);
          setNotificationMessage(`${person.name} failed to be deleted.`);
          setTimeout(() => setNotificationMessage(null), 5000);
          setTimeout(() => setNotificationStyle(null), 5000);
        });
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
          .then((returnedPerson) => {
            setNotificationStyle(successStyle);
            setNotificationMessage(`${newName} updated`);
            setTimeout(() => setNotificationMessage(null), 5000);
            setTimeout(() => setNotificationStyle(null), 5000);
          })
          .catch((error) => {
            setNotificationStyle(errorStyle);
            setNotificationMessage(
              `${newName} failed to update. Entry may have already been deleted from the server`
            );
            //need some kind of filter here but not sure what parameters it needs  setPersons(persons.filter())
            setTimeout(() => setNotificationMessage(null), 5000);
            setTimeout(() => setNotificationStyle(null), 5000);
          });
        setNewName('');
        setNewNumber('');
      }
      setNewName('');
      setNewNumber('');
      return;
    }

    phonebookService.create(personObject).then((responseData) => {
      setPersons(persons.concat(responseData));
      setNotificationMessage(`${responseData.name} created`);
      setNotificationStyle(successStyle);
      setTimeout(() => setNotificationMessage(null), 5000);
      setTimeout(() => setNotificationStyle(null), 5000);
      setNewName('');
      setNewNumber('');
    });
  };

  return (
    <div>
      <Notification message={notificationMessage} style={notificationStyle} />
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
