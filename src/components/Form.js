// components/Form.js

// Import the `FileSelector` module, which does not exist yet. 
import FileSelector from './FileSelector';
import { useState } from 'react';
import mintToken from '../flow/transaction/MintToken.tx.js';

// Collect the information of a pet and manage as a state
// and mint the NFT based on the information.
const MyForm = () => {
  const [pet, setPet] = useState({});

  // Helper callback functions to be passed to input elements' onChange.

  // Update the state of the pet's name.
  const setName = (event) => {
    const name = event.target.value;
    setPet({...pet, name});
  }

  // Update the state of the pet's breed.
  const setBreed = (event) => {
    const breed = event.target.value;
    setPet({...pet, breed});
  }

  // Update the state of the pet's age.
  const setAge = (event) => {
    const age = event.target.value;
    setPet({...pet, age});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await mintToken(pet);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={style}>
      <form onSubmit={handleSubmit}>
        <div className="row">
            <FileSelector pet={pet} setPet={setPet} />
            <div>
            <label for="nameInput">Pet's name</label>
            <input
              className="u-full-width"
              type="text"
              placeholder="Max"
              id="nameInput"
              onChange={setName}
            />
            </div>
            <div>
            <label for="breedInput">Breed</label>
            <select className="u-full-width" id="breedInput" onChange={setBreed}>
              <option key="1" value="Labrador">Labrador</option>
              <option key="2" value="Bulldog">Bulldog</option>
              <option key="3" value="Poodle">Poodle</option>
            </select>
            </div>
            <div>
            <label for="ageInput">Age</label>
              <select
                className="u-full-width"
                id="ageInput"
                onChange={setAge}
              >
                {
                  [...Array(10).keys()].map(i => <option key={i} value={i}>{i}</option>)
                }
              </select>
            </div>
          </div>
        <input className="button-primary" type="submit" value="Mint" />
      </form>
    </div>
  );
};

const style = {
  padding: '5rem',
  background: 'white',
  maxWidth: 350,
};

export default MyForm;

