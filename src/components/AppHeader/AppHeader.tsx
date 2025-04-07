import styles from "./AppHeader.module.scss";

export const AppHeader = () => (
  <div className={styles.container}>
    <img className={styles.logo} alt="logo" src={"/logo.svg"} />
    <div className={styles.appTitle}>
      都道府県別の総人口推移グラフを表示するSPA君
    </div>
  </div>
);
