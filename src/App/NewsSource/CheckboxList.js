import React from "react";
import styles from "./CheckboxList.module.css";

export const CheckboxList = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.checkboxes}>
        {props.items.map((item) => (
          <Checkbox
            key={item.value}
            {...item}
            checked={
              Array.isArray(props.value)
                ? props.value.find((v) => v === item.value)
                : props.value === item.value
            }
            onClick={() => props.onChange(item.value)}
          />
        ))}
      </div>
    </div>
  );
};
const Checkbox = (props) => {
  return (
    <div>
      <label onClick={props.onClick}>
        <input
          type="checkbox"
          className={styles.input}
          checked={props.checked}
        />
        {props.title}
      </label>
    </div>
  );
};
