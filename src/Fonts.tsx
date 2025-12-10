import { Global } from "@emotion/react";

export const FontFaces = () => (
  <Global
    styles={`
      @font-face {
        font-family: "Inter";
        src: url("/inter.ttf") format("truetype");
        font-weight: 100;
        font-style: normal;
      }
    `}
  />
);