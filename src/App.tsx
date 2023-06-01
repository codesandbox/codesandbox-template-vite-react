import React, { Suspense, useState } from "react";
import "./App.css";
import { useAppState } from "./hooks";
import { Loader } from "./components";

const UploadWrapper = React.lazy(() => import("./components/UploadWrapper"));
const Filters = React.lazy(() => import("./components/Filters"));
const ChartWrapper = React.lazy(() => import("./components/ChartWrapper"));

function App() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const { isLoading, selectedTags, filteredData } = useAppState();

  return (
    <div className="App">
      <div className="app-container">
        <div className="action-panel">
          <Suspense fallback={<Loader />}>
            <UploadWrapper {...{ isLoading, csvData, setCsvData }} />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <Filters data={csvData} />
          </Suspense>
        </div>
        <div className="content">
          <Suspense fallback={<Loader />}>
            <ChartWrapper {...{ isLoading, selectedTags, filteredData }} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
