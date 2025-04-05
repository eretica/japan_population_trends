import { useState } from "react";

export const useIndexPage = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);

  return {
    selectedPrefectures,
    setSelectedPrefectures,
  };
};
