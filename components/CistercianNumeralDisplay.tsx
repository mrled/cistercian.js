import { number2cistercian } from "lib/all/cistercian";

type CistercianNumeralDisplayProps = {
  num: number;
};
export default function CistercianNumeralDisplay({
  num,
}: CistercianNumeralDisplayProps) {
  if (isNaN(num)) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <p>Enter a number</p>
      </div>
    );
  } else {
    const cistercian = number2cistercian(num);
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <p className="text-2xl text-gray-400">
          The number <span className="text-bold text-black">{num}</span> in
          Cistercian notation:
        </p>
        <p className="py-8 text-9xl font-cistercian items-center">
          {cistercian}
        </p>
      </div>
    );
  }
}
