import {
  ChangeEvent,
  InputHTMLAttributes,
  PropsWithChildren,
  useCallback,
} from "react";
import styles from "./Checkbox.module.scss";

type Props<T> = {
  value: T;
  onChangeValue?: (value: T) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = <T,>({
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
        type="checkbox"
        id={id}
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
