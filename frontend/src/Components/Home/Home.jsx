import React, { Fragment, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { BsArrowUpRight, BsChevronDown } from "react-icons/bs";
import me from "../../Assets/logo.png";
import Project from "../Projects/Project";
import Skills from "../Skills/Services";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Home = ({ ratio }) => {
 

  const [menuOpen, setMenuOpen] = useState(false);
  const projectCount = useRef(null);

  const animationProjectsCount = () => {
    animate(0, 500, {
      duration: 1,
      onUpdate: (v) => (projectCount.current.textContent = v.toFixed()),
    });
  };

  const animations = {
    h1: {
      initial: {
        x: "-100%",
        opacity: 0,
      },
      whileInView: {
        x: 0,
        opacity: 1,
      },
    },
    button: {
      initial: {
        y: "-100%",
        opacity: 0,
      },
      whileInView: {
        y: 0,
        opacity: 1,
      },
    },
  };
  return (
    <Fragment>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <div id="home">
      <section>
        <div>
          <motion.h1 {...animations.h1}>
            Hi, I Am <br /> Pankaj Kholiya
          </motion.h1>

          <Typewriter
            options={{
              strings: ["A Developer", "Software Engineer", "A Creator", "Code Tinkerer"],
              autoStart: true,
              loop: true,
              cursor: "",
              wrapperClassName: "typewriterpara",
            }}
          />

          <div>
            <a href="mailto:ifeelpankaj@gmail.com">Hire Me</a>
            <a href="#work">
              Projects <BsArrowUpRight />
            </a>
          </div>

       

          <aside>
            <article>
              <p>
                +
                {ratio < 2 && (
                  <motion.span
                    ref={projectCount}
                    whileInView={animationProjectsCount}
                  >
                    500
                  </motion.span>
                )}
              </p>
              <span>Projects Done</span>
            </article>

            <article data-special>
              <p>Contact</p>
              <span>ifeelpankaj@gmail.com</span>
            </article>
          </aside>
        </div>
      </section>
      <section>
        <img src={me} alt="Abhishek" />
      </section>
      <BsChevronDown />
    </div>
    <div>
        <Project/>
    </div>
    <div>
        <Skills/>
    </div>
<div>
  <Contact/>
</div>
<div>
  <Footer/>
</div>
    </Fragment>
  );
};

export default Home;
