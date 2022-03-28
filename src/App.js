import Axios from 'axios';
import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import './App.css';

function App() {
  const [report, setReport] = useState('');
  const [listFile, setListFile] = useState([]);
  
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setListFile(acceptedFiles[0]);
    console.log("acceptedFiles", acceptedFiles);
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const handleSubmit = () => {
    let baseUrl = '';
    // if(report === 'purge') baseUrl = 'http://10.0.1.76:3011';
    // else if(report === 'revReport') baseUrl = 'http://3.122.255.224:3011';

    
    if(report === 'purge') baseUrl = 'http://localhost:3011';
    else if(report === 'revReport') baseUrl = 'http://localhost:3011';

    let formData = new FormData();
    formData.append("file", listFile);

    Axios.post(`${baseUrl}/history/automatedReport?report=${report}`, formData)
    .then(res => {
      console.log("response", res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="App">
        <div className='dropbox' {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
          <p>{listFile ? listFile.name : ''}</p>
        </div>
        <div style={{textAlign: "center"}}>
          <div style={{display: "inline-block"}}>
            <input type="radio" name="report" value={report} checked={report === 'purge' ? true : false} onChange={()=> setReport('purge')} />
            <label>Purge</label>
          </div>

          <div style={{marginLeft: "2vw", display: "inline-block"}}>
            <input type="radio" name="report" value={report} checked={report === 'revReport' ? true : false} onChange={()=> setReport('revReport')} />
            <label>Revenue Report</label>
          </div>
        </div>
        
        <div style={{marginTop: "4vh"}}>
          <button style={{cursor: "pointer", backgroundColor: "purple", color: "magenta", padding: "2vh 2vw", borderRadius: "8px", border: 0}} onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
}

export default App;
