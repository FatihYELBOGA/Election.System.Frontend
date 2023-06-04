import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Candidate from "./Candidate"


function Vote(props) {
  const { userId } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [student,setStudent] = useState();
  const [studentList,setStudentList] = useState([]);
  const [voteId,setVoteId] = useState(0);
  const [departmentCandidateList, setDepartmentCandidateList] = useState([]);
  const [isActive,setIsActive] = useState(false);
  const [futureProcess,setFutureProcess] = useState();

  const handleIsVoted = () =>{
    fetch("https://iyte-election.azurewebsites.net/election/"+userId)
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result)
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
    formData.append("process", "DEPARTMENT_CANDIDACY");
    
    const queryParams = new URLSearchParams(formData).toString();
    const url = `https://iyte-election.azurewebsites.net/candidates?${queryParams}`;
  
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
       
        setStudentList(data)
        
      })
      .catch((err) => console.log(err));

      const newArray = studentList.filter((candidate) =>
          candidate.department.name === student.department.name
        );
        
        setDepartmentCandidateList(newArray);
  };

  const handleActiveProcess = (e) =>{

  }

  const handleFutureProcess = (e) =>{

  }
  
  

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
            {departmentCandidateList.map((candidate) => (
              <Candidate type="voting" voteId={voteId} student={candidate} setVoteId={setVoteId} userId={userId}/>
            ))}
          </div>
          
          
        </div>
        
    );
  }
}

export default Vote;