import * as React from 'react';
import Svg, {LinearGradient, Path, Stop, SvgProps} from 'react-native-svg';

export const SunIcon = (props: SvgProps) => (
  <Svg width={100} height={100} viewBox="0 0 48 48" {...props}>
    <LinearGradient
      id="a"
      x1={6.221}
      x2={37.408}
      y1={5.221}
      y2={36.408}
      gradientUnits="userSpaceOnUse">
      <Stop offset={0} stopColor="#fed100" />
      <Stop offset={1} stopColor="#e36001" />
    </LinearGradient>
    <Path
      fill="url(#a)"
      d="M24 4C13.507 4 5 12.507 5 23s8.507 19 19 19 19-8.507 19-19S34.493 4 24 4z"
    />
    <Path
      d="M38.998 23.485c-2.403-4.882-11.494-4.479-13.366 2.137-7.157.25-7.769 12.23-.632 12.107h10.995a18.946 18.946 0 0 0 6.927-13.289c-.724-.664-2.596-1.221-3.924-.955z"
      opacity={0.05}
    />
    <Path
      d="M38.925 23.674c-2.594-4.861-11.378-4.165-13.075 2.081-6.67.22-7.012 11.007-.351 11.064.89.008 7.525 0 11.405 0a18.474 18.474 0 0 0 5.999-12.14c-.846-.731-2.606-1.254-3.978-1.005z"
      opacity={0.07}
    />
    <Path
      d="M38.852 23.863c-2.786-4.841-11.263-3.852-12.783 2.025-6.183.19-6.254 9.968-.069 10.022.923.008 8.491 0 11.815 0a18.344 18.344 0 0 0 5.071-10.99c-.97-.799-2.619-1.289-4.034-1.057z"
      opacity={0.07}
    />
    <LinearGradient
      id="b"
      x1={29.373}
      x2={37.64}
      y1={20.668}
      y2={39.146}
      gradientUnits="userSpaceOnUse">
      <Stop offset={0} stopColor="#fcfcfc" />
      <Stop offset={1} stopColor="#c3c9cd" />
    </LinearGradient>
    <Path
      fill="url(#b)"
      d="M39.5 24c-.245 0-.484.022-.721.053A6.99 6.99 0 0 0 33 21a7 7 0 0 0-6.712 5.021C23.904 26.134 22 28.087 22 30.5a4.5 4.5 0 0 0 4.5 4.5h13a5.5 5.5 0 1 0 0-11z"
    />
  </Svg>
);
