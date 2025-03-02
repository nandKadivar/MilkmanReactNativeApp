import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function UserLogo(props) {
  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={96}
      height={96}
      viewBox="0 0 96 96"
    >
      <G data-name="Group 85">
        <G data-name="Ellipse 83" fill="none" stroke="#3f3d56" strokeWidth={4}>
          <Circle cx={48} cy={48} r={48} stroke="none" />
          <Circle cx={48} cy={48} r={46} />
        </G>
        <G data-name="user (2)" fill="#3f3d56">
          <Path
            data-name="Path 572"
            d="M48.024 48.926a18.347 18.347 0 0013.407-5.555 18.348 18.348 0 005.554-13.406 18.349 18.349 0 00-5.554-13.406 18.956 18.956 0 00-26.812 0 18.347 18.347 0 00-5.556 13.406 18.347 18.347 0 005.555 13.407 18.353 18.353 0 0013.406 5.554z"
          />
          <Path
            data-name="Path 573"
            d="M81.2 71.539a46.83 46.83 0 00-.638-4.974 39.191 39.191 0 00-1.223-5 24.706 24.706 0 00-2.056-4.664 17.583 17.583 0 00-3.1-4.04 13.669 13.669 0 00-4.453-2.8 15.391 15.391 0 00-5.685-1.029c-.8 0-13.839 6.028-15.526 6.028s-14.721-6.028-15.525-6.028a15.372 15.372 0 00-5.685 1.03 13.658 13.658 0 00-4.454 2.8 17.586 17.586 0 00-3.1 4.04 24.751 24.751 0 00-2.056 4.665 39.284 39.284 0 00-1.223 5 46.513 46.513 0 00-.638 4.976c-.1 1.5-.157 3.068-.157 4.649a13.072 13.072 0 003.882 9.89c2.544 2.421 9.335 6.14 13.43 6.14l18.088 2.638 16.389-5.132a13.976 13.976 0 0010-3.649 13.067 13.067 0 003.883-9.89c0-1.586-.054-3.151-.159-4.65z"
          />
        </G>
      </G>
    </Svg>
  )
}

export default UserLogo