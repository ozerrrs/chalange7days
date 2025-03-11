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
        height: "600px",
        width: "700px",
        position: "absolute",

        backgroundColor: "white",
      }}
    ></Paper>
  );
};

export default FirstPage;
