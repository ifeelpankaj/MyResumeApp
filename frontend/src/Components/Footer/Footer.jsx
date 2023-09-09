import React from "react";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineArrowUp,
} from "react-icons/ai";

import me from "../../Assets/logo.jpg"

const Footer = () => {
  return (
    <footer>
      <div>
        <img
          src={me}
          alt="Founder"
        />

        <h2>Pankaj Kholiya</h2>
        <p>Motivation is temporary, but discipline last forever.</p>
      </div>

      <aside>
        <h2>Social Media</h2>

        <article>
          <a href="https://www.linkedin.com/in/ifeelpankaj/" target={"blank"}>
            <AiFillLinkedin />
          </a>
          <a href="https://instagram.com/ifeelpankaj" target={"blank"}>
            <AiFillInstagram />
          </a>
          <a href="https://github.com/Myself-Pankaj" target={"blank"}>
            <AiFillGithub />
          </a>
        </article>
      </aside>
      <a href="#home">
        <AiOutlineArrowUp />
      </a>
    </footer>
  );
};

export default Footer;
