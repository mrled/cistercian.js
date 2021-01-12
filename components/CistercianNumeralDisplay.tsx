import { number2cistercian } from "../lib/cistercian";

type CistercianNumeralDisplayProps = {
  num: number;
};
export default function CistercianNumeralDisplay({
  num,
}: CistercianNumeralDisplayProps) {
  if (isNaN(num)) {
    return (
      <div className="py-8 flex flex-1 flex-col justify-center items-center">
        <p>Enter a number</p>
      </div>
    );
  } else {
    const cistercian = number2cistercian(num);
    return (
      <div className="py-8 flex flex-1 flex-col justify-center items-center">
        <p>
          The number <span className="text-lg text-gray-400">{num}</span> in
          Cistercian notation:
        </p>
        <p className="py-8 text-9xl font-cistercian items-center">
          {cistercian}
        </p>
      </div>
    );
  }
}
