import { createLazyFileRoute } from "@tanstack/react-router";
import { useIndexPage } from "@/routes/-hooks/index.page.hooks.ts";
import { PrefectureCheckboxContainer } from "@/routes/-components/PrefectureCheckbox";
import { PopulationCompositionPerYearGraphContainer } from "@/routes/-components/PopulationCompositionPerYearGraph";

export const Route = createLazyFileRoute("/")({
  component: IndexLazy,
});

function IndexLazy() {
  const { selectedPrefectures, setSelectedPrefectures } = useIndexPage();

  return (
    <>
      <PrefectureCheckboxContainer
        values={selectedPrefectures}
        onChange={(values) => {
          setSelectedPrefectures(values);
        }}
      />

      {!!selectedPrefectures.length && (
        <PopulationCompositionPerYearGraphContainer
          prefCodes={selectedPrefectures}
        />
      )}
    </>
  );
}
