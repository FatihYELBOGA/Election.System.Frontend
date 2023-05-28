import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import Img from '../../../iyte_logo.jpg';
import './Announcement.css';
import TextField from '@mui/material/TextField';

function Announcement(props) {
  const { announcementId, title, description } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleChangeStartDate = (e) => {
    setStartDate(e.target.value.replace("/", ","));
  };

  const handleChangeFinishDate = (e) => {
    setEndDate(e.target.value.replace("/", ","));
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Perform edit logic here
  };

  const handleSave = () => {
      setIsEditing(false);

  };

  const handleDelete = () => {
    fetch("https://iyte-election.azurewebsites.net/announcements/"+announcementId,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id : announcementId,
      }),
    })
    .then((res) => res.json())
    .then((result) =>{console.log(result)})
    .catch((err) => {
      // Handle any errors
      console.log(err);
    });
    
    console.log(`Deleting announcement with ID: ${announcementId}`);
  };

  return (
    <Card className="announcement-card" id={announcementId} sx={{ marginTop: 15 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={Img} alt="green iguana" />
        <CardContent>
          {isEditing ? (
            <TextField value={editTitle} onChange={(e) => setEditTitle(e.target.value)}  id="outlined-basic" label="Title" variant="outlined" sx={{width: "70%",marginBottom:5}} />
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              {editTitle}
            </Typography>
          )}
          {isEditing ? (
            <TextField value={editDescription} onChange={(e) => setEditDescription(e.target.value)} id="outlined-basic" label="Description" variant="outlined" sx={{width: "70%", marginBottom:5}} />
            
          ) : (
            <Typography variant="body2" color="text.secondary">
              {editDescription}
            </Typography>
          )}
          {isEditing ? (<div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginLeft: '10%' }}>
                <h4>Start Date</h4>
                <input
                  value={startDate}
                  type='date'
                  onChange={handleChangeStartDate}
                  style={{ width: 120, height: 25 }}
                />
              </div>
              <div style={{ marginRight: '10%' }}>
                <h4>Finish Date</h4>
                <input
                  value={endDate}
                  type='date'
                  onChange={handleChangeFinishDate}
                  style={{ width: 120, height: 25 }}
                />
              </div>
            </div>
              ) : (<div></div>)}
          <div className="buttons">
            {isEditing ? (
              <Button onClick={handleSave}>Save</Button>
            ) : (
              <Button onClick={handleEdit}>Edit</Button>
            )}
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Announcement;