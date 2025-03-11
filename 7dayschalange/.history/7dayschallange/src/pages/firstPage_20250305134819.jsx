import { Paper } from "@mui/material";
import React from "react";

import backgroundNAV from "../assets/bg-sidebar-desktop.svg";

const FirstPage = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",

        top: "50%",
        left: "50%",
        backgroundColor: "white",
        backgroundImage:
      }}
    ></Paper>
  );
};

export default FirstPage;
