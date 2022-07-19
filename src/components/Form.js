// components/Form.js

// Import the `FileSelector` module, which does not exist yet. 
import FileSelector from './FileSelector';
import { useState } from 'react';
import mintPhotoNFT from '../flow/transaction/MintPhotoShopNFT.js';

// Collect the information of a pet and manage as a state
// and mint the NFT based on the information.
const MyForm = () => {
  const [photo, setPhoto] = useState({});
  const [transactionStatus, setTransactionStatus] = useState("");

  // Helper callback functions to be passed to input elements' onChange.

  // Update the state of the pet's name.
  const setName = (event) => {
    const name = event.target.value;
    setTransactionStatus("");
    setPhoto({...photo, name});
  }

  // Update the state of the pet's breed.
  const setDescription = (event) => {
    setTransactionStatus("");
    const description = event.target.value;
    setPhoto({...photo, description});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setTransactionStatus("Please wait...");
      await mintPhotoNFT(photo );
      setTransactionStatus("Transaction sealed OK. Your NFT has been minted.");
    } catch (err) {
      setTransactionStatus("Something went wrong.");
      console.error(err);
    }
  }

  return (
    <div style={style}>
      <h1>Mint NFTs</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
            <FileSelector photo={photo} setPhoto={setPhoto} />
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
      {transactionStatus}
    </div>
  );
};

const style = {
  padding: '5rem',
  background: 'white',
  maxWidth: 350,
};

export default MyForm;

