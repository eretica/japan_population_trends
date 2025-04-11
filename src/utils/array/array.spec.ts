import { range } from "./array";

describe("range", () => {
  it("指定した範囲で配列が作成されること", () => {
    expect(range(2, 5)).toStrictEqual([2, 3, 4, 5]);
  });

  it("値が同じ場合は指定した値1つのみ作成されること", () => {
    expect(range(8, 8)).toStrictEqual([8]);
  });

  it("範囲が逆転している場合は例外が投げられること", () => {
    expect(() => range(4, 3)).toThrow("指定した範囲が不正です");
    expect(() => range(5, 2)).toThrow("指定した範囲が不正です");
  });
});
