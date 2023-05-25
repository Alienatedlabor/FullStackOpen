import { useEffect, useState } from 'react';
import axios from 'axios';
import FinalResult from './components/FinalResult';

function App() {
  const [searchedCountry, setSearchedCountry] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const background = {
    background: '#f8f8ff',
  };
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/';

  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchedCountry(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/all`)
      .then((response) => setAllCountries(response.data));
  }, []);

  return (
    <div style={background} className="App">
      <div>
        <label>Find countries:</label>
        <input value={searchedCountry} onChange={handleChange} type="text" />
      </div>
      <div>
        {searchedCountry &&
          (filteredCountries.length === 1 ? (
            <FinalResult country={filteredCountries[0]} />
          ) : filteredCountries.length >= 10 ? (
            'filter results further'
          ) : (
            filteredCountries.map((country) => (
              <ul key={country.name.common}>
                <li>{country.name.common}</li>
              </ul>
            ))
          ))}
      </div>
    </div>
  );
}

export default App;
