import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button } from "../ui/button"
import "./roulette.css";

export default function Roulette({data}) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrize = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
  };

  return (
    <div className="roulette-container w-full h-full flex items-center flex-col justify-center gap-10">
        <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}

            pointerProps={{ className: "custom-pointer" }}
            backgroundColors={["#0B0B0B", "#151515"]}
            textColors={["#FFFFFF"]}

            outerBorderColor="#2F2F2F"
            outerBorderWidth={6}

            radiusLineColor="#2A2A2A"
            radiusLineWidth={2}

            innerBorderColor="#000"
            innerBorderWidth={10}

            spinDuration={0.9}

            onStopSpinning={() => {
                setMustSpin(false)
                alert(`Você ganhou: ${data[prizeNumber].option}`)
            }}
        />

        <Button className="gap-2" variant="club" size="club" onClick={handleSpinClick}>
          GIRAR
        </Button>
    </div>
  );
}
