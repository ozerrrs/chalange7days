// import { Paper, Box } from "@mui/material";
import React from "react";
import backgroundNav from "../assets/bg-sidebar-desktop.svg";

const FirstPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          height: "600px",
          width: "700px",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      ></Paper>
    </Box>
  );
};

export default FirstPage;
