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

  const handleEdit = () => {
    setIsEditing(true);
    // Perform edit logic here
  };

  const handleDelete = () => {
    // Perform delete logic here
    console.log(`Deleting announcement with ID: ${announcementId}`);
  };

  return (
    <Card className="announcement-card" id={announcementId} sx={{ marginTop: 15 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={Img} alt="green iguana" />
        <CardContent>
          {isEditing ? (
            <TextField value={title} onChange={(e) => console.log(e.target.value)}  id="outlined-basic" label="Title" variant="outlined" sx={{width: "70%",marginBottom:5}} />
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          )}
          {isEditing ? (
            <TextField value={description} onChange={(e) => console.log(e.target.value)} id="outlined-basic" label="Description" variant="outlined" sx={{width: "70%", marginBottom:5}} />
            
          ) : (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
          <div className="buttons">
            {isEditing ? (
              <Button onClick={() => setIsEditing(false)}>Save</Button>
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