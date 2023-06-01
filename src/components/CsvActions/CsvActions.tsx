import React from "react";
import { useDispatch } from "react-redux";
import useSound from "use-sound";
import removeSound from "../../assets/remove.mp3";
import { removeCsv } from "../../store/slices/dataSlice";

interface CsvActionsProps {
  csvLogo: string;
  setCsvData: any;
}

export const CsvActions: React.FC<CsvActionsProps> = ({
  csvLogo,
  setCsvData,
}) => {
  const dispatch = useDispatch();
  const [playRemoveSound] = useSound(removeSound, {
    volume: 0.1,
  });

  const onRemoveCsv = () => {
    playRemoveSound();
    setCsvData([]);
    dispatch(removeCsv());
  };

  return (
    <div className="csv-actions">
      <img src={csvLogo} alt="csv logo" />
      <button onClick={onRemoveCsv}>Удалить</button>
    </div>
  );
};
