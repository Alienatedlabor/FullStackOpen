import { useState } from 'react';

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  average,
  percentPositive,
}) => {
  return (
    <>
      {total === 0 ? (
        <div>
          <p>No feedback given</p>
        </div>
      ) : (
        <div>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {total}</p>
          <p>average {average}</p>
          <p>positive {percentPositive}</p>
        </div>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + bad + neutral;
  const average = (good - bad) / total;
  const percentPositive = (good * 100) / total;
  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h1>statistics</h1>

      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={average}
        percentPositive={percentPositive}
      />
    </div>
  );
};

export default App;
