import React from "react";
import { Box, Typography } from "@mui/material";

const TimelineHeader = ({ ticks }) => (
  <Box
    sx={{
      width: "100%",
      background: "#fafafa",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }}
    id="3"
  >
    {ticks.map((tick, index) => (
      <Box key={index}
      >
        <Typography variant="caption">
          {new Date(tick.tickDate).toISOString().split("T")[0]} 
        </Typography>
      </Box>
    ))}
  </Box>
);

export default TimelineHeader;
