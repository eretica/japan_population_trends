import styles from "./Skeleton.module.scss";

type Props = {
  width: number | string;
  height: number | string;
};

export const Skeleton = ({ width, height }: Props) => {
  return (
    <div
      style={{
        width,
        height,
      }}
      className={styles.skeleton}
    />
  );
};
