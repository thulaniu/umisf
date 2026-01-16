import React, { useState } from "react";
import styles from "./developers.module.css";
import HeaderPage from "../HeaderPage/HeaderPage";
import Footer from "../HomePage/Footer/footer";
import { LinkedinOutlined, GithubOutlined, FacebookOutlined } from "@ant-design/icons";

function DevelopersPage() {
  const [developers, setDevelopers] = useState([
    {
      name: "Nethmi Jayakody",
      working_place: "Trainee Software Engineer@ WealthOS",
      image: "nethmi.JPG",
      position: "Team Lead| Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/nethmi-jayakody/",
      facebook: "https://web.facebook.com/nethmi.jayakody.52",
      github: "neth99-coder",
    },
    {
      name: "Supun Dasanayaka",
      working_place: "Trainee Software Engineer@ Insighture",
      image: "supun.jpeg",
      position: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/supun-dhananjaya/",
      facebook: "https://web.facebook.com/supun.dhananjaya.5817",
      github: "SupunDhananjaya",
    },
    {
      name: "Harshani Bandara",
      working_place: "Trainee Software Engineer@ Dialog Axiata",
      image: "harshani.jpeg",
      position: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/harshanibandara/",
      facebook: "https://web.facebook.com/harshani.bandara.1232",
      github: "HarshaniBandara",
    },
    {
      name: "Vinul Fernando",
      working_place: "Trainee Software Engineer@ GTN",
      image: "vinul.jpg",
      position: "Frontend Developer",
      linkedin: "https://www.linkedin.com/in/vinul-fernando-1239761a0/",
      facebook: "https://web.facebook.com/vinul.fernando.7",
      github: "Vinuhans",
    },
    {
      name: "Kumuthu Athukorala",
      working_place: "Trainee Software Engineer@ Codegen",
      image: "kumuthu.jpeg",
      position: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/kumuthu-athukorala/",
      facebook: "https://web.facebook.com/kumuthu.athukorala",
      github: "KumuthuA",
    },
    {
      name: "Yasira Punsith",
      working_place: "CSE Undergraduate@ UOM",
      image: "yasira.jpg",
      position: "Frontend Developer",
      linkedin: "https://www.linkedin.com/in/yasira-punsith-839121266/",
      facebook: "https://web.facebook.com/profile.php?id=100006817725111",
      github: "yasira2000",
    },
    {
      name: "Sahani Dissanayake",
      working_place: "Business Science Undergraduate@ UOM",
      image: "sahani.jpeg",
      position: "Content Writer",
      linkedin: "",
      facebook: "",
      github: "https://www.facebook.com/himshi.dissz",
    },
    {
      name: "Poorna Cooray",
      working_place: "Trainee Software Engineer@ H2O.ai",
      image: "poorna.jpg",
      position: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/poorna-cooray-64430721b/",
      facebook: "https://web.facebook.com/prn.savindi",
      github: "poornaSavindi",
    },
  ]);
  return (
    <div>
      <HeaderPage />

      <div className={`${styles["developer-container"]}`}>
        <div className={`${styles["developer-title"]}`}>
          MEET OUR CREATIVE <br />
          DEVELOPERS
        </div>
      </div>

      <div className={`${styles["developers-all"]}`}>
        <p>
          Introducing to you all, the talented and creative individuals who brought this website to
          life and ensured it's seamless functionality. From design and layout to the coding and
          implementation, they have poured their passion, skill and expertise into every aspect of
          this project, resulting in a website that we are all proud of.
        </p>
        <div className={`${styles["developers"]}`}>
          {developers.map((developer, index) => (
            <div className={`${styles["developer"]}`}>
              <img src={require(`../../assests/images/developers/${developer.image}`)} />
              <div className={`${styles["overlay"]}`}>
                <a href={`${developer.linkedin}`} target="_blank">
                  <img
                    src={require(`../../assests/images/linkedin.png`)}
                  />
                </a>
                <a className={`${styles["github"]}`} href={`https://github.com/${developer.github}`} target="_blank">
                  <img src={require(`../../assests/images/github.png`)} />
                </a>
                <a href={`${developer.facebook}`} target="_blank">
                  <img
                    src={require(`../../assests/images/facebook.png`)}
                  />
                </a>
              </div>
              <div className={`${styles["details"]}`}>
                <p style={{ fontWeight: "bold" }}>{developer.name}</p>
                <p>{developer.working_place}</p>
                <p>{developer.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default DevelopersPage;
