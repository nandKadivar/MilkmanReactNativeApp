import React from 'react'
import Svg, {
    G,
    Circle,
    Ellipse,
    Path,
    Rect,
    Text,
    TSpan,
  } from "react-native-svg"

const MilkmanLogo = (props) => {
  return (
      // <></>
        <Svg
        {...props}
      width={200}
      height={99.751}
      viewBox="0 0 224 99.751"
    >
      <G transform="translate(-95 -131)">
        <G
          data-name="Ellipse 44"
          transform="translate(166 131)"
          fill="none"
          stroke="#5f85f1"
          strokeWidth={2}
        >
          <Circle cx={46} cy={46} r={46} stroke="none" />
          <Circle cx={46} cy={46} r={45} />
        </G>
        <Ellipse
          data-name="Ellipse 45"
          cx={42}
          cy={41.5}
          rx={42}
          ry={41.5}
          transform="translate(170 135)"
          fill="#5f85f1"
        />
        <Path
          data-name="Rectangle 98"
          fill="#4753b7"
          d="M199.984 144.152l8.719 6.569-15.602 20.707-8.718-6.57z"
        />
        <Path
          data-name="Rectangle 99"
          fill="#4753b7"
          d="M209.788 151.54l7.629 5.748-15.602 20.707-7.628-5.748z"
        />
        <Path
          data-name="Path 162"
          d="M201.088 143.423l16.935 12.759.22-6.276 1.448-.683-12.633-9.519-.099 1.7z"
          fill="#4753b7"
        />
        <G
          data-name="Rectangle 96"
          transform="translate(95 182)"
          fill="#fff"
          stroke="#5f85f1"
        >
          <Rect width={224} height={43} rx={12} stroke="none" />
          <Rect x={0.5} y={0.5} width={223} height={42} rx={11.5} fill="none" />
        </G>
        <Rect
          data-name="Rectangle 97"
          width={218}
          height={36}
          rx={11}
          transform="translate(98 185)"
          fill="#5f85f1"
        />
        <Path
          data-name="Path 160"
          d="M220.267 148.879s3.858 12.568 1.89 23.364-2.7 7.208-3.6 15.816 8.985 11.166 5.631 21.576c-.952 2.957-3.4 4.522-7.287 4.945-5.466-1.562-19.334-1.279-10.3 2.842 1.866.851-10.3 9.222-7.131 10.631 7.324 3.255 32.692.094 44.245 0 6.07-.048 14.715 2.429 20.821 0 4.094-1.626 12.159 3.444 14.575 2.6 6.576-2.289 27.714-13.6 2.5-14.721 2.944-4.556-7.988-.326-6.946-1.854-5.472-8.665-17.912-1.583-18.894-3.437-5.355-10.11-6.964-4.5-8.179-21.384s-11.521-13.448-13.213-25.426-14.112-14.952-14.112-14.952z"
          fill="#fff"
        />
        <Text
          transform="translate(120 210)"
          fill="#4753b7"
          fontSize={26}
          fontFamily="Cinzel-ExtraBold, Cinzel"
          fontWeight={800}
          letterSpacing=".311em"
        >
          <TSpan x={0} y={0}>
            {"Milkman"}
          </TSpan>
        </Text>
        <Path
          data-name="Path 163"
          d="M199.979 224.494h92.279"
          fill="none"
          stroke="#5f85f1"
        />
      </G>
    </Svg>
    )
}

export default MilkmanLogo
