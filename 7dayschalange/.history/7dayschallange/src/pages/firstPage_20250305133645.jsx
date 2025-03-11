import { Page } from "@mui/material";
import React from "react";

const FirstPage = () => {
  return (
    <div>
      <Page
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      ></Page>
    </div>
  );
};

export default FirstPage;
