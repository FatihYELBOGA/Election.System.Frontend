import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Candidate from "./Candidate"
import { Button } from "@mui/material";




function Vote(props) {
  const { userId } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [student,setStudent] = useState();
  const [studentList,setStudentList] = useState([]);
  const [voteId,setVoteId] = useState(0);

  const handleIsVoted = () =>{
    fetch("https://iyte-election.azurewebsites.net/election/"+userId)
    .then((res) => res.json())
    .then(
      (result) => {
        setVoteId(result.id);
      },
      (error) => {
        console.log(error);
       
      }
    );
  }

  const refreshPosts = () => {
    fetch("https://iyte-election.azurewebsites.net/students/"+userId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setStudent(result);
          getCandidateList();
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const getCandidateList = (e) => {
    const formData = new FormData();
    formData.append("process", "DEPARTMENT_REPRESENTATIVE");
    
    const queryParams = new URLSearchParams(formData).toString();
    const url = `https://iyte-election.azurewebsites.net/candidates?${queryParams}`;
  
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0].department)
        setStudentList(data)
        
      })
      .catch((err) => console.log(err));

      const newArray = studentList.filter((candidate) =>
          candidate.department.name === student.department.name
        );
        setStudentList(newArray);
  };
  
  

  useEffect(() => {
    refreshPosts();
    handleIsVoted();
  }, [voteId]);


  if (error) {
    return <div>Error!..</div>;
  } else if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
        <div className="" style={{display:"flex !important",justifyContent:"center !important"}}>
            
            
          <div fixed="true" className="announcement">
            {studentList.map((candidate) => (
              <Candidate voteId={voteId} student={candidate} setVoteId={setVoteId} userId={userId}/>
            ))}
          </div>
          
          
        </div>
        
    );
  }
}

export default Vote;