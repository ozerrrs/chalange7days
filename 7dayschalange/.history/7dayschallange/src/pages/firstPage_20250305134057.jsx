import { Paper } from "@mui/material";
import React from "react";

const FirstPage = () => {
  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          backgroundColor: "white",
        }}
      ></Paper>
    </div>
  );
};

export default FirstPage;
