import styles from "./Tags.module.scss";

interface TagsProps {
  allTags: string[];
  selectedTagsState: string[];
  handleTagChange: (tag: string) => void;
  isFiltering: boolean;
}

export const Tags: React.FC<TagsProps> = ({
  allTags,
  selectedTagsState,
  handleTagChange,
}) => {
  return (
    <div className={styles["tag-container"]}>
      {allTags.map((tag) => (
        <div
          key={tag}
          className={`${styles.tag} ${
            selectedTagsState.includes(tag) ? styles["tag--selected"] : ""
          }`}
          onClick={() => handleTagChange(tag)}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};
