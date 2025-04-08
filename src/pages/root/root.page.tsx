import { useRootPage } from "./root.page.hooks.ts";
import { PrefectureCheckboxContainer } from "./components/PrefectureCheckbox";
import { PopulationCompositionPerYearGraphContainer } from "./components/PopulationCompositionPerYearGraph";
import styles from "./root.page.module.scss";
import { Suspense } from "react";

export const RootPage = () => {
  const { selectedPrefectures, setSelectedPrefectures } = useRootPage();

  return (
    <div className={styles.container}>
      <Suspense
        fallback={
          <div className={styles.fallbackContainer}>
            <img className={styles.fallbackLogo} alt="logo" src={"/logo.svg"} />
            <div>...loading</div>
          </div>
        }
      >
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
      </Suspense>

      {!!selectedPrefectures.length && (
        <PopulationCompositionPerYearGraphContainer
          prefCodes={selectedPrefectures}
        />
      )}
    </div>
  );
};
