import React from "react";
import { Box } from "@mui/material";
import TimelineItem from "src/components/TimelineItem";

const TimelineLane = ({ lane, minDate, maxDate, timelineWidth, minItemWidth }) => (
  <Box
    sx={{
      position: "relative",
      height: 50,
      mb: 2,
      borderBottom: "1px dashed #ccc",
      "&:last-child": { borderBottom: "none" },
      width: "100%",
    }}
  >
    {lane.map((item, itemIndex) => (
      <TimelineItem
        key={itemIndex}
        item={item}
        minDate={minDate}
        maxDate={maxDate}
        timelineWidth={timelineWidth}
        minItemWidth={minItemWidth}
      />
    ))}
  </Box>
);

export default TimelineLane;
