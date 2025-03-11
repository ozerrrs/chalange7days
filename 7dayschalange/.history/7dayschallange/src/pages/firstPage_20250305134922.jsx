import { Paper } from "@mui/material";
import React from "react";

import backgroundNav from "../assets/bg-sidebar-desktop.svg";

const FirstPage = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: "white",
        backgroundImage: `url(${backgroundNav})`,
      }}
    ></Paper>
  );
};

export default FirstPage;
