import { createLazyFileRoute } from "@tanstack/react-router";
import { useIndexPage } from "@/routes/-hooks/index.page.hooks.ts";
import { PrefectureCheckboxContainer } from "./-components/PrefectureCheckbox";
import { PopulationCompositionPerYearGraphContainer } from "./-components/PopulationCompositionPerYearGraph";
import styles from "./-styles/index.module.scss";

export const Route = createLazyFileRoute("/")({
  component: IndexLazy,
});

function IndexLazy() {
  const { selectedPrefectures, setSelectedPrefectures } = useIndexPage();

  return (
    <div className={styles.container}>
      <div className={styles.prefecturesHeading}>都道府県選択</div>
      <PrefectureCheckboxContainer
        values={selectedPrefectures}
        onChange={(values) => {
          setSelectedPrefectures(values);
        }}
      />

      {!selectedPrefectures.length && (
        <div className={styles.hintBox}>
          都道府県を選択するとグラフが表示されます
        </div>
      )}

      {!!selectedPrefectures.length && (
        <PopulationCompositionPerYearGraphContainer
          prefCodes={selectedPrefectures}
        />
      )}
    </div>
  );
}
