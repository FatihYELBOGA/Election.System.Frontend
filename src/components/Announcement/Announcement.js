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
        <Card sx={{ width: 700 , marginTop: 15}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={Img}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );

}
export default Announcement;