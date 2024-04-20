import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";
import "./alert.css";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [userProof, setUserProof] = useState(null);
  const [PlaceId, setPlaceId] = useState("");
  const [DistrictId, setDistrictId] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [userPhotoName, setUserPhotoName] = useState("");
  const [userPhotoSize, setUserPhotoSize] = useState(0);
  const [userProofName, setUserProofName] = useState("");
  const [userProofSize, setUserProofSize] = useState(0);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!phone.trim()) errors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(phone.trim())) errors.phone = "Phone number must be 10 digits";
    if (!address.trim()) errors.address = "Address is required";
    if (!pincode.trim()) errors.pincode = "PinCode is required";
    else if (!/^\d{6}$/.test(pincode.trim())) errors.pincode = "PIN code must be 6 digits";
    if (!password.trim()) errors.password = "Password is required";
    else if (password.trim().length < 8) errors.password = "Password must be at least 8 characters long";
  
    setErrors(errors); // Update the state with the errors
    return Object.keys(errors).length === 0; // Return true if there are no errors
  }

  const fetchPlace = (Id) => {
    axios
      .get(`http://localhost:5000/Place/${Id}`)
      .then((response) => {
        console.log(response.data.places);
        setPlaceData(response.data.places);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  };

  const fetchDistrict = () => {
    axios
      .get("http://localhost:5000/District")
      .then((response) => {
        console.log(response.data.districts);
        setDistrictData(response.data.districts);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    setUserPhoto(file);
    setErrors((prevErrors) => ({ ...prevErrors, userPhoto: "" }));
    if (file) {
      setUserPhotoName(file.name);
      setUserPhotoSize(file.size);
    } else {
      setUserPhotoName("");
      setUserPhotoSize(0);
    }
  };

  const handleProofSelect = (event) => {
    const file = event.target.files[0];
    setUserProof(file);
    setErrors((prevErrors) => ({ ...prevErrors, userProof: "" }));
    if (file) {
      setUserProofName(file.name);
      setUserProofSize(file.size);
    } else {
      setUserProofName("");
      setUserPhotoSize(0);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = validateForm(); // Validate other form fields
    const photoError = validateFile(userPhoto, userPhotoSize); // Validate photo file
    const proofError = validateFile(userProof, userProofSize); // Validate proof file

    if (isFormValid && !photoError && !proofError) {
      const formData = new FormData();
      formData.append("username", name);
      formData.append("useremail", email);
      formData.append("userphone", phone);
      formData.append("userpassword", password);
      formData.append("useraddress", address);
      formData.append("userpincode", pincode);
      formData.append("userPhoto", userPhoto);
      formData.append("userProof", userProof);
      formData.append("placeId", PlaceId);
      axios
        .post("http://localhost:5000/User", formData)
        .then((response) => {
          console.log("goo fast", response.data);
          setName("");
          setEmail("");
          setPassword("");
          setAddress("");
          setPhone("");
          setPincode("");
          setUserPhoto(null);
          setUserProof(null);
          setPlaceId("");
          setDistrictId("");
          fetchPlace(DistrictId);
          fetchDistrict();
          alert("You have Successfully Registered.")
        })
        .catch((error) => {
          console.error("Error sending POST request:", error);
        });
    }
  };

  const validateFile = (file, size) => {
    const allowedTypes = ["image/jpeg", "image/png"]; // Add allowed file types
    const maxSize = 5 * 1024 * 1024; // 5MB, adjust as needed

    if (!file) {
      return "File is required";
    }

    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type. Please upload a JPEG or PNG file.";
    }

    if (size > maxSize) {
      return "File size exceeds the limit. Please upload a file smaller than 5MB.";
    }

    return ""; // No error
  };

  return (
    <Box
      sx={{
        Height: "5vh",
        display: "flex",
        height: "40%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "url('https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
        filter: "blur(0.5px)",
        borderRadius: "10px",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          maxWidth: 600,
          padding: 4,
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Add box shadow
          backgroundColor: "#ffff", // Set background color
          border: "5px solid white",
          borderRadius: "30px",
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box>
          <Typography variant="h3" sx={{ m: 4 }}>
            User Registration
          </Typography>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
            <TextField
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
              error={!!errors.name}
              helperText={errors.name && errors.name}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
              error={!!errors.email}
              helperText={errors.email && errors.email}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Phone Number"
              multiline
              maxRows={4}
              onChange={(event) => setPhone(event.target.value)}
              error={!!errors.phone}
              helperText={errors.phone && errors.phone}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              multiline
              maxRows={4}
              onChange={(event) => setAddress(event.target.value)}
              error={!!errors.address}
              helperText={errors.address && errors.address}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="PinCode"
              multiline
              maxRows={4}
              onChange={(event) => setPincode(event.target.value)}
              error={!!errors.pincode}
              helperText={errors.pincode && errors.pincode}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              error={!!errors.password}
              helperText={errors.password && errors.password}
            />
            <Button
              className="Photo"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Photo
              <VisuallyHiddenInput type="file" onChange={handlePhotoSelect} />
            </Button>
            {userPhotoName && (
              <Typography variant="body1">
                Photo: {userPhotoName} ({userPhotoSize} bytes)
              </Typography>
            )}
            <Button
              className="Proof"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Proof
              <VisuallyHiddenInput type="file" onChange={handleProofSelect} />
            </Button>
            <Typography variant="body2" color="textSecondary">
              Supported formats: JPEG, PNG
            </Typography>
            {userProofName && (
              <Typography variant="body1">
                Proof: {userProofName} ({userProofSize} bytes)
              </Typography>
            )}
            <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">District</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="category"
                  // onChange={handleChange}
                  onChange={(event) => {
                    setDistrictId(event.target.value);
                    fetchPlace(event.target.value);
                  }}
                  value={DistrictId}
                >
                  {/* //view list of details */}
                  {districtData.map((district, key) => (
                    <MenuItem key={key} value={district._id}>
                      {district.districtname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{" "}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Place</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="category"
                  // onChange={handleChange}
                  onChange={(event) => setPlaceId(event.target.value)}
                  value={PlaceId}
                >
                  {/* //view list of details */}
                  {placeData.map((place, key) => (
                    <MenuItem key={key} value={place._id}>
                      {place.placename} ({place.districtId.districtname})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" type="submit">
                Save
              </Button>
              {/* Conditionally render the alert */}
             
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};
export default User;
