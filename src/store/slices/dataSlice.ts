import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { processData, transformForRecharts } from "../../helpers";
import { AppDispatch } from "../store";
import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";

type ValueType = "original" | "mean";

interface DataState {
  csvData: any[];
  filteredData: any[];
  selectedTags: string[] | [];
  valueType: ValueType[];
  isLoading: boolean;
  isFiltering: boolean;
  pointCount: number;
}

const initialState: DataState = {
  csvData: [],
  filteredData: [],
  selectedTags: [],
  valueType: ["original"],
  isLoading: false,
  isFiltering: false,
  pointCount: 500,
};

type FilterPayload = {
  selectedTags: string[];
  valueType: ValueType[];
  pointCount: number;
  data: any;
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(filterData.fulfilled, (state, action) => {
      state.filteredData = action.payload;
      state.isFiltering = false;
    });
  },
  reducers: {
    setIsFiltering: (state, action: PayloadAction<boolean>) => {
      state.isFiltering = action.payload;
    },
    removeCsv: (state) => {
      state.csvData = [];
      state.filteredData = [];
      state.selectedTags = [];
      state.valueType = ["original"];
      state.isLoading = false;
      state.pointCount = 1000;
    },
    setCsvData: (state, action: PayloadAction<any[]>) => {
      state.csvData = action.payload;
      state.filteredData = action.payload;
    },
    addCsvData: (state, action: PayloadAction<any>) => {
      state.csvData = [...state.csvData, action.payload];
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    setValueType: (state, action: PayloadAction<ValueType[]>) => {
      state.valueType = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPointCount: (state, action: PayloadAction<number>) => {
      state.pointCount = action.payload;
    },
  },
});

export const filterData = createAsyncThunk(
  "data/filterData",
  async (payload: FilterPayload): Promise<any> => {
    const { selectedTags, pointCount, data } = payload;

    const timeSeries = processData(data, selectedTags, pointCount);

    const rechartsData = transformForRecharts(timeSeries);

    return rechartsData;
  }
);

export const filterDataAsync =
  (payload: FilterPayload) => (dispatch: AppDispatch) => {
    dispatch(setIsFiltering(true));

    setTimeout(() => {
      dispatch(filterData(payload));
      dispatch(setIsFiltering(false));
    }, 0);
  };

export const {
  setCsvData,
  addCsvData,
  setSelectedTags,
  setValueType,
  setLoading,
  removeCsv,
  setIsFiltering,
  setPointCount,
} = dataSlice.actions;

export default dataSlice.reducer;
