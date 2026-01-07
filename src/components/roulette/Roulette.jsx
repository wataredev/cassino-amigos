import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Confetti from "react-confetti-boom";
import "./roulette.css";

export default function Roulette({data}) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleSpinClick = () => {
    const newPrize = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
    setShowConfetti(false);
  };

  return (
    <div className="roulette-container w-full h-full flex items-center flex-col justify-center gap-10">

      {showConfetti && (
        <Confetti
          mode="fall"
          particleCount={150}
          spreadDeg={70}
          shapeSize={14}
          launchSpeed={1.2}
          effectCount={1}
          colors={["#FFD700", "#FF6B6B", "#4D96FF", "#6BCF63", "#FFFFFF"]}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      )}

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
              setMustSpin(false);
              setShowConfetti(true);
              setWinner(data[prizeNumber]);
              setShowModal(true);
          }}
      />

      <Button className="gap-2" variant="club" size="club" onClick={handleSpinClick}>
        GIRAR
      </Button>

      <Dialog 
        open={showModal} 
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setShowConfetti(false);
            setWinner(null);
          }
          setShowModal(isOpen);
        }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center">
               Parabéns! 
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300 text-lg mt-2">
              Temos um vencedor!
            </DialogDescription>
          </DialogHeader>
          
          {winner && (
            <div className="flex flex-col items-center gap-6 py-6">
              
              <div className="relative">
                <div className="absolute inset-0 animate-pulse"></div>
                <img
                  src={winner.image?.uri || "https://marketplace.canva.com/Dz63E/MAF4KJDz63E/1/tl/canva-user-icon-MAF4KJDz63E.png"}
                  alt={winner.option}
                  className="relative w-32 h-32 rounded-full border-4 object-cover shadow-2xl"
                />
              </div>

              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">
                  {winner.option}
                </p>
                <p className="text-xl font-semibold">
                  foi o grande vencedor!
                </p>
              </div>

              <Button
                onClick={() => {
                  setShowModal(false);
                  setShowConfetti(false);
                }}
                className="mt-4 font-bold px-8 py-3"
                variant="club" size="club" 
              >
                Fechar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}