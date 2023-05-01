import Axios from 'axios';
import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import './App.css';

function App() {
  const [report, setReport] = useState('');
  const [listFile, setListFile] = useState([]);
  const [emails, setEmails] = useState('');
  
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setListFile(acceptedFiles[0]);
    console.log("acceptedFiles", acceptedFiles);
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const handleSubmit = () => {
    let baseUrl = 'http://3.66.32.76:3011';
    let emailsArray = emails.split(',');
    
    // if(report === 'purge') baseUrl = 'http://localhost:3011';
    // else if(report === 'revReport') baseUrl = 'http://localhost:3011';

    let formData = new FormData();
    formData.append("file", listFile);
    if(report === 'revReport') formData.append("emails", emailsArray);

    Axios.post(`${baseUrl}/history/automatedReport?report=${report}`, formData)
    .then(res => {
      console.log("response", res);
      alert(report === 'revReport' ? 'Please check your inbox.' : res.data.message);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="App">
        <div className='dropbox' {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Please upload a TEXT file. Only .txt files are accepted.</p>
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

          <div style={{marginLeft: "2vw", display: "inline-block"}}>
            <input type="radio" name="report" value={report} checked={report === 'blacklist' ? true : false} onChange={()=> setReport('blacklist')} />
            <label>Blacklist</label>
          </div>
        </div>

        {/* {report === 'revReport' ?
          <div style={{marginTop: "4vh"}}>
            <label>Emails to send the report to (multiple emails should be comma separated):</label>
            <input name="emails" value={emails} onChange={(e)=> setEmails(e.target.value)} />
          </div>
          :
          ''
        } */}
        
        <div style={{marginTop: "4vh"}}>
          <button style={{cursor: "pointer", backgroundColor: "purple", color: "magenta", padding: "2vh 2vw", borderRadius: "8px", border: 0}} onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
}

export default App;
