import React from "react";
import styles from "./Navbar.module.css";
import { navItems } from "../../constant";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_item_wrapper}>
        {navItems.map((item, idx) => (
          <li key={idx} className={styles.nav__item}>
            <NavLink
              to={item.link}
              className={({ isActive }) => isActive && styles.active}
            >
              {item.name}
            </NavLink>
            <div className={styles.nav__item_underline} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
