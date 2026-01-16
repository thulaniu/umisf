import React, { useEffect, useState } from "react";
import Footer from "../HomePage/Footer/footer";
import Gallery from "../HomePage/Gallery/gallery";
import HeaderPage from "../HeaderPage/HeaderPage";
import styles from "./aboutPage.module.css";

const AboutPage = () => {
  return (
    <div>
      <div className={`${styles["headerDiv1"]}`}>
        <HeaderPage />
        <div className={`${styles["about-container"]}`}>
          <h1>About Us</h1>
        </div>
      </div>
      {/* mission vission section */}
      <section class={`${styles["objectives"]}`}>
        <p>
          University of Moratuwa International Shuttlers’ Fest (UMISF) is the
          annual badminton tournament organized by the badminton team of
          University of Moratuwa in collaboration with the Division of Physical
          Education. The tournament will be held for the 16th time in 2025, on a
          grander scale than ever!
        </p>
        <div class={`${styles["history-row"]}`}>
          <div class={`${styles["objectives-col"]}`}>
            <h3>VISION</h3>
            <p>
              Our vision is to establish a platform for badminton enthusiasts to
              exhibit their talents and encourage a healthy sense of competition
              among players.
            </p>
          </div>
          <div class={`${styles["objectives-col"]}`}>
            <h3>MISSION</h3>
            <p>
              To achieve our vision we aspire to organize a well-managed and
              fair badminton tournament that provides an enjoyable and memorable
              experience for all participants, while promoting fitness and
              sportsmanship.
            </p>
          </div>
          <div class={`${styles["objectives-col"]}`}>
            <h3>TARGETS</h3>
            <p>
              <ul>
                <li>
                  To attract a diverse range of skilled badminton players.
                </li>
                <li>To increase the popularity and awareness of the sport.</li>
                <li>
                  To provide a safe and secure environment for players and
                  spectators.
                </li>
                <li>
                  Timely scheduling of matches and efficient resource
                  management.
                </li>
                <li>
                  To encourage social interaction and networking among
                  participants.
                </li>
                <li>
                  To promote fair play with strict adherence to rules and
                  regulations.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </section>
      <section className={`${styles["past-section"]}`}>
        <h1>
          Our{" "}
          <p
            style={{
              display: "inline-block",
              color: "#0984E3",
              fontFamily: "Hind",
            }}
          >
            History
          </p>
        </h1>
        <p>
          UMISF has been a long-standing event, spanning back to its inception in 2007. The tournament is carried out with the primary intention of providing a platform for badminton players to connect, compete, and hone their skills. Teams from India and Malaysia have participated in UMISF in 2011, marking a milestone in the history of university sports. For over a decade we were able to conduct this tournament successfully with the participation of 1000+ players in most of the years. In 2024, we proudly expanded our horizons by introducing Novices men's badminton championship to the tournament and we're confident that this year's events will be a huge success too.

        </p>
        <div className={`${styles["row"]}`}>
          <div className={`${styles["past-section-col"]}`}>
            <img
              className={`${styles["past-section-img"]}`}
              src={require("../../assests/images/2019.jpeg")}
              alt=""
            ></img>
            <h3>2019</h3>
          </div>
          <div className={`${styles["past-section-col"]}`}>
            <img
              className={`${styles["past-section-img"]}`}
              src={require("../../assests/images/2020.jpeg")}
              alt=""
            ></img>
            <h3>2020</h3>
          </div>
          <div className={`${styles["past-section-col"]}`}>
            <img
              className={`${styles["past-section-img"]}`}
              src={require("../../assests/images/2023.jpg")}
              alt=""
            ></img>
            <h3>2023</h3>
          </div>
          <div className={`${styles["past-section-col"]}`}>
            <img
              className={`${styles["past-section-img"]}`}
              src={require("../../assests/images/2024.jpg")}
              alt=""
            ></img>
            <h3>2024</h3>
          </div>
        </div>
      </section>
      <section className={`${styles["testimonials"]}`}>
        <h1>Messages From The Organizing Committee</h1>
        <p>
          Badminton has always been a popular sport among the undergraduate community of our university. Since the inauguration of this annual tournament in 2007, we have expanded our horizons. It was indeed a success for us to reach the 1000 plus mark in the number of participants. UMiSF is a great platform to showcase the potential of youngsters, university students, and staff members, and with the latest updates on the Open Club Event and School Team Event, it is expanding more than ever before.We wish the participants the best of luck for the tournament and hope everyone will enjoy it.
        </p>
        <div className={`${styles["row"]}`}>
          <div className={`${styles["testimanial-col"]}`}>
            <img
              src={require("../../assests/images/captain-male.png")}
              alt=""
            ></img>
            <div className={`${styles["testimanial-col-content"]}`}>
              <p>
                I believe that UMISF is a great opportunity, especially for
                university as well as school players to flaunt their abilities
                and engage in a friendly rivalry. It is a prestigious event, and
                we are thrilled to hold it this year. We are eagerly counting
                down the days for great tournament filled with lasting
                experiences.
              </p>
              <h3>Tharindu Ambegoda</h3>
              <h6>Captain</h6>
            </div>
          </div>
          <div className={`${styles["testimanial-col"]}`}>
            <img
              src={require("../../assests/images/captain-female.jpg")}
              alt=""
            ></img>
            <div className={`${styles["testimanial-col-content"]}`}>
              <p>
                UMISF is not just about winning, but also about enjoying the
                game and having fun. With the intention of creating an
                atmosphere that fosters healthy competition and mutual respect
                among all players, we encourage all badminton enthusiasts to
                participate in this tournament and take advantage of this
                opportunity.
              </p>
              <h3>Sahani Dissanayake</h3>
              <h6>Captain</h6>
            </div>
          </div>
        </div>
        <div className={`${styles["row"]}`}>
          <div className={`${styles["testimanial-col"]}`}>
            <img
              src={require("../../assests/images/viceCaptain-male.png")}
              alt=""
            ></img>
            <div className={`${styles["testimanial-col-content"]}`}>
              <p>
                UMISF is not just about competition; it’s about passion, sportsmanship, and unforgettable moments on the court. Embrace the challenge, respect your opponents, and enjoy every rally. Whether you play to win or for the love of the game, this tournament is your chance to shine. Join us and make history!
              </p>
              <h3>Vinuga Jayawardana</h3>
              <h6>Vice Captain</h6>
            </div>
          </div>
          <div className={`${styles["testimanial-col"]}`}>
            <img
              src={require("../../assests/images/viceCaptain-female.png")}
              alt=""
            ></img>
            <div className={`${styles["testimanial-col-content"]}`}>
              <p>
                UMISF is where the unexpected happens. New rivalries, new friendships, and moments that stick with you. This is your stage. Step in, play your game, and leave a mark.
              </p>
              <h3>Kavindi Patabendige</h3>
              <h6>Vice Captain</h6>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default AboutPage;
