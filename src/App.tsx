import * as React from 'react';
import Dropdown from './Dropdown'
import './App.css';

const data = [
  { value: "one" },
  { value: "two" },
  { value: "three" },
  { value: "four" },
  { value: "five" }
];

function selectedItem(val: string) {
  console.log(val);
}

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Dropdown options={data} onChange={selectedItem} />
      </header>
    </div>
  );
}

export default App;
