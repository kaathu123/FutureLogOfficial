import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Card,
} from "@mui/material";
import Featured from "../featured/Featued";

const SearchBar = ({ setSearchQuery }) => {
  const [districtData, setDistrictData] = useState([]);
  const [placeData, setPlaceData] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [collegeData, setCollegeData] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);


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

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchColleges = () => {
    axios
      .get(`http://localhost:5000/College`)
      .then((response) => {
        setCollegeData(response.data.colleges);
        setFilteredColleges(response.data.colleges);
      })
      .catch((error) => {
        console.error("Error fetching college data:", error);
      });
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    if (districtId) {
      fetchPlaces(districtId);
    }
  }, [districtId]);

  useEffect(() => {
    filterColleges();
}, [districtId, placeId, collegeData]);

  const filterColleges = () => {
    let filtered = collegeData;

    if (districtId) {
      filtered = filtered.filter(
        (college) => college.districtId === districtId
      );
    }

    if (placeId) {
      filtered = filtered.filter((college) => college.placeId === placeId);
    }

    setFilteredColleges(filtered);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "50px",
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
            setPlaceId(""); // Reset place when district changes
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
          onChange={(e) => setPlaceId(e.target.value)}
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
  );
};

export default SearchBar;
