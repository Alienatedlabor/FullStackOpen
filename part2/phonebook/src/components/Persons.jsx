import React from 'react';

const Person = ({ name, number, deleteEntry }) => {
  return (
    <div>
      <p key={name}>
        {name} {number}
        <button onClick={deleteEntry}>delete</button>
      </p>
    </div>
  );
};

const Persons = ({ filteredEntries, deleteEntry }) => {
  return filteredEntries.map((person) => (
    <Person
      key={person.name}
      name={person.name}
      number={person.number}
      deleteEntry={() => deleteEntry(person)}
    />
  ));
};

export default Persons;
