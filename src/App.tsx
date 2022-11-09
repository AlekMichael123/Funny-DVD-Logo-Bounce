/**
 * @author Alek Michael
 * @brief A funny DVD logo that bounces around the screen using TypeScript and React.JS
 */

import { useState, useEffect, useRef } from "react";
import useWindowDimensions from "./hooks/useWindowDimensions";
import cursed from "./images/cursed.png";

export default function App() {
   const { height, width } = useWindowDimensions();
   const eleDimension = 200;

   const [left, setLeft] = useState(
      Math.floor(Math.random() * (width - eleDimension))
   );
   const [top, setTop] = useState(
      Math.floor(Math.random() * (height - eleDimension))
   );

   const [leftDiff, setLeftDiff] = useState(Math.random() > 0.5 ? 1 : -1);
   const [topDiff, setTopDiff] = useState(-leftDiff);

   const squareRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const interval = setInterval(() => {
         setLeft(left + leftDiff);
         setTop(top + topDiff);

         if (top <= 0) setTopDiff(1);
         else if (top + eleDimension >= height) setTopDiff(-1);

         if (left <= 0) setLeftDiff(1);
         else if (left + eleDimension >= width) setLeftDiff(-1);
      }, 5);
      return () => clearInterval(interval);
   }, [top, left]);

   return (
      <div
         className="square"
         ref={squareRef}
         style={{
            width: eleDimension + "px",
            height: eleDimension + "px",
            backgroundColor: "white",
            position: "absolute",
            left: left + "px",
            top: top + "px",
            backgroundImage: `url(${cursed})`,
         }}
      />
   );
}
