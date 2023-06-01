import { useMemo } from "react";
import CsvLogo from "../../assets/csv.png";
import { Loader, CsvActions, FileUploader } from "../";

export const UploadWrapper = ({ isLoading, csvData, setCsvData }: any) => {
  const ContentComponent = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (csvData?.length) {
      return <CsvActions csvLogo={CsvLogo} setCsvData={setCsvData} />;
    }

    return <FileUploader onFileParsed={setCsvData} />;
  }, [csvData, setCsvData]);

  return ContentComponent;
};
