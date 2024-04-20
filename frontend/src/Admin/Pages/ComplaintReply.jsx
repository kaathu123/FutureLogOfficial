import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
const ComplaintReply= () => {
  let { id } = useParams();
  
  const [reply, setReply] = useState("");
  const handleSubmit = () => {

   console.log('hello');
    const postData = {
      reply,
      id 
    };
    axios
    .post("http://localhost:5000/complaintreply", postData)
    .then((response) => {
      console.log(response.data);
      setReply("");
    })
    .catch((error) => {
      console.error("Error sending POST request:", error);
    });
  }

    
  return (
    
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: 250,
          width: 450,
          justifyContent: "center",
          px: 5,
        }}
       
      >
        <Box>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
          <Typography variant="h4" sx={{ m: 4 }}>
          Complaint Reply
        </Typography>
          <TextField id="standard-basic" label="Complaint" variant="standard"             
          onChange={(event)=>setReply(event.target.value)}

          />
          <Button onClick={handleSubmit} variant="contained" >Send</Button>
          </Stack>
        </Box>
      </Card>
     
    </Box>
  );
            
};
export default ComplaintReply;
