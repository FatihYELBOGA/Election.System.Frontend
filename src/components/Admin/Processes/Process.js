import React, {useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import './Process.css';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Process(props){
    const {userId,processId,startDate,endDate,processName} = props;
    const [isEditing,setIsEditing] = useState(false);
    const [editStartDate,setStartDate]= useState(startDate.split("T")[0]);
    const [editEndDate,setEndDate] = useState(endDate.split("T")[0]);

    const [editProcess,setEditProcess] = useState(processName);
    const [processNames,setProcessNames] = useState([]);

    const handleChangeStartDate = (e) => {
        setStartDate(e.target.value);
      };
    
    const handleChangeFinishDate = (e) => {
        setEndDate(e.target.value);
      };
    
    const handleEdit = () => {
        setIsEditing(true);
        // Perform edit logic here
      };
    
    const handleSave = (e) => {
        e.preventDefault();
        fetch("https://iyte-election.azurewebsites.net/processes/"+processId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: processId,
            processType: editProcess,
            startDate: editStartDate,
            endDate: editEndDate,
            administrationId: userId,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log(err));
          setIsEditing(false);
    
    
      };
    const handleCancel = (e) =>{
          setIsEditing(false);
          setEditProcess(processName);
          setStartDate(startDate.split("T")[0]);
          setEndDate(endDate.split("T")[0]);
      };
    const handleDelete = () => {
        fetch("https://iyte-election.azurewebsites.net/processes/"+processId,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id : processId,
          }),
        })
        .then((res) => res.json())
        .then((result) =>{console.log(result)})
        .catch((err) => {
          // Handle any errors
          console.log(err);
        });
      };

    const refreshProcessNames = () => {
        fetch("https://iyte-election.azurewebsites.net/process-types")
        .then((res) =>
            res.json() )
        .then(
            (result) => {
                setProcessNames(result);
            },
            (error) => {
                console.log(error);
            }
        )
    };

    useEffect(() => {
        refreshProcessNames();
    }, [processNames]);

    if(!isEditing){
        return(

            <Card className='process-card' id={processId}  sx={{ marginTop: 8,marginBottom:7,width:"51%"}}>
                <CardActionArea disableTouchRipple disableRipple sx={{cursor:"default"}} >
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {processName.replace("_"," ")}
                  </Typography>
                  <div style={{display:"flex",justifyContent:"center"}}>
                  <div style={{marginRight:60}}>
                    
                    <Typography variant='h6'>
                        {editStartDate}
                    </Typography>
                  </div>
                  <div style={{marginLeft:60}}>
                  <Typography variant='h6'>
                        {editEndDate}
                    </Typography>
                  </div>
                  </div>
                  <div className="buttons" style={{display: "flex",justifyContent:"space-between"}}>
                  <Button onClick={handleEdit}><EditIcon sx={{color:"black",fontSize:"35px",marginLeft:4}} /></Button>
              <Button onClick={handleDelete}><DeleteIcon sx={{color:"black",fontSize:"35px",marginRight:4}}/></Button>
                </div>
                  
                  </CardContent>
                </CardActionArea>
              </Card>
            );

    }
    else{
        return(

            <Card className='process-card'  sx={{ marginTop: 15, display: "flex", justifyContent: "center",borderRadius:5,width:"51%" }}>
        <CardActionArea>
          <CardContent sx={{ display: "block", justifyContent: "center" }}>
            <form>
            <div style={{textAlign:"center",justifyContent:"center",marginTop:20,marginLeft:"15%",width:"100%"}}>
            <Autocomplete
            disablePortal
            onChange={(e,value) => setEditProcess(value)}
            id="combo-box-demo"
            options={processNames}
            value={processName}
            sx={{ width: "70%" }}
            renderInput={(params) => <TextField {...params} label="Process Types" />}
            />
            </div>
            <div style={{  }}>
                <h4 style={{marginBottom:5}}>Start Date</h4>
                <input
                  value={editStartDate}
                  type='date'
                  onChange={handleChangeStartDate}
                  style={{ width: "70%", height: 35,fontSize:18,textAlign:"center" }}
                />
              </div>
              <div style={{  }}>
                <h4 style={{marginBottom:5}}>Finish Date</h4>
                <input

                  value={editEndDate}
                  type='date'
                  onChange={handleChangeFinishDate}
                  style={{ width: "70%", height: 35,fontSize:18,textAlign:"center" }}
                />
              </div>
           
              <div className="buttons" style={{display: "flex",justifyContent:"center",marginTop:30,marginBottom:20}}>
              <Button onClick={handleSave} variant='contained' sx={{width:"30%",marginRight:3,backgroundColor:"#B61815"}}>Save</Button>
              <Button onClick={handleCancel} variant='contained'sx={{width:"30%",marginLeft:3,backgroundColor:"#B61815"}}>Cancel</Button>
              </div>

            </form>

          </CardContent>
        </CardActionArea>
      </Card>
            );
    }

    
   

}
export default Process;