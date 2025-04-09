import React, { useEffect, useMemo, useState, useRef } from "react";
import { Box, Slider } from "@mui/material";
import { getDateRange } from "src/utils";
import assignLanes from "src/assignLanes";
import timelineItems from "src/timelineItems";
import TimelineHeader from "src/components/TimelineHeader";
import TimelineLane from "src/components/TimelineLane";

function generateTicks(minDate, maxDate, timelineWidth, count = 5) {
  const ticks = [];
  const totalDuration = maxDate - minDate;
  for (let i = 0; i <= count; i++) {
    const tickDate = new Date(minDate.getTime() + (totalDuration * i) / count);
    const position = (timelineWidth * i) / count;
    ticks.push({ tickDate, position });
  }
  return ticks;
}

const Timeline = () => {
  const divRef = useRef(null);
  const minItemWidth = 75;
  const defaultTimelineValue = minItemWidth * 30;
  const [timelineWidth, setTimelineWidth] = useState(defaultTimelineValue);
  const [minWidth, setMinWidth] = useState(defaultTimelineValue);
  const minSlider = minWidth - minItemWidth - 35;

  const { lanes, minDate, maxDate } = useMemo(() => {
    const lanesComputed = assignLanes(timelineItems);
    const { minDate, maxDate } = getDateRange(timelineItems);
    return { lanes: lanesComputed, minDate, maxDate };
  }, [timelineItems]);

  const ticks = useMemo(
    () => generateTicks(minDate, maxDate, timelineWidth, 5),
    [minDate, maxDate, timelineWidth]
  );

  useEffect(() => {
    if (divRef.current) {
      const { width } = divRef.current.getBoundingClientRect();
      setMinWidth(width);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 10,
        }}
      >
        Zoom {Number(timelineWidth / minSlider).toFixed(2)}x{" "}
        <Slider
          defaultValue={defaultTimelineValue}
          min={minSlider}
          max={10000}
          onChange={(e) => {
            setTimelineWidth(e.target.value);
          }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 10,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            overflowX: "auto",
            background: "#fafafa",
          }}
          ref={divRef}
        >
          <Box sx={{ width: timelineWidth + minItemWidth }}>
            <TimelineHeader ticks={ticks} timelineWidth={timelineWidth} />
            {lanes.map((lane, laneIndex) => (
              <TimelineLane
                key={laneIndex}
                lane={lane}
                minDate={minDate}
                maxDate={maxDate}
                timelineWidth={timelineWidth}
                minItemWidth={minItemWidth}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Timeline;
