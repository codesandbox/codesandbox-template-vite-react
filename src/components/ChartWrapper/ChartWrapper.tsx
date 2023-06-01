import React from "react";
import { Loader, Chart } from "../";

interface ChartWrapperProps {
  isLoading: boolean;
  selectedTags: string[];
  filteredData: any[];
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  isLoading,
  selectedTags,
  filteredData,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (selectedTags?.length > 0 && filteredData.length > 0) {
    return <Chart data={filteredData} />;
  }

  return null;
};
