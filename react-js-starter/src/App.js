import './components/pokemon selector/pokemonSelectorStyling.css'
import React from 'react'
import PersonalInfoForm from './components/form';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PersonalInfoForm/>
      </header>
    </div>
  );
}

export default App;
