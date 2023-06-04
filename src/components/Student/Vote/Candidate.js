import React,{useState,useEffect}from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';


function Candidate(props){
    const {student,setVoteId,voteId,userId} = props;
    
    const handleVote = (e) =>{
      e.preventDefault();
    
      fetch("https://iyte-election.azurewebsites.net/election/vote-for-department-representative", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voterStudentId: userId,
          candidateStudentId: student.id,
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      setVoteId(student.id);
    }
    if(voteId === 0){
      return(
        <Card  id={student.id} sx={{ marginTop: 2,marginBottom: 2,width:"300px"}}>
            <CardActionArea disableTouchRipple disableRipple sx={{cursor:"default"}} >
              <CardContent>
                <Typography sx={{justifyContent:"center",marginBottom:2}} gutterBottom variant="h5" component="div">
                  {student.firstName+" "+student.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
                
                <div style={{marginTop:10,justifyContent:"center",display:"flex"}}>
    
                  
                  <Button onClick={handleVote} variant='contained' sx={{backgroundColor:"#B61815"}} >VOTE</Button>
                 
                </div>
               
              </CardContent>
            </CardActionArea>
          </Card>
        );
    }else{
      return(
        <Card  id={student.id} sx={{ marginTop: 2,marginBottom: 2,width:"300px"}}>
            <CardActionArea disableTouchRipple disableRipple sx={{cursor:"default"}} >
              <CardContent>
                <Typography sx={{justifyContent:"center",marginBottom:2}} gutterBottom variant="h5" component="div">
                  {student.firstName+" "+student.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
                {(voteId === student.id) ? (<div style={{marginTop:10,justifyContent:"center",display:"flex"}}>
                  <Button disabled={true}  sx={{backgroundColor:""}} >VOTED</Button>
                  </div>) : (<div style={{marginTop:10,justifyContent:"center",display:"flex"}}>
                    <Button disabled={true} variant='' sx={{backgroundColor:"#"}} >-</Button></div>)}
                
                
               
              </CardContent>
            </CardActionArea>
          </Card>
        );
    }
    
}
export default Candidate;