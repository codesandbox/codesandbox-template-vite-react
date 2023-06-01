import { useEffect, useState, useCallback } from "react";
import { filterDataAsync, setSelectedTags } from "../store/slices/dataSlice";
import useSound from "use-sound";
import tagSound from "../assets/tag.mp3";

interface UseTagsProps {
  data: any[];
  valueType: string[];
  pointCount: number;
  dispatch: Function;
}

export const useTags = ({
  data,
  valueType,
  pointCount,
  dispatch,
}: UseTagsProps) => {
  const [playTagSound] = useSound(tagSound, {
    volume: 0.1,
  });
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTagsState, setSelectedTagsState] = useState<string[]>([]);

  const handleTagChange = useCallback(
    (tag) => {
      playTagSound();
      const newSelectedTagsState = selectedTagsState.includes(tag)
        ? selectedTagsState.filter((selectedTag) => selectedTag !== tag)
        : [...selectedTagsState, tag];

      playTagSound();

      setSelectedTagsState(newSelectedTagsState);
      playTagSound();
      dispatch(
        filterDataAsync({
          selectedTags: newSelectedTagsState,
          valueType: valueType,
          pointCount,
          data,
        })
      );
      playTagSound();
    },
    [selectedTagsState, valueType, pointCount, data, dispatch]
  );

  useEffect(() => {
    const newTags = new Set<string>();

    data.forEach((item) => {
      Object.keys(item).forEach((tag) => {
        if (
          (valueType.includes("mean") && tag.endsWith("mean")) ||
          (valueType.includes("original") &&
            !tag.endsWith("mean") &&
            tag.startsWith("tag"))
        ) {
          newTags.add(tag);
        }
      });
    });

    setAllTags(Array.from(newTags));
    setSelectedTagsState([]);
    dispatch(setSelectedTags([]));
  }, [valueType, data, dispatch]);

  useEffect(() => {
    dispatch(setSelectedTags(selectedTagsState));
  }, [selectedTagsState, dispatch]);

  return {
    allTags,
    selectedTagsState,
    handleTagChange,
  };
};
