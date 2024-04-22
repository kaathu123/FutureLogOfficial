import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {Link} from 'react-router-dom'


const MyBookings = () => {
    const [courseData, setCourseData] = useState([]);
    const Id = sessionStorage.getItem('uId')
    const fetchMyCourses = () => {
        axios.get(`http://localhost:5000/CourseMyBooking/${Id}`).then((response) => {
             setCourseData(response.data.coursebookings);
          console.log(response.data.coursebookings);
        });
      };

      useEffect(() => {
        fetchMyCourses();
      }, []);
  return (
    <TableContainer component={Paper} sx={{width:800}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SI Number</TableCell>
            <TableCell >Course</TableCell>
            <TableCell >Action</TableCell>
            {/* <TableCell align="right">College Name</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {courseData.map((Course, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>{key + 1}</TableCell>
              <TableCell component="th" scope="row">
                {Course.name}
              </TableCell>
              {
                Course.coursebookingstatus === 1 && <Link to={`/Payment/${Course._id}`}>Pay</Link>
              }
                {
                Course.coursebookingstatus === 2 && 'Rejected'
              }
                 {
                Course.coursebookingstatus === 3 &&' Payement Completed'
              }
              {/* <TableCell align="right">{Course.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MyBookings