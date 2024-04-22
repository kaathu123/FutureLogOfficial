import React from "react";
import {
  Box,
  Button,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CollegeList = () => {
  const [collegeData, setCollege] = useState([]);

  const [districtData, setDistrictData] = useState([]);
  const [placeData, setPlaceData] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [placeId, setPlaceId] = useState("");

  const fetchDistricts = () => {
    axios
      .get(`http://localhost:5000/District`)
      .then((response) => {
        console.log(response.data.districts);
        setDistrictData(response.data.districts);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const fetchPlaces = (districtId) => {
    axios
      .get(`http://localhost:5000/Place/${districtId}`)
      .then((response) => {
        console.log(response.data.places);
        setPlaceData(response.data.places);
      })
      .catch((error) => {
        console.error("Error fetching place data:", error);
      });
  };

  const fetchCollege = () => {
    axios
      .get(`http://localhost:5000/College`)
      .then((response) => {
        console.log(response.data.colleges);
        setCollege(response.data.colleges);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const fetchCollegeByPlace = (Id) => {
    axios
      .get(`http://localhost:5000/fetchCollegeByPlace/${Id}`)
      .then((response) => {
        console.log(response.data.colleges);
        setCollege(response.data.colleges);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  useEffect(() => {
    fetchCollege();
    fetchDistricts();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "50px",
          m:5,
          gap:3
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="district-label">District</InputLabel>
          <Select
            labelId="district-label"
            id="district-select"
            label="District"
            value={districtId}
            sx={{ borderRadius: "50px" }}
            onChange={(e) => {
              setDistrictId(e.target.value);
              fetchPlaces(e.target.value);
            }}
          >
            {districtData.map((district) => (
              <MenuItem key={district._id} value={district._id}>
                {district.districtname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="place-label">Place</InputLabel>
          <Select
            labelId="place-label"
            id="place-select"
            label="Place"
            value={placeId}
            sx={{ borderRadius: "50px" }}
            onChange={(e) => {
              setPlaceId(e.target.value, fetchCollegeByPlace(e.target.value));
            }}
            disabled={!districtId}
          >
            {placeData.map((place) => (
              <MenuItem key={place._id} value={place._id}>
                {place.placename}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div className="featured-container">
        {collegeData &&
          collegeData.map((college, key) => (
            <Card key={key} className="featured-card">
              <CardMedia
                component="img"
                image={college.photo}
                alt="College Image"
                className="featured-image"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {college.collegename}
                </Typography>
              </CardContent>
              <div className="view-button">
                <Link to={`/User/courseView/${college._id}`}>
                  <Button variant="contained" color="primary">
                    View
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
      </div>
    </>
  );
};

export default CollegeList;
