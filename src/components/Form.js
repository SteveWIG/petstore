// components/Form.js

// Import the `FileSelector` module, which does not exist yet. 
import FileSelector from './FileSelector';
import { useState } from 'react';
import mintPhotoNFT from '../flow/transaction/MintToken.tx.js';

// Collect the information of a pet and manage as a state
// and mint the NFT based on the information.
const MyForm = () => {
  const [photo, setPhoto] = useState({});

  // Helper callback functions to be passed to input elements' onChange.

  // Update the state of the pet's name.
  const setName = (event) => {
    const name = event.target.value;
    setPhoto({...photo, name});
  }

  // Update the state of the pet's breed.
  const setDescription = (event) => {
    const description = event.target.value;
    setDescription({...photo, description});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await mintPhotoNFT(photo);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={style}>
      <form onSubmit={handleSubmit}>
        <div className="row">
            <FileSelector photo={photo} setPet={setPhoto} />
            <div>
            <label for="nameInput">Photo name</label>
            <input
              className="u-full-width"
              type="text"
              placeholder="Photo name"
              id="nameInput"
              onChange={setName}
            />
            </div>
            <div>
            <label for="descInput">Description</label>
            <input
              className="u-full-width"
              type="text"
              placeholder="Description"
              id="descInput"
              onChange={setDescription}
            />
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

