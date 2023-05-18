import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Img from '../../iyte_logo.jpg'


function Announcement(props){
    const {announcementId, title, description} = props; 

    return (
      <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      );

}
export default Announcement;