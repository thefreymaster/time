import { Box, Text, useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";
import { useDeviceSize } from "./useDeviceSize";

function generateClockTicks(width: number, height: number) {
  const perimeter = 2 * (width + height);
  const segmentLength = perimeter / 60;
  const positions = [];

  for (let i = 0; i < 60; i++) {
    const currentDistance = i * segmentLength;
    let x, y;

    if (currentDistance <= width) {
      // Top edge
      x = currentDistance;
      y = 0;
    } else if (currentDistance <= width + height) {
      // Right edge
      x = width;
      y = currentDistance - width;
    } else if (currentDistance <= 2 * width + height) {
      // Bottom edge
      x = width - (currentDistance - (width + height));
      y = height;
    } else {
      // Left edge
      x = 0;
      y = height - (currentDistance - (2 * width + height));
    }

    positions.push({ x, y });
  }

  return positions;
}

const Cell = ({
  x,
  y,
  index,
  second,
}: {
  x: number;
  y: number;
  index: number;
  second: number;
}) => {
  return (
    <Box
      position="absolute"
      left={x}
      top={y}
      height="10px"
      width="10px"
      borderRadius={100}
      opacity={index <= second ? 1 : index / 1000}
      transition="opacity 500ms ease-in-out"
      backgroundColor={"gray.50"}
      margin="10"
    />
  );
};

function App() {
  const theme = useTheme();
  const { isMobile } = useDeviceSize();

  const rowsWidth = window.innerWidth;
  const rowsHeight = window.innerHeight;

  const ticks = generateClockTicks(rowsWidth - 100, rowsHeight - 110);
  const [second, setSecond] = useState(new Date().getSeconds());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(new Date().getSeconds());
    }, 1000);

    if (new Date().getSeconds() === 0) {
      setMinute(new Date().getMinutes());
    }

    if (new Date().getMinutes() === 0) {
      setHour(new Date().getHours());
    }

    return () => clearInterval(interval);
  }, [second]);

  const getBackground = () => {
    if (hour < 5) {
      return `linear-gradient(black, ${theme.colors.gray["900"]})`;
    }
    if (hour > 5 && hour < 8) {
      return `linear-gradient(${theme.colors.red["900"]}, #0f0303)`;
    }
    if (hour > 8 && hour < 16) {
      return `linear-gradient(${theme.colors.blue["200"]}, ${theme.colors.blue["900"]})`;
    }
    if (hour > 16 && hour < 18) {
      return `linear-gradient(${theme.colors.blue["900"]}, #091423)`;
    }

    return `linear-gradient(black, ${theme.colors.gray["900"]})`;
  };

  const ampm = hour >= 12 ? "PM" : "AM";

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      background={getBackground()}
      className="background"
    >
      {ticks.map(({ x, y }: { x: number; y: number }, i) => (
        <Cell x={x} y={y} index={i} second={second} />
      ))}
      <Text
        fontFamily="Montserrat"
        fontWeight={100}
        fontSize={isMobile ? "4em" : "20em"}
        color="white"
        display="flex"
      >
        {hour > 12 ? hour - 12 : hour}
        <Box
          transition="opacity 250ms ease-in-out"
          opacity={second % 2 ? 1 : 0}
        >
          :
        </Box>
        {minute < 10 ? `0${minute}` : minute}
        <Box
          color="gray.100"
          fontWeight="medium"
          position="absolute"
          fontSize="8xl"
        >
          {ampm}
        </Box>
      </Text>
    </Box>
  );
}

export default App;
