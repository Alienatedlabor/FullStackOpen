import React from 'react';
const Person = ({ name, number }) => {
  return (
    <p key={name}>
      {name} {number}
    </p>
  );
};

const Persons = ({ filteredEntries }) => {
  return filteredEntries.map((person) => (
    <Person key={person.name} name={person.name} number={person.number} />
  ));
};

export default Persons;
