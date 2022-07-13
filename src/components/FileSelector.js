// components/FileSelector.js

// We are passing `pet` and `setPet` as props to `FileSelector` so we can
// set the file we selected to the pet state on the `Form` outer scope
// and keep this component stateless.
const FileSelector = ({pet, setPet}) => {

  // Read the FileList from the file input component, then
  // set the first File object to the pet state.
  const readFiles = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setPet({...pet, image: files[0]});
    }
  };

  return (
    <div className="">
      <label for="fileInput">Image</label>
      <input type="file" onChange={readFiles} />
    </div>
  );
};

export default FileSelector;