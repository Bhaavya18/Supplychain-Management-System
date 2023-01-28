import styles from "./Navbar.module.css";
export function Navbar({ businessName }) {
    return (
      <div className={styles.homeBar}>
        <p>{businessName}</p>
        <button>Logout</button>
      </div>
    );
}