import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

function AnnouncementForm(props) {
  const { userId } = props;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeStartDate = (e) => {
    setStartDate(e.target.value.replace("/", ","));
  };

  const handleChangeFinishDate = (e) => {
    setEndDate(e.target.value.replace("/", ","));
  };

  const handleSubmitAnnouncement = (e) => {
    e.preventDefault();
    fetch("https://iyte-election.azurewebsites.net/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        administrationId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setStartDate('');
    setEndDate('');
    setTitle('');
    setDescription('');
  };

  return (
    <Card className='announcement-card' sx={{ marginTop: 15, display: "flex", justifyContent: "center" }}>
      <CardActionArea>
        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: 5 }}>
          Add New Announcement
        </Typography>
        <CardContent sx={{ display: "block", justifyContent: "center" }}>
          <form>
            <TextField
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              sx={{ width: "70%", marginBottom: 5 }}
            />
            <TextField
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              sx={{ width: "70%", marginBottom: 5 }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <div style={{ marginTop: 20 }}>
              <Button
                onClick={handleSubmitAnnouncement}
                sx={{ width: "30%", backgroundColor: '#B61815' }}
                variant="contained"
              >
                POST
              </Button>
            </div>
          </form>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default AnnouncementForm;