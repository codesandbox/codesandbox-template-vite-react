import { useSelector } from "react-redux";

export const useAppState = () => {
  const { isLoading, selectedTags, filteredData, valueType } = useSelector(
    (state) => state.data
  );
  return { isLoading, selectedTags, filteredData, valueType };
};
