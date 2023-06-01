import React from "react";
import useSound from "use-sound";

import styles from "./ValueTypeFilter.module.scss";
import toggleSound from "../../../assets/toggle.mp3";

export type ValueType = ("original" | "mean")[];

export interface ValueTypeFilterProps {
  onValueTypeToggle: (value: "original" | "mean") => void;
  selectedValue: ValueType;
}

  const types: ("original" | "mean")[] = ["original", "mean"];


export const ValueTypeFilter: React.FC<ValueTypeFilterProps> = ({
  onValueTypeToggle,
  selectedValue,
}) => {
  const [playToggleSound] = useSound(toggleSound, {
    volume: 0.1,
  });


  const onClickType = (type: "original" | "mean") => {
    playToggleSound();
    onValueTypeToggle(type);
  };

  return (
    <div className={styles["type-filter"]}>
      {types.map((type) => (
        <button
          key={type}
          className={selectedValue.includes(type) ? "selected" : ""}
          onClick={() => onClickType(type)}
        >
          {type === "original" ? "Исходные" : "Осредненные"}
        </button>
      ))}
    </div>
  );
};
