import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./Candidacy.css"
import Button from '@mui/material/Button';


function Candidacy(){
    const [file,setFile] = useState();

    const handleFile = (e) =>{
        setFile(e.target.files[0]);
       
    }
    const  handleApply = ()=>{
        console.log(file);
    }
    

    return (
    <div className='container'>
        <Card className='candidacy-card' sx={{ marginTop: 15,borderRadius:5}}>
        <CardActionArea>
          <CardContent>
            <Typography sx={{textAlign:"center"}} gutterBottom variant="h5" component="div">
              jkanfk
            </Typography>
            <Typography variant="body2" color="text.secondary">
              fkafska
            </Typography>
            <form onClick={handleApply}>
            <div style={{textAlign:"center"}}>
            <span>Choose a file:</span>
                <input onClick={handleFile} disabled={false} type="file" name="archive" accept=".zip,.rar,.7z,.gz" />
            </div>
            <Button sx={{}} variant='contained'>APPLY</Button>
            </form>
          </CardContent>
        </CardActionArea>
      </Card>

    </div>
      
    );
}

export default Candidacy;