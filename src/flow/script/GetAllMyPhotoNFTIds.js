import * as fcl from '@onflow/fcl';
import raw_script from './GetAllMyPhotoNFTIds.cdc';

async function getAllMyPhotoNFTIds(){

    let myscript = await (await fetch(raw_script)).text();

    const encoded_response = await fcl.send([fcl.script(myscript)]);

    const tokenIds = await fcl.decode(encoded_response);

    // Sort the IDs in ascending order and return the array.
    return tokenIds;
}

export default getAllMyPhotoNFTIds;