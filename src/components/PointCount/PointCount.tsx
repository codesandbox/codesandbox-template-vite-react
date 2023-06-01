import styles from "./PointCount.module.scss";

interface PointCountProps {
  pointCount: number;
  handleEpsilonChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PointCount: React.FC<PointCountProps> = ({
  pointCount,
  handleEpsilonChange,
}) => {
  return (
    <div className={styles["epsilon-container"]}>
      <h2>Число точек: </h2>

      <input
        type="text"
        value={pointCount}
        onChange={handleEpsilonChange}
        placeholder="Enter epsilon value"
        className={styles["epsilon-input"]}
      />
    </div>
  );
};
