import React, { useState, useEffect } from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import BasicTable from "./BasicTable";
import axios from "axios";

const ContentManager = () => {
  const [rowsPublic, setRowsPublic] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/blog/public-requested", {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        setRowsPublic(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    }

    fetchData();
  }, [token]);

  return (
    <Container
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        marginTop: "5rem",
      }}
    >
      <Box>
        <Typography variant="h4">Content Manager</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      ></Box>
      <Box sx={{ marginTop: "50px" }}>
        <BasicTable rows={rowsPublic} />
      </Box>
    </Container>
  );
};

export default ContentManager;
