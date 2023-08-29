import React from "react";
import { motion } from "framer-motion";

import skills from "../../Assets/skills.json";

const Skills = () => {
  const animations = {
    whileInView: {
      opacity: 1,
      y: 0,
    },
    initial: {
      opacity: 0,
      y: 20,
    },
  };


  return (
    // <div id="services">
    //   <h2>Skills</h2>
    //   <section>
    //     <motion.div
    //       className="serviceBox1"
    //       whileInView={animations.whileInView}
    //     >
    //     <h3>1+</h3>
    //       <p>Years Experience</p>
    //     </motion.div>
    //     {skills.skills.map((skill, index) => (
    //       <motion.div
    //         className="serviceBox"
    //         key={index}
    //         initial={animations[(index + 1) % animations.length].initial}
    //         whileInView={
    //           animations[(index + 1) % animations.length].whileInView
    //         }
    //         transition={{
    //           delay: index * 0.2,
    //         }}
    //       >
    //         <img src={skill.image.url} alt={skill.name} />
    //         <span>{skill.name}</span>
    //       </motion.div>
    //     ))}
    //   </section>
    // </div>
    <div id="services">
    <h2>Skills</h2>
    <section className="skills-section">
      <motion.div
        className="serviceBox1"
        whileInView={animations.whileInView}
        initial={animations.initial}
      >
        <h3>5+</h3>
        <p>Years Experience</p>
      </motion.div>
      {skills.skills.map((skill, index) => (
        <motion.div
          className="serviceBox"
          key={index}
          whileInView={animations.whileInView}
          initial={animations.initial}
          transition={{ delay: index * 0.1 }}
        >
          <img src={skill.image.url} alt={skill.name} />
          <span>{skill.name}</span>
        </motion.div>
      ))}
    </section>
  </div>
//   <div id="services">
//   <h2>Skills</h2>
//   <section className="skills-section">
//     <motion.div className="serviceBox1" whileInView={animations.whileInView}>
//       <h3>5+</h3>
//       <p>Years Experience</p>
//     </motion.div>
//     {skills.skills.map((skill, index) => (
//       <motion.div
//         className="serviceBox"
//         key={index}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.2 }}
//       >
//         <img src={skill.image.url} alt={skill.name} />
//         <span>{skill.name}</span>
//       </motion.div>
//     ))}
//   </section>
// </div>

  );

};

export default Skills;
