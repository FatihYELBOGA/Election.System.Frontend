import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./Candidacy.css"
import Button from '@mui/material/Button';


function Candidacy(props){
    const {userId} = props;
    const [file,setFile] = useState();

    const handleFile = (e) =>{
        setFile(e.target.files[0]);
        console.log(file);
    }
    const  handleApply = ()=>{

      const formData = new FormData();
      formData.append("file", file);
      console.log(file);

      fetch("https://iyte-election.azurewebsites.net/documents/" + userId, {
        method: "POST",
        body: formData
      })
        .then((res) => res.json()) 
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
    
    return (
    <div className='container'>
        <Card className='candidacy-card' sx={{ marginTop: 15,borderRadius:5}}>
        <CardActionArea>
          <CardContent>
            <Typography sx={{textAlign:"center"}} gutterBottom variant="h5" component="div">
              Documents for Departmental Representative Candidacy
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              In order to be a department candidate, you must upload the following files to the system in zip format.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              - Student certificate
            </Typography>
            <Typography variant="body2" color="text.secondary">
              - Grade Point Average (GPA)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              - Criminal record
            </Typography>
            <Typography variant="body2" color="text.secondary">
              - Political party membership
            </Typography>
            <br/> <br/> <br/>
            <form>
            <div style={{textAlign:"center"}}>
            <span>Choose a file: </span>
                <input onChange={handleFile} disabled={false} type="file" name="archive" accept=".zip,.rar,.7z,.gz" />
            </div>
            <br />
            <Button onClick={handleApply} sx={{width:"18%", marginLeft: "41%"}} variant='contained'>APPLY</Button>
            </form>
          </CardContent>
        </CardActionArea>
      </Card>

    </div>
      
    );
}

export default Candidacy;