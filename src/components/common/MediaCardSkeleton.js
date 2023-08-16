import React from "react";
import Skeleton from "@mui/material/Skeleton";
const MediaCardSkeleton = () => {
  return (
    <div>
      <Skeleton sx={{background:'gray',borderRadius:'8px',height:'150px'}} variant="rectangular"  />
    </div>
  );
};

export default MediaCardSkeleton;
