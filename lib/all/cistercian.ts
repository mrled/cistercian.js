/* Return a decimal place in an integer.
 * num:   An integer
 * power: The decimal place to return
 *
 * Example:
 * getDigit(6789, 0) => 9
 * getDigit(6789, 1) => 8
 * getDigit(6789, 2) => 7
 * getDigit(6789, 3) => 6
 *
 * <https://stackoverflow.com/questions/13955738/javascript-get-the-second-digit-from-a-number>
 */
export function getDigit(num: number, power: number) {
  return Math.floor((num / Math.pow(10, power)) % 10);
}

/* Convert a 1-4 digit decimal number to an array of
 * [thousands, hundreds, tens, ones], also called KHTU.
 */
export function khtu(num: number) {
  if (num < 0 || num > 9999) {
    throw "khtu only supports numbers between 0-9999 (inclusive)";
  }
  return [
    getDigit(num, 3),
    getDigit(num, 2),
    getDigit(num, 1),
    getDigit(num, 0),
  ];
}

/* We use the FRBCistercian font, which uses the Private Use Area of Unicode.
 * To get the right glyph, we have to map to this area.
 * See the codepoints at
 * <https://github.com/ctrlcctrlv/FRBCistercian/blob/main/codepoints.tsv>
 */
export function number2cistercian(num: number) {
  const digits = khtu(num);
  let result: number[] = [0x100002];
  if (digits[0] > 0) {
    result.push(0x10001e + digits[0] - 1);
  }
  if (digits[1] > 0) {
    result.push(0x100015 + digits[1] - 1);
  }
  if (digits[2] > 0) {
    result.push(0x10000c + digits[2] - 1);
  }
  if (digits[3] > 0) {
    // We do not subtract 1 because there is a zero,
    // but there is no "zero ten " / "zero hundred" / "zero thousand".
    result.push(0x100002 + digits[3]);
  }

  console.log(
    `number2cistercian(${num}): ${result.map((char) => char.toString(16))}`
  );

  return String.fromCodePoint(...result);
}
