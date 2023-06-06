import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Candidate from "../Vote/Candidate";


function ElectionResult(props) {
  const { userId } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [student,setStudent] = useState("");
  const [studentList,setStudentList] = useState([]);
  const [voteId,setVoteId] = useState(0);
  const [isActive,setIsActive] = useState(false);
  const [isFinished,setIsFinished] = useState(false);


  const refreshPosts = () => {
    fetch("https://iyte-election.azurewebsites.net/students/"+userId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setStudent(result);
          if(student !== ""){
            getCandidateList();
          }
          
        },
        (error) => {
         
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const getCandidateList = (e) => {
    const url = `https://iyte-election.azurewebsites.net/election/results/`+student.department.id;
   
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStudentList(data)  
      })
      .catch((err) => console.log(err));

      
  };

  const handleActiveProcess = (e) =>{
    const formData = new FormData();
    formData.append("process", "DEPARTMENT_REPRESENTATIVE");
    
    const queryParams = new URLSearchParams(formData).toString();
    const url = `https://iyte-election.azurewebsites.net/processes/starting-process?${queryParams}`;
  
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 204) {
          // Handle 204 No Content response
          return Promise.resolve(null);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data !== null) {
          // Handle successful response
          setIsActive(true);
        } else {
          // Handle 204 No Content response
          setIsActive(false);
        }
      })
      .catch((err) => console.log(err));

  }

  const handlePastProcess = (e) =>{
    const formData = new FormData();
    formData.append("process", "DEPARTMENT_REPRESENTATIVE");
    
    const queryParams = new URLSearchParams(formData).toString();
    const url = `https://iyte-election.azurewebsites.net/processes/started-process?${queryParams}`;
  
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 204) {
          // Handle 204 No Content response
          return Promise.resolve(null);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data !== null) {
          // Handle successful response
          setIsFinished(true);
        } else {
          // Handle 204 No Content response
          setIsFinished(false);
        }
      })
      .catch((err) => console.log(err));
    

  }
  
  useEffect(() => {
    refreshPosts();
    handleActiveProcess();
    handlePastProcess();

  }, [student]);

  if(!isActive && !isFinished){

      return(
          <div >
            <p>There are no election results yet, please follow the announcements.</p>
          </div>
      );

  }else{

      if (error) {
        return <div>Error!..</div>;
      } else if (!isLoaded) {
        return (
          <Box sx={{ marginTop:"30%", display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        );
      } else {
        return (
            <div className="" style={{display:"flex !important",justifyContent:"center !important"}}>
                
                
              <div fixed="true" className="announcement">
                {studentList.map((candidate) => (
                  <Candidate numberOfVotes={candidate.numberOfVotes} isFinished={isFinished} type="election-result" student={candidate.candidate} userId={userId}/>
                ))}
              </div>
            </div>
            
        );
      }

  }

  
}

export default ElectionResult;