import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [searchedCountry, setSearchedCountry] = useState('');
  const [allCountries, setAllCountries] = useState([]);

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
    <div className="App">
      <div>
        <label>Find countries:</label>
        <input value={searchedCountry} onChange={handleChange} type="text" />
      </div>
      <div>
        {searchedCountry &&
          (filteredCountries.length >= 10
            ? 'Too many matches, filter further'
            : filteredCountries.map((country) => (
                <ul key={country.name.common}>
                  <li>{country.name.common}</li>
                </ul>
              )))}
      </div>
    </div>
  );
}

export default App;
