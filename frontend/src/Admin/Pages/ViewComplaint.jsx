import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewComplaint = () => {
  const [complaintData, setComplaintData] = useState([]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:5000/complaint");
      setComplaintData(response.data.complaints);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Card sx={{ width: 800, display: "flex", justifyContent: "center", px: 5 }}>
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
              <TableCell align="center">Complaint</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaintData &&
              complaintData.map((complaint, index) => (
                <TableRow key={complaint._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{complaint.content}</TableCell>
                  <TableCell align="center">{complaint.userId.username}</TableCell>
                  <TableCell align="center">
                    <Link to={`/admin/ComplaintReply/${complaint._id}`} style={{ textDecoration: 'none' }}>
                      <span>Reply</span>
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
