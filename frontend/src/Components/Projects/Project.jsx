import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useSelector } from "react-redux";

const Project = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div id="work">
      <h2>WORK</h2>
      <section>
        <article>
          <Carousel
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            interval={2000}
            infiniteLoop={true}
            autoPlay={true}
          >
            {user && user.projects ? (
              user.projects.map((i) => (
                <div key={i.title} className="workItem">
                  <img src={i.image.url} alt={i.title} />
                  <aside>
                    <h3>{i.title}</h3>
                    <p>{i.description}</p>
                    <a target={"blank"} href={i.url}>
                      View Demo
                    </a>
                  </aside>
                </div>
              ))
            ) : (
              <p>No projects available.</p>
            )}
          </Carousel>
        </article>
      </section>
    </div>
  );
};

export default Project;
