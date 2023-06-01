import { motion } from "framer-motion";
import styles from "./Loader.module.scss";

export function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
}
