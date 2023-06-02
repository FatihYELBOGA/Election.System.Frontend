import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import "./Candidacy.css"
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';

function DocumentView(props) {
  const { userId, document } = props;
  const [fileDisplay, setFileDisplay] = useState(null);

  const convertBase64ToFile = (base64String, fileName) => {
    const contentType = 'application/pdf'; // Update the content type as per your file type
    const sliceSize = 1024;
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    const file = new File([blob], fileName, { type: contentType });
    setFileDisplay(file);
  };

  useEffect(() => {
    if (document.file) {
      convertBase64ToFile(document.file.content, document.file.name);
    }
  }, [document]);

  return (
    <div className='' style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
      <Card className='' sx={{ marginBottom: 2, borderRadius: 0, width: "90%",maxWidth:"600px" }}>
        <CardActionArea disableTouchRipple disableRipple sx={{ cursor: "default", justifyContent: "center" }}>
          <CardContent>
        
            <div style={{ marginBottom: 5 ,display:"flex",justifyContent:"center"}}>
             <span style={{marginLeft:"32%",marginTop:8,textAlign:"center"}}> {document.document.replace("_", " ")}</span>
            {(document.controlStatus === "APPROVED") ? 
            
            (<Button disabled={true} sx={{padding:0,marginLeft:"18%"}}><DoneIcon sx={{color:"green",fontSize:"25px"}} /></Button>):
            
            (<Button  sx={{padding:0,marginLeft:"18%"}}><EditIcon sx={{color:"black",fontSize:"25px"}} /></Button>)} 
            
           
            </div>
            <div style={{marginBottom:15}}>
              {fileDisplay && (
                <a href={URL.createObjectURL(fileDisplay)} target="_blank" rel="noopener noreferrer">
                  {fileDisplay.name}
                </a>
              )}
            </div>
            <div style={{ marginLeft:"35%",width:"30%", textAlign: "center",border:"1px solid",borderRadius:5,padding:5 }}>
              {document.controlStatus}
            </div>
            
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default DocumentView;


