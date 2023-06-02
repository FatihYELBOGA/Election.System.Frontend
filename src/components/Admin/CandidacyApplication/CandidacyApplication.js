import React,{useState,useEffect}from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import DocumentView from './DocumentView';


function CandidacyApplication(props)
{
    const {student} = props;
    const [documents, setDocuments] = useState([]);
    const [isDetailed,setIsDetailed] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);

    const handleDetail = (e) =>{
      
      
        if(documents.length === 0){
          console.log("sfafsaf")
          fetch("https://iyte-election.azurewebsites.net/documents/department-candidacy/"+student.id)
            .then((res) =>
                res.json() )
            .then(
                (result) => {
                    setDocuments(result);
                    console.log(result);
                    setIsLoaded(true);
                },
                (error) => {
                    console.log(error);
                }
            )
        }
        setIsDetailed(true);
        console.log(documents)
        
    };
    const handleCloseDetail = (e) =>{
      setIsDetailed(false);
    }

    const handleSave = (e) => {
     
  
    };
    const handleCancel = (e) => {
      
    }
    if(isDetailed){
        return (
            <Card  id={student.id} sx={{ marginTop: 10,marginBottom:10,width:"51%",marginRight:"15%",marginLeft:"15%"}}>
              <CardActionArea disableTouchRipple disableRipple sx={{cursor:"default"}} >
                <CardContent>
                  <Typography sx={{justifyContent:"center",marginBottom:2}} gutterBottom variant="h5" component="div">
                    {student.firstName+" "+student.lastName}
                  </Typography>
                  <div >
                    {documents.map((document) =>(
                      <DocumentView document={document} studentId={student.id}><div>afsmoaksmfa</div></DocumentView>
                    ))}
                   
                  </div>
                  <div style={{marginTop:10,justifyContent:"space-between",display:"flex"}}>
                  <Button sx={{fontSize:11}} size="small" onClick={handleCloseDetail}>Close</Button>
                  </div>
                 
                </CardContent>
              </CardActionArea>
            </Card>
          );

    }else{
    return (
      <Card  id={student.id} sx={{ marginTop: 10,marginBottom: 10,marginRight:5,marginLeft:5}}>
        <CardActionArea disableTouchRipple disableRipple sx={{cursor:"default"}} >
          <CardContent>
            <Typography sx={{justifyContent:"center",marginBottom:2}} gutterBottom variant="h5" component="div">
              {student.firstName+" "+student.lastName}
            </Typography>
            <Typography sx={{justifyContent:"center",marginBottom:2}} variant="body2" color="text.secondary">
              {student.username}
            </Typography>
            <div style={{marginTop:10,justifyContent:"space-between",display:"flex"}}>
            <Button onClick={handleDetail} sx={{fontSize:11}} size="small">Detail</Button>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
    }
}

export default CandidacyApplication;