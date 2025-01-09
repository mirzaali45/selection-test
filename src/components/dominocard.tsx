import React from "react";

type DominoCardProps = {
  top: number;
  bottom: number;
};

const DotPositions: Record<1 | 2 | 3 | 4 | 5 | 6, number[]> = {
  1: [5],
  2: [3, 7],
  3: [3, 5, 7],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

const DominoCard: React.FC<DominoCardProps> = ({ top, bottom }) => {
  const renderDots = (number: number) => {
    const positions = DotPositions[number as 1 | 2 | 3 | 4 | 5 | 6] || [];
    return (
      <div className="grid grid-cols-3 grid-rows-3 w-20 h-20   rounded-lg shadow-md  p-2">
        {[...Array(9)].map((_, idx) => (
          <div
            key={idx}
            className={`w-4 h-4 flex items-center justify-center mx-auto ${
              positions.includes(idx + 1) ? "bg-black rounded-full" : ""
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="">
      <div
        className="flex flex-col items-center
      border-2 border-gray-400 bg-white"
      >
        {/* Upper half of the domino */}
        {renderDots(top)}
        {/* Divider line */}
        <div className="h-1 w-full bg-gray-400"></div>
        {/* Lower half of the domino */}
        {renderDots(bottom)}
      </div>
    </div>
  );
};

export default DominoCard;
