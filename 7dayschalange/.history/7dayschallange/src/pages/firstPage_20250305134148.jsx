import { Paper } from "@mui/material";
import React from "react";

const FirstPage = () => {
  return (
    <div>
      <Paper
        sx={{
          display: "flex",

          height: "100px",
          position: "absolute",
          top: "50%",
          left: "50%",
          backgroundColor: "white",
        }}
      ></Paper>
    </div>
  );
};

export default FirstPage;
