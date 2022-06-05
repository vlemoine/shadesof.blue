import Color from 'color';

function isGray(color) {
  const c = Color(color);
  const hsv = c.hsv().object();
  const hwb = c.hwb().object();
  const notZero = Math.round(hwb.w) !== 0 && Math.round(hwb.b) !== 0;
  const lowSat = hsv.s <= (100 / 3);
  const wbEqual = Math.abs(Math.round(hwb.w) - Math.round(hwb.b)) <= 3;
  const wbSum = Math.round(hwb.w) + Math.round(hwb.b);
  const mid = hsv.s < 50 && wbSum > 75;
  return (
    notZero &&
    (wbSum >= 90 || (wbSum > 80 && wbEqual) || (lowSat && wbSum > 80) || mid)
  );
}

export default isGray;
