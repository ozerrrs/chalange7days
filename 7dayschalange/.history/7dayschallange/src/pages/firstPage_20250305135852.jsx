// import { Paper, Box } from "@mui/material";
import React from "react";
import backgroundNav from "../assets/bg-sidebar-desktop.svg";
import { Box, Paper } from "@mui/material";

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
          backgroundImage: `url(../assets/bg-sidebar-desktop.svg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "25%",
            backgroundImage: `url(./assets/bg-sidebar-desktop.svg)`,
          }}
        >
          Hello World!
        </Box>
      </Paper>
    </Box>
  );
};

export default FirstPage;
