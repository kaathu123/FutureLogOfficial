import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const PackageListView = () => {
  const {Id} = useParams()
  const [packageListData, setPackageListData] = useState([]);
  const navigate = useNavigate();
  const fetchPackageList = () => {
    axios.get(`http://localhost:5000/Package/${Id}`).then((response) => {
      console.log(response.data.packages);
      setPackageListData(response.data.packages)
    })
    .catch((error) => {
      console.error('Error fetching  data:', error);
    });
  }

  useEffect(() => {
    fetchPackageList();
  }, []);

  const handleViewClick = () => {
    navigate("/User/AgentList");
  };
  const handleRequestClick = (id) => {
    navigate(`/User/RequestPage/${id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {packageListData &&
        packageListData.map((packages, key) => (
          <div key={key} style={{ margin: "10px", flex: "0 0 30%" }}>
            <Card
              sx={{
                width: "100%",
                height: "auto",
                background: "#8B79DD",
                borderRadius: "20px",
              }}
            >
              <Typography
                variant="h5"
                color="textPrimary"
                component="div"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                Our Packages
              </Typography>
              <CardMedia
                sx={{ height: "150px", width: "100%" }}
                component="img"
                src={packages.photo}
                alt="Your image"
              />
              <Box>
                <CardContent>
                  <Typography variant="h4" color="textPrimary" component="div">
                    {packages.packagename}
                  </Typography>
                  <Typography color="textPrimary" component="div">
                    {packages.details}
                  </Typography>
                  <Typography color="textPrimary" component="div">
                    {packages.price}
                  </Typography>
                  <Typography color="textPrimary" component="div">
                    <p>Contact {packages.agencyId.phone}</p>
                  </Typography>
                </CardContent>
              </Box>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
                <Button
                  variant="contained"
                  sx={{
                    background: "#8B79DD",
                    borderColor: "white",
                    color: "red",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                  onClick={handleViewClick}
                >
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "#8B79DD",
                    borderColor: "white",
                    color: "red",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                  onClick={() => handleRequestClick(packages._id)}
                >
                  Request
                </Button>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default PackageListView;
