import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

import './CandidacyApplication.css';
import CandidacyApplication from "./CandidacyApplication";

function CandidacyAppPage(props) {
  const { userId } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentList, setStudentList] = useState([]);

  const refreshPosts = () => {
    fetch("https://iyte-election.azurewebsites.net/documents/students-have-department-candidacy-documents")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setStudentList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPosts();
  }, []);



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
      
        <div style={{width:"auto",justifyContent:"center"}} >
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
            {studentList.map((student) => (
            
              <CandidacyApplication
                key={student.id}
                student={student}
              />
              
            ))}
          </div>
        </div>
      
      
    );
  }
}

export default CandidacyAppPage;