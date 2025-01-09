"use client";
import DominoCard from "@/components/dominocard";
import React, { useState } from "react";

const initialDominoData = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [2, 1],
  [2, 2],
];


const Home = () => {
  const [dominoData, setDominoData] = useState(initialDominoData);
  const [totalToRemove, setTotalToRemove] = useState<number | "">("");
  const doubleNumbers = (dominos: number[][]): number => {
    let res: number =0
    dominos.forEach((item) => {
      if (item[0] === item[1]) {
        res++;
      }
    })
    return res;
  }

  const sortDominoes = (order: "asc" | "desc") => {
    const sorted = [...dominoData].sort((a, b) => {
      const totalA = a[0] + a[1];
      const totalB = b[0] + b[1];
      if (order === "asc")
        return totalA === totalB ? a[0] - b[0] : totalA - totalB;
      else return totalA === totalB ? b[0] - a[0] : totalB - totalA;
    });
    setDominoData(sorted);
  };

  // Fungsi untuk menghapus duplikat
  const removeDuplicates = (dominoData: number[][]): number[][] => {
    const Data = new Set<number>();
    return dominoData.filter((dominoData) => {
      const total = dominoData[0] + dominoData[1];
      if (Data.has(total)) {
        return false;
      }
      Data.add(total);
      return true;
    });
  };

  const handleRemoveDuplicates = () => {
    const newDominoData = removeDuplicates(dominoData);
    setDominoData(newDominoData);
  };

  const flipCards = () => {
    const flippedData = dominoData.map(([top, bottom]) => [bottom, top]);
    setDominoData(flippedData);
  };

  const handleRemoveByTotal = () => {
    if (totalToRemove === "") return;

    const updatedValues = dominoData.filter(
      (item) => item[0] + item[1] !== Number(totalToRemove)
    );
    setDominoData(updatedValues);
  };

  const resetData = () => {
    setDominoData(initialDominoData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-700">
        Domino Manipulation
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {dominoData.map(([top, bottom], idx) => (
          <DominoCard key={idx} top={top} bottom={bottom} />
        ))}
      </div>

      <div className="text-center mb-4">
        <p className="text-lg">Double numbers count: {doubleNumbers(dominoData)}</p>
      </div>

      <div className="mt-6 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-4 mb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Data Manipulations
        </h2>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">Source:</p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            {JSON.stringify(dominoData, null, 2)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={handleRemoveDuplicates}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-md"
        >
          Remove Duplicates
        </button>
        <button
          onClick={flipCards}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 shadow-md"
        >
          Flip Cards
        </button>
        <button
          onClick={() => sortDominoes("asc")}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-md"
        >
          Sort Ascending
        </button>
        <button
          onClick={() => sortDominoes("desc")}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-md"
        >
          Sort Descending
        </button>
        <button
          onClick={resetData}
          className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 shadow-md"
        >
          Reset Data
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <input
          type="number"
          value={totalToRemove}
          min={0}
          onChange={(e) =>
            setTotalToRemove(e.target.value ? Number(e.target.value) : "")
          }
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          placeholder="Input Total to Remove"
        />
        <button
          onClick={handleRemoveByTotal}
          className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 shadow-md"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Home;
