import { Paper } from "@mui/material";
import React from "react";

import backgroundNav from "../assets/bg-sidebar-desktop.svg";

const FirstPage = () => {
  return (
    <Paper
      sx={{
        height: "600px",
        width: "700px",
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: "white",
      }}
    ></Paper>
  );
};

export default FirstPage;
