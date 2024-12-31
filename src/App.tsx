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
  // x,
  // y,
  index,
  second,
  length,
}: {
  // x: number;
  // y: number;
  index: number;
  second: number;
  length: number;
}) => {
  return (
    <>
      <Box
        display="flex"
        height="10px"
        width="10px"
        borderRadius={100}
        opacity={index <= second ? 1 : index / 1000}
        transition="opacity 500ms ease-in-out"
        backgroundColor={"gray.50"}
        data-test={index}
      />
    </>
  );
};

function App() {
  const theme = useTheme();
  const { isMobile, isPhone, isTablet } = useDeviceSize();

  const rowsWidth = window.innerWidth;
  const rowsHeight = window.innerHeight;

  const ticks = generateClockTicks(rowsWidth - 100, rowsHeight - 110);
  const [second, setSecond] = useState(new Date().getSeconds());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [hour, setHour] = useState(new Date().getHours());

  const getFontSize = () => {
    if (isPhone) return "8em";
    if (isTablet) return "12em";
    return "18em";
  };

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
      return `linear-gradient(${theme.colors.gray["900"]}, black)`;
    }
    if (hour > 5 && hour < 8) {
      return `linear-gradient(#dd5e65, #a94b00)`;
    }
    if (hour > 8 && hour < 16) {
      return `linear-gradient(${theme.colors.blue["200"]}, ${theme.colors.blue["700"]})`;
    }
    if (hour > 16 && hour < 18) {
      return `linear-gradient(rgb(9 23 43), rgb(3 8 14))`;
    }

    return `linear-gradient(black, ${theme.colors.gray["900"]})`;
  };

  const topBottom = Array.from(Array(20));
  const leftRight = Array.from(Array(10));

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
      flexDir="column"
      padding={isMobile ? "20px" : "40px"}
    >
      {/* 0 - 19 */}
      <Box
        display="flex"
        minW="100%"
        flexGrow="grow"
        alignItems="center"
        justifyContent="space-between"
      >
        {topBottom.map((cell, i) => (
          <Cell length={topBottom.length} index={i} second={second} />
        ))}
      </Box>

      {/* ))} */}
      <Box
        height="calc(100vh)"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="row"
      >
        <Box
          display="flex"
          minH="100%"
          flexGrow="grow"
          alignItems="center"
          flexDir="column"
          justifyContent="space-between"
          padding={isMobile ? "30px 0px" : "50px 0px"}
        >
          {/*  50 - 59 */}
          {leftRight.map((cell, i) => (
            <Cell
              length={leftRight.length}
              index={leftRight.length + 50 - 1 - i}
              second={second}
            />
          ))}
        </Box>
        <Box
          height="100%"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
        >
          <Text
            lineHeight={1}
            fontFamily="Lato"
            fontWeight={100}
            color="white"
            display="flex"
            flexDir="column"
            fontSize={getFontSize()}
          >
            <Box display="flex" flexDir="row">
              <Box>{hour > 12 ? hour - 12 : hour}</Box>
              <Box
                transition="opacity 250ms ease-in-out"
                opacity={second % 2 ? 1 : 0}
              >
                :
              </Box>
              <Box>{minute < 10 ? `0${minute}` : minute}</Box>
            </Box>
          </Text>
          <Text
            fontFamily="Lato"
            fontWeight={100}
            color="white"
            display="flex"
            flexDir="column"
            lineHeight={1}
            fontSize={isMobile ? "5xl" : "6xl"}
          >
            <Box fontWeight={200} color="gray.100" fontFamily="Lato">
              {ampm}
            </Box>
          </Text>
        </Box>
        <Box
          display="flex"
          minH="100%"
          flexGrow="grow"
          alignItems="center"
          flexDir="column"
          justifyContent="space-between"
          padding={isMobile ? "30px 0px" : "50px 0px"}
        >
          {/* 20-29 */}
          {leftRight.map((cell, i) => (
            <Cell
              length={leftRight.length + 20}
              index={i + 20}
              second={second}
            />
          ))}
        </Box>
      </Box>
      <Box
        display="flex"
        minW="100%"
        flexGrow="grow"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* 30 - 49 */}
        {topBottom.map((cell, i) => (
          <Cell
            length={leftRight.length + 30}
            index={topBottom.length + 30 - 1 - i}
            second={second}
          />
        ))}
      </Box>
    </Box>
  );
}

export default App;
