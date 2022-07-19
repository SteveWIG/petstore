// components/FileSelector.js

// We are passing `photo` and `setPhoto` as parameters to `FileSelector` so we can
// set the file we selected to the pet state on the `Form` outer scope
// and keep this component stateless.
const FileSelector = ({photo, setPhoto}) => {

  // Read the FileList from the file input component, then
  // set the first File object to the pet state.
  const readFiles = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setPhoto({...photo, image: files[0]});
    }
  };

  return (
    <div>
      <label>Image</label>
      <input type="file" id="fileInput" onChange={readFiles} />
    </div>
  );
};

export default FileSelector;