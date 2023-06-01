import { useCallback } from "react";
import { filterDataAsync, setPointCount } from "../store/slices/dataSlice";

interface UseEpsilonProps {
  selectedTagsState: string[];
  valueType: string[];
  data: any[];
  dispatch: Function;
}

export const useEpsilon = ({
  selectedTagsState,
  valueType,
  data,
  dispatch,
}: UseEpsilonProps) => {
  const handleEpsilonChange = useCallback(
    (event) => {
      const newPointCountValue = parseFloat(event.target.value);
      dispatch(setPointCount(newPointCountValue));

      dispatch(
        filterDataAsync({
          selectedTags: selectedTagsState,
          valueType: valueType,
          pointCount: newPointCountValue,
          data,
        })
      );
    },
    [dispatch, selectedTagsState, valueType, data]
  );

  return {
    handleEpsilonChange,
  };
};
