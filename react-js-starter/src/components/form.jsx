import React, { useState } from 'react';
import PokemonSelector from './pokemon selector/pokemonSelector';

function PersonalInfoForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [currentView, setCurrentView] = React.useState("form");

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted successfully');
      setCurrentView("pokemonSelector");
    } else {
      setErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = '\tFirst name is required';
    }
    if (!lastName.trim()) {
      errors.lastName = '\tLast name is required';
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = '\tPhone number is required';
    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
      errors.phoneNumber = '\tPhone number should be 10 digits';
    }
    if (!address.trim()) {
      errors.address = '\tAddress is required';
    }
    return errors;
  };

  const PokeSelector = () =>  (
    <div>
      <h1 className="appTitle">
        Pokemon Trainer Card Creator
      </h1>
      <PokemonSelector onClick={page => setCurrentView(page)} firstName={firstName} lastName={lastName} phoneNumber={phoneNumber} address={address}/>
    </div>
  )

  return (
    currentView === "form" ?
      <div>
        <h1 className="appTitle">
          Pokemon Trainer Card Creator
        </h1>
        <div className="center">
        <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <br></br>
          <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        </label>
        <br />
        <label>
          Last Name:
          <br></br>
          <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        </label>
        <br />
        <label>
          Phone Number:
          <br></br>
          <input type="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
          {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber}</span>}
        </label>
        <br />
        <label>
          Address:
          <br></br>
          <textarea value={address} onChange={(event) => setAddress(event.target.value)} />
          {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
        </label>
        <br />
        <button type="submit">Submit</button>
        </form>
        </div>
      </div>
    :
      <PokeSelector/>
  );
}

export default PersonalInfoForm;