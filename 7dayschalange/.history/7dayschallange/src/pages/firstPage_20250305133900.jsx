import { Page, Paper } from "@mui/material";
import React from "react";

const FirstPage = () => {
  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "censter",
          height: "1000px",
          background: "white",
        }}
      ></Paper>
    </div>
  );
};

export default FirstPage;
