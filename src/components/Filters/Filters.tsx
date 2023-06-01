import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTags, useEpsilon, useAppSelector } from "../../hooks";
import { Loader, Tags, PointCount } from "../";

import { setValueType } from "../../store/slices/dataSlice";
import ValueTypeFilter from "./ValueTypeFilter";
import styles from "./Filters.module.scss";

export interface FiltersProps {
  data: any[];
}

export const Filters: React.FC<FiltersProps> = ({ data }) => {
  if (!data.length) {
    return <></>;
  }
  const dispatch = useDispatch();
  const pointCount = useAppSelector((state) => state.data.pointCount);
  const valueType = useAppSelector((state) => state.data.valueType);
  const isLoading = useAppSelector((state) => state.data.isLoading);
  const isFiltering = useAppSelector((state) => state.data.isFiltering);

  const { allTags, selectedTagsState, handleTagChange } = useTags({
    data,
    valueType,
    pointCount,
    dispatch,
  });

  const { handleEpsilonChange } = useEpsilon({
    selectedTagsState,
    valueType,
    data,
    dispatch,
  });

  const onValueTypeToggle = useCallback(
    (type: "original" | "mean") => {
      const newValueType = valueType.includes(type)
        ? valueType.filter((value) => value !== type)
        : [...valueType, type];

      dispatch(setValueType(newValueType));
    },
    [valueType, dispatch]
  );

  return (
    <div
      className={`${styles["filter-container"]} ${
        isFiltering ? styles["non-clickable"] : ""
      }`}
    >
      {isFiltering && <Loader />}
      <Tags
        allTags={allTags}
        selectedTagsState={selectedTagsState}
        handleTagChange={handleTagChange}
        isFiltering={isFiltering}
      />
      <ValueTypeFilter
        onValueTypeToggle={onValueTypeToggle}
        selectedValue={valueType}
      />
      {Boolean(selectedTagsState.length) && !isLoading && (
        <PointCount
          pointCount={pointCount}
          handleEpsilonChange={handleEpsilonChange}
        />
      )}
    </div>
  );
};
