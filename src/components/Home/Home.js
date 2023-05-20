import React, {useState, useEffect} from "react";
import Announcement from "../Announcement/Announcement";
import './Home.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Home()
{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPosts = () => {
        fetch("http://fatihyelboga-001-site1.atempurl.com/announcements")
        .then((res) =>
            res.json() )
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result);
            },
            (error) => {
                console.log(error);
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    useEffect(() => {
        refreshPosts();
    }, [postList]);

    if(error){
        return <div>Error!..</div>
    } else if(!isLoaded){
        return (
            <Box sx={{ display: 'flex' ,textAlign: 'center',justifyContent:'center'}}>
                <CircularProgress />
            </Box>
        );
    } else {
        return (
            <div className="container">
                <div fixed="true" className="announcement">
                    {postList.map((announcement) => (
                        <Announcement key={announcement.id} announcementId={announcement.id} title={announcement.title} description={announcement.description}></Announcement>
                    ))}
                </div>
            </div>  
        );
    }
}

export default Home;