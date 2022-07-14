// MintToken.tx.js
import { NFTStorage, File } from 'nft.storage';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import cdc from './MintToken.cdc';

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdiMjgxZGIzRmQ0ZjU3MTE4N2JlQjM4NGE5YWE0NTg5NTE3ZTJmNDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzcxMDAwMDc4MCwibmFtZSI6IlBldHNob3AifQ.dE6OH_nEQmrZqJ5L3JTuJOPlkyUzuYJpGqzqPOLPQPI";

// Initialize the NFTStorage client
const storage = new NFTStorage({ token: API_KEY });

async function mintToken(pet) {
    // The metadata contains the attribute `url` which is an IFPS URL
    // pointing to the data.json.
    const { url } = await uploadToStorage(pet);

    // We want to include the IPFS URL to the blockchain, so we can
    // "unpack" the token data when we query it later. So we create
    // a new object with all of the pet's attributes plus `url`.
    const txId = await mintPet({ ...pet, url });
    return txId;
}
  
  // We will fill in these functions next
  
async function uploadToStorage(pet) {
    // Call `store(...)` on the NFTStorage client with an object
    // containing all of pet's attributes, and required image and
    // description attributes.
    console.log(JSON.stringify(pet));

    let metadata = await storage.store({
        ...pet,
        image: pet.image && new File([pet.image], `${pet.name}.jpg`, { type: 'image/jpg' }),
        description: `${pet.name}'s metadata`,
    });

    // If all goes well, return the metadata.
    return metadata;
}
  
async function mintPet(metadata) {
    // Convert the metadata into a {String: String} type. See below.
    console.log('mintPet');

    const dict = toCadenceDict(metadata);

    // Build a list of arguments
    const payload = fcl.args([
        fcl.arg(
        dict,
        t.Dictionary({ key: t.String, value: t.String }),
        )
    ]);

    // Fetch the Cadence raw code.
    const code = await (await fetch(cdc)).text();

    console.log('code:'+code);

    console.log('payload:'+payload);

    // Send the transaction!
    // Note the `userAuthz` function we have not implemented.
    /*const encoded = await fcl.send([
        fcl.transaction(code),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(999),
        payload,
    ]);*/

    const encoded = await fcl.send([
        fcl.transaction(code),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(999),
        payload,
    ]);
    
    console.log('Waiting for the transaction id');

    // Call `fcl.decode` to get the transaction ID.
    let txId = await fcl.decode(encoded);

    // This waits for the transaction to be sealed, which is a recommended way.
    await fcl.tx(txId).onceSealed();

    // Return the transaction ID
    return txId;
}

// Helper function to convert `pet` object to a {String: String} type.
function toCadenceDict(pet) {
    // Copy the pet object so we don't mutate the original.
    let newPet = {...pet};
  
    // Delete the `image` attribute that contains a `File` object.
    delete newPet.image;
  
    // Return an array of [{key: string, value: string}].
    return Object.keys(newPet).map((k) => ({key: k, value: pet[k]}));
}

// Don't forget to export the function.
export default mintToken;