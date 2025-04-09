import React from "react";
import { Paper, Chip, Typography, useTheme, Tooltip } from "@mui/material";
import { dateToPosition } from "src/utils";

const TimelineItem = ({ item, minDate, maxDate, timelineWidth, minItemWidth }) => {
  const theme = useTheme();
  const startPos = dateToPosition(item.start, minDate, maxDate, timelineWidth);
  const endPos = dateToPosition(item.end, minDate, maxDate, timelineWidth);
  const width = endPos - startPos;
  const displayText = item.name;

  return (
    <Tooltip
      title={
        <>
          <Typography variant="subtitle2">{item.name}</Typography>
          <Typography variant="caption">
            {new Date(item.start).toISOString().split("T")[0]} -{" "}
            {new Date(item.end).toISOString().split("T")[0]}
          </Typography>
        </>
      }
      arrow
    >
      <Chip sx={{
          position: "absolute",
          left: startPos,
          width: width < minItemWidth ? minItemWidth : width,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          borderRadius: 5,
          transition: "transform 0.5s, box-shadow 0.5s",
          overflow: "hidden",
          whiteSpace: "nowrap",
          px: 1,
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
        }}
        label={displayText}
       />

    </Tooltip>
  );
};

export default TimelineItem;
