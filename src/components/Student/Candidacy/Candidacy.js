import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./Candidacy.css"
import Button from '@mui/material/Button';
import Document from './Document';
import DocumentView from './DocumentView';


function Candidacy(props){
    const {userId} = props;
    const [isStart,setIsStart] = useState(false);
    const [isApply,setIsApply] = useState(false);  
    const [isFuture,setIsFuture] = useState(false);
    const [isSent,setIsSent] = useState(false);
    const [documents,setDocuments] = useState([]);
    const [futureProcess,setFutureProcess] = useState("");
    const [startedProcess,setStartedProcess] = useState("");
    const [documentCount,setDocumentCount] = useState(0);
    const [documentTypes,setDocumentTypes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const handleProcessStart = (e) =>{
      fetch("https://iyte-election.azurewebsites.net/processes/started-department-candidacy")
        .then((res) =>
            res.json() )
        .then(
            (result) => {
                setStartedProcess(result);
            },
            (error) => {
                console.log(error);
            }
        )
      if(startedProcess === ""){
        setIsStart(true);
      }else{
        setIsStart(false);
        handleProcessesFuture();
      }

    }

    const handleDocumentTypes = (e) =>{
      
        fetch("https://iyte-election.azurewebsites.net/document-types")
        .then((res) =>
            res.json() )
        .then(
            (result) => {
                setDocumentTypes(result);
            },
            (error) => {
                console.log(error);
            }
        )
    
    }

    const handleProcessesFuture = (e) =>{
      fetch("https://iyte-election.azurewebsites.net/processes/will-start-department-candidacy")
        .then((res) =>
            res.json() )
        .then(
            (result) => {
                setFutureProcess(result);
            },
            (error) => {
                console.log(error);
            }
        )

    }

    const handleControlApply = (e) =>{
      fetch("https://iyte-election.azurewebsites.net/documents/department-candidacy/"+userId)
        .then((res) =>
            res.json() )
        .then(
            (result) => {
                setDocuments(result);
                setIsLoaded(true);
            },
            (error) => {
                console.log(error);
            }
        )
        if(documents.length !== 0){

            setIsApply(true);
            console.log(documents);
            console.log("osmaoapofsmpsa")
        }

    }

    const handleCancel= (e) =>{

    }

    const  handleApply = ()=>{
        if(documentCount===4){
          alert("Success");
          setIsSent(true);
          
        }else{
          alert("Please Fill in the blank")
        }
        
      
    }
    useEffect((e)=>{
        handleDocumentTypes();
        handleControlApply();
    },[documents])
    if(!isLoaded){
      return (
          <Box sx={{ display: 'flex' ,textAlign: 'center',justifyContent:'center'}}>
              <CircularProgress />
          </Box>
      );
  }
  else if(isApply && isLoaded){
    return(<div className='container'>
    <Card  sx={{ marginTop: 15,borderRadius:5,width:"50%",marginLeft:"25%"}}>
    <CardActionArea disableTouchRipple disableRipple sx={{cursor:"default"}} >
      <CardContent>
        <Typography sx={{textAlign:"center"}} gutterBottom variant="h5" component="div">
          Documents for Departmental Representative Candidacy
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{textAlign:"center",marginBottom:2}}>
          Your application has been sent, you can view its status.
        </Typography>
       
        {documents.map((document)=>(
                      <div style={{display:"block",justifyContent:"center"}}>
                        <DocumentView userId={userId} document={document}></DocumentView>
                      </div>
                    )

                    )}
        
      </CardContent>
    </CardActionArea>
  </Card>

</div>);
  }
 //   if(isStart){
    else {
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
                  <br/> 
                  <form>
                    {documentTypes.map((document)=>(
                      <div>
                      <Typography variant="body2" color="text.secondary">
                        {document.replace("_"," ")}
                      </Typography>
                        <Document isSent={isSent} userId={userId} documentCount={documentCount} setDocumentCount={setDocumentCount} documentType={document}></Document>
                      </div>
                    )

                    )}
                
                  <br />
                  <Button onClick={handleApply} sx={{width:"18%", marginLeft: "41%",backgroundColor: "#B61815"}} variant='contained'>APPLY</Button>
                  </form>
                </CardContent>
              </CardActionArea>
            </Card>

          </div>
            
          );
      }

      
    /*}else{
      return(
        <div style={{justifyContent:"center",display:"flex"}}>
        <p>There is not any process</p>
      </div>
      );
      
    }*/
}

export default Candidacy;