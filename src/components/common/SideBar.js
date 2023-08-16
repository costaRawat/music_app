import { Box, Typography } from "@mui/material";
import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Box display="flex" flexDirection="column" gap="2rem">
        {" "}
        <Typography
          variant="h4"
          className="white__color__typo__500 cursor__pointer"
        >
          Home
        </Typography>
        <Typography
          variant="h4"
          className="white__color__typo__500 cursor__pointer"
        >
          Discover
        </Typography>
        <Typography
          variant="h4"
          className="white__color__typo__500 cursor__pointer"
        >
          Radio
        </Typography>
        <Typography
          variant="h4"
          className="white__color__typo__500 cursor__pointer"
        >
          For you
        </Typography>
      </Box>
    </div>
  );
};

export default SideBar;
