import { Box, Text, useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";
import { useDeviceSize } from "./useDeviceSize";
import NumberFlow from "@number-flow/react";

const Cell = ({
  // x,
  // y,
  index,
  second,
}: {
  // x: number;
  // y: number;
  index: number;
  second: number;
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

const gradientsByHour: Record<number, string> = {
  // Late night
  0: `linear-gradient(#0a0a0f, #000)`,
  1: `linear-gradient(#0a0a10, #000)`,
  2: `linear-gradient(#0a0a12, #000)`,
  3: `linear-gradient(#0b0b14, #000)`,
  4: `linear-gradient(#0c0c16, #000)`,

  // Early dawn (5–7)
  5: `linear-gradient(#2c1a33, #140a16)`,
  6: `linear-gradient(#80304d, #2c0f13)`,
  7: `linear-gradient(#dd5e65, #a94b00)`,

  // Morning (8–11)
  8: `linear-gradient(${theme.colors.blue["100"]}, ${theme.colors.blue["300"]})`,
  9: `linear-gradient(${theme.colors.blue["100"]}, ${theme.colors.blue["400"]})`,
  10: `linear-gradient(${theme.colors.blue["200"]}, ${theme.colors.blue["500"]})`,
  11: `linear-gradient(${theme.colors.blue["200"]}, ${theme.colors.blue["600"]})`,

  // Afternoon (12–15)
  12: `linear-gradient(${theme.colors.blue["200"]}, ${theme.colors.blue["600"]})`,
  13: `linear-gradient(${theme.colors.blue["200"]}, ${theme.colors.blue["700"]})`,
  14: `linear-gradient(${theme.colors.blue["300"]}, ${theme.colors.blue["700"]})`,
  15: `linear-gradient(${theme.colors.blue["300"]}, ${theme.colors.blue["800"]})`,

  // Late afternoon → golden hour (16–17)
  16: `linear-gradient(#f7b267, #1f3b5f)`,
  17: `linear-gradient(#ff9e5e, #2b2d42)`,

  // Sunset (18–19)
  18: `linear-gradient(#dd5e65, #1b1b2f)`,
  19: `linear-gradient(#a73737, #3c1053)`,

  // Twilight (20–21)
  20: `linear-gradient(#1a1a2e, #16213e)`,
  21: `linear-gradient(#10101a, #0d0d12)`,

  // Night (22–23)
  22: `linear-gradient(#0a0a12, #000)`,
  23: `linear-gradient(#0a0a10, #000)`,
};

const getBackground = (hour: number) => {
  return gradientsByHour[hour] ?? gradientsByHour[0];
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
      background={getBackground(hour)}
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
        {/* @ts-ignore */}
        {topBottom.map((cell, i) => (
          <Cell index={i} second={second} />
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
          {/* @ts-ignore */}
          {leftRight.map((cell, i) => (
            <Cell index={leftRight.length + 50 - 1 - i} second={second} />
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
              <NumberFlow value={hour > 12 ? hour - 12 : hour} />
              <Box
                transition="opacity 250ms ease-in-out"
                opacity={second % 2 ? 1 : 0}
              >
                :
              </Box>
              <NumberFlow prefix={minute < 10 ? `0` : ''} value={minute} />
              {/* <Box>{minute < 10 ? `0${minute}` : minute}</Box> */}
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
          {/* @ts-ignore */}
          {leftRight.map((cell, i) => (
            <Cell index={i + 20} second={second} />
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
        {/* @ts-ignore */}
        {topBottom.map((cell, i) => (
          <Cell index={topBottom.length + 30 - 1 - i} second={second} />
        ))}
      </Box>
    </Box>
  );
}

export default App;
