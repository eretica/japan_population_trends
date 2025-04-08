import { useState } from "react";

export const useRootPage = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);

  return {
    selectedPrefectures,
    setSelectedPrefectures,
  };
};
