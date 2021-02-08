import * as React from "react"
import Svg, { G,Path } from "react-native-svg"

function ReactangleBackground(props) {
  return (
    <Svg
    {...props}
      data-name="Group 83"
      xmlns="http://www.w3.org/2000/svg"
      width={414}
      height={896}
      viewBox="0 0 414 896"
    >
      <G data-name="Rectangle 107" fill="#fff">
        <Path stroke="none" d="M0 0h414v896H0z" />
        <Path fill="none" d="M.5.5h413v895H.5z" />
      </G>
      <Path
        data-name="Path 553"
        d="M0 0v500.342l414-269.586V0z"
        fill="#0059d4"
      />
    </Svg>
  )
}

export default ReactangleBackground