import React from "react";
import "./static/nav.css";

export default function Nav() {
  return (
    <div className="title">
      <div className="content-menu">
        <ul className="content-menu__list">
          <li className="content-menu__item active">
            <a className="title content-menu__link" href="#">
              CAROUSEL
            </a>
          </li>
          <li className="content-menu__item">
            <a className="content-menu__link" href="#">
              Charts
            </a>
          </li>
          <li className="content-menu__item">
            <a className="content-menu__link" href="#">
              Genres & Moods
            </a>
          </li>
          <li className="content-menu__item">
            <a className="content-menu__link" href="#">
              Discover
            </a>
          </li>
          <li className="content-menu__item">
            <a className="content-menu__link" href="#">
              Favorites
            </a>
          </li>
          <li className="content-menu__item">
            <a className="content-menu__link" href="#">
              Created By Govind Singh
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
