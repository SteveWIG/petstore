import { useState, useEffect } from 'react';
import getAllMyPhotoNFTIds from '../flow/script/GetAllMyPhotoNFTIds.js';
import getMetaDataByTokenID from '../flow/script/GetMetaDataByTokenID.js';
import {NFTStorage, toGatewayURL} from "nft.storage"

const QueryForm = () => {

    const [selectedId, setSelectedId] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [allTokenIds, setAllTokenIds]  = useState([]);

    useEffect(() => {
        let getTokens = async () => {
          // Set mock IDs for now
          const ids = await getAllMyPhotoNFTIds();
          setAllTokenIds(ids);
        };
        getTokens();
      }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        //try{
            var selectedId = event.target.id;
            let metadata = await getMetaDataByTokenID(selectedId);
            let dataURL = NFTStorage.toGatewayURL(metadata.url);
            // Fetch the URL to get a JSON response, which contains
            // an `image` attribute.
            // create a new metadata object and set the metadata to the value.
            let { image } = await (await fetch(dataURL)).json();
            let newdata = { ...metadata, image: toGatewayURL(image) };
            setMetadata(newdata);

        //} catch(err){
            //window.alert(JSON.stringify(err));
        //}
    }



    return (
        <div>
            <h1>Query NFTs</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="">
                            <label htmlFor="idInput">Photo ID</label>
                            <select
                                className="u-full-width"
                                type="number"
                                id="idInput"
                                onChange={(event) => setSelectedId(parseInt(event.target.value))}
                            >
                                {
                                    // We want to display token IDs that are available.
                                    allTokenIds.map(i => <option value={i} key={i}>{i}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <input className="button-primary" type="submit" value="Query" />
                </form>
                {selectedId}
                {
                    // We only display the table if there's metadata.
                    //metadata ? <MetadataTable metadata={metadata} /> : null
                    <div>{metadata}</div>
                }
        </div>

    )


}

/*const MetadataTable = ({ metadata }) => (
    <table className="u-full-width">
      <thead>
        <tr>
          {
            Object.keys(metadata).map((field,i) => (
              // Skip the `url` attribute in metadata for the table headings.
              field === 'url' ? null : <th key={i}>{field}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          {
            Object.keys(metadata).map((field, i) => {
              switch (field) {
                // Skip displaying the url.
                case 'url':
                  return null;
                // Display the image as <img> tag.
                case 'image':
                  return (
                    <td key={i}>
                      <img alt="Photo" src={metadata[field]} width="60px" />
                    </td>
                  );
                // Default is to display data as text.
                default:
                  return <td key={i}>{metadata[field]}</td>;
              }
            })
          }
        </tr>
      </tbody>
    </table>
  );*/

export default QueryForm;