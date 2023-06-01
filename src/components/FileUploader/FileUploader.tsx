import React, { ChangeEvent, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import Papa from "papaparse";
import useSound from "use-sound";
import boopSound from "../../assets/boop.mp3";
import closeOpenSound from "../../assets/close-open.mp3";
import { setLoading } from "../../store/slices/dataSlice";

interface FileUploaderProps {
  onFileParsed: (data: any[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileParsed }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [playUploadSound] = useSound(boopSound, { volume: 0.1 });
  const [playChangeSound] = useSound(closeOpenSound, {
    playbackRate: 4,
    volume: 0.1,
  });

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      dispatch(setLoading(true));

      const dataBuffer: any[] = [];

      Papa.parse(file, {
        header: true,
        step: (results) => dataBuffer.push(results.data),
        complete: () => {
          onFileParsed(dataBuffer);
          dispatch(setLoading(false));
        },
      });

      playChangeSound();
    },
    [dispatch, onFileParsed, playChangeSound]
  );

  const handleButtonClick = useCallback(() => {
    playUploadSound();
    fileInputRef.current?.click();
  }, [playUploadSound]);

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
      />
      <button type="button" onClick={handleButtonClick}>
        Загрузить CSV
      </button>
    </>
  );
};
