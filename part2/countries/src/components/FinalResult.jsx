import React from 'react';

const FinalResult = ({ country }) => {
  // const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${REACT_APP_API_KEY}`;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <div>
        <h2>Languages:</h2>
        {Object.entries(country.languages).map(([key, value]) => (
          <ul key={key}>
            <li>{value}</li>
          </ul>
        ))}
      </div>
      <img src={country.flags.png} alt={country.flags.alt} />
      <div>
        <h3>Weather in {country.name.common}</h3>
        <p></p>
      </div>
    </div>
  );
};

export default FinalResult;
