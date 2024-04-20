import React, { useEffect, useState } from "react";
import { Box, Card, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from 'axios';
import { Link } from "react-router-dom";

const ViewComplaint= () => {
  const [complaintData, setComplaintData] = useState([]);

  const fetchComplaint = () => {
    axios.get(`http://localhost:5000/complaint`)
      .then((response) => {
        setComplaintData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching  data:', error);
      });
  }

  useEffect(() => {
   fetchComplaint();
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <Card sx={{ width: 800, display: 'flex', justifyContent: 'center', px: 5 }}>
        <Box>
          <Typography variant="h4" sx={{ m: 4 }}>
            View Complaint
          </Typography>
        </Box>
      </Card>
      <TableContainer component={Paper} sx={{ m: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell align="center">User name</TableCell>

              <TableCell align="right">Complaint</TableCell>
              <TableCell align="right">Actions</TableCell>
             
    
            </TableRow>
          </TableHead>
          <TableBody>
            {complaintData && complaintData.map((complaint, key) => (
              <TableRow key={key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{key + 1}</TableCell>
                {/* <TableCell align="center">{collegecourse.coursename}</TableCell> */}
              
                <TableCell align="center">
                  {complaint.content }
               
                </TableCell>
                <TableCell>
                {complaint.userId.username}
                </TableCell>

                <TableCell>
                <Link
                     to={`/admin/ComplaintReply/${complaint._id}`}
                     style={{ textDecoration: 'none' }}
                  >
                     <li>
                        {/* <PersonOutlineIcon className='icon' /> */}
                        <span>Reply</span>
                     </li>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewComplaint;
