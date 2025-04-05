import {
  ChangeEvent,
  InputHTMLAttributes,
  PropsWithChildren,
  useCallback,
} from "react";
import styles from "./Radio.module.scss";

type Props<T> = {
  value: T;
  onChangeValue?: (value: T) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const Radio = <T,>({
  id,
  onChangeValue,
  value,
  onChange,
  children,
  ...rest
}: PropsWithChildren<Props<T>>) => {
  return (
    <label htmlFor={id} className={styles.container}>
      <input
        type="radio"
        id={id}
        value={value}
        {...rest}
        onChange={useCallback(
          (e: ChangeEvent<HTMLInputElement>) => {
            onChangeValue?.(value);
            onChange?.(e);
          },
          [onChange, onChangeValue, value],
        )}
      />
      {children}
    </label>
  );
};
