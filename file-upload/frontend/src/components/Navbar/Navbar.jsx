import React from "react";
import styles from "./Navbar.module.css";
import { navItems } from "../../constant";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_item_wrapper}>
        {navItems.map((item, idx) => (
          <li key={idx} className={styles.nav__item}>
            <Link to={item.link}>{item.name}</Link>
            <div className={styles.nav__item_underline} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
