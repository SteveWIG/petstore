import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import myScript from './GetMetaDataByTokenID.cdc';

async function getMetaDataByTokenID(id){
    console.log('getMetaDataByTokenID '+id);
    let script = await(await fetch(myScript)).text();
    const encoded = await fcl.send([
        fcl.script(script),
        fcl.args([fcl.arg(id, t.UInt64)]),
    ]);
    const data = await fcl.decode(encoded);
    return data;
}

export default getMetaDataByTokenID;