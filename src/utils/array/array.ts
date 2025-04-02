export const range = (start: number, end: number) => {
  if (start > end) {
    throw new Error("指定した範囲が不正です");
  }

  return Array.from(Array(1 + end - start).keys()).map((v) => start + v);
};
