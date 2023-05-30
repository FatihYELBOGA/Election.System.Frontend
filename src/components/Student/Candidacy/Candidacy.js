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
    const [isStart,setIsStart] = useState(false);
    const [isApply,setIsApply] = useState(true);

    const handleCancel= (e) =>{

    }

    const handleFile = (e) =>{
        setFile(e.target.files[0]);
    }

    const  handleApply = ()=>{

      const formData = new FormData();
      formData.append("StudentId", userId);
      formData.append("Process", "DEPARTMENT_REPRESENTATIVE");
      formData.append("File", file);

      fetch("https://iyte-election.azurewebsites.net/documents", {
        method: "POST",
        body: formData
      })
        .then((res) => res.json()) 
        .then((data) => {
          console.log(data);
          alert("Document sent succesfully!");
        })
        .catch((err) => console.log(err));
    }
 //   if(isStart){
 //     if(!isApply){
          return (

          <div className='container'>
              <Card className='candidacy-card' sx={{ marginTop: 15,borderRadius:5}}>
              <CardActionArea disableTouchRipple disableRipple sx={{cursor:"default"}} >
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
                  <Button onClick={handleApply} sx={{width:"18%", marginLeft: "41%",backgroundColor: "#B61815"}} variant='contained'>APPLY</Button>
                  </form>
                </CardContent>
              </CardActionArea>
            </Card>

          </div>
            
          );
      //}

      /*else{
        return(<div className='container'>
        <Card  sx={{ marginTop: 15,borderRadius:5,width:"30%",marginLeft:"35%"}}>
        <CardActionArea disableTouchRipple disableRipple sx={{cursor:"default"}} >
          <CardContent>
            <Typography sx={{textAlign:"center"}} gutterBottom variant="h5" component="div">
              Documents for Departmental Representative Candidacy
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary" sx={{textAlign:"center"}}>
              Your application has been sent, you can view its status.
            </Typography>
            <div style={{display:"flex",marginTop:20,justifyContent:"center"}}>

            <Typography  variant="body2" >
              ????????
            </Typography>
            </div>
            
            
             <br/>
            
            <Button onClick={handleCancel} sx={{width:"40%", marginLeft: "30%",backgroundColor:"#B61815"}} variant='contained'>CANCEL</Button>
            
          </CardContent>
        </CardActionArea>
      </Card>

    </div>);
      }
    }else{
      return(
        <div style={{justifyContent:"center",display:"flex"}}>
        <p>There is not any process</p>
      </div>
      );
      
    }*/
}

export default Candidacy;