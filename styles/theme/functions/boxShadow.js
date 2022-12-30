// import rgba from "assets/theme/functions/rgba";
import chroma from 'chroma-js'
// import pxToRem from "assets/theme/functions/pxToRem";

function hexToRgb(color) {
    return chroma(color).rgb().join(", ");
  }

function rgba(color, opacity) {
    return `rgba(${hexToRgb(color)}, ${opacity})`;
  }

function pxToRem(number, baseNumber = 8) {
    return `${number / baseNumber}rem`;
  }
  
//   export default pxToRem;

function boxShadow(offset = [], radius = [], color, opacity, inset = "") {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(
    color,
    opacity
  )}`;
}

export default boxShadow;