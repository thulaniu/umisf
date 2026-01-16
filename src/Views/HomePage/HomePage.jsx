import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import CountDownTimer from "./CountDown/CountDownTimer";
import MeetTeam from "./MeetTeam/MeetTeam";
import Footer from "./Footer/footer";
import Sponsers from "./Sponsers/Sponsers";
import Why from "./why/why";
import Gallery from "./Gallery/gallery";
import Flyer from "./Flyer/flyer";

const HomePage = () => {
  const [starttingDate, setStartingDate] = useState("2023-05-21T08:00:00.000");
  const [finishingDate, setFinishingDate] = useState("2023-05-28T00:00:00.000");

  const [showContent, setShowContent] = useState(false);

  const [venue, setVenue] = useState(["University gymnasium"]);
  const [registrationsDeadlines, setRegistrationsDealines] = useState([
    "2024-01-19",
    "2024-02-15",
  ]);
  const [teamPhoto, setTeamPhoto] = useState("team-image-new.jpeg");

  const [gallery, setGallery] = useState([
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
  ]);

  const [sponsers, setSponsers] = useState([
    "MSLogo.jpeg",
    "Amana Bank.png",
    "Yeti.png",
    "Gihan Apparalels.jpeg",
    "Pera Beats.png",
    "Live-Plus.png",
    "BOC.png"
  ]);

  // const [sponsers, setSponsers] = useState([]);

  const [tShirtBack, setTShirtBack] = useState("tshirt-back.png");

  useEffect(() => {
    let currentDate = new Date();
    if (currentDate < new Date(finishingDate)) {
      setShowContent(true);
    }
  }, []);

  return (
    <div>
      <Header />
      {/* {isCounterStarted && <CountDownTimer remainingTime={remainingTime} />} */}
      {showContent && (
        <Flyer
          starttingDate={starttingDate.slice(0, 10).split("-")}
          venue={venue}
          registrationsDeadlines={registrationsDeadlines}
        />
      )}
      <Sponsers sponsers={sponsers} />
      <Why />
      <MeetTeam teamPhoto={teamPhoto} />
      <Gallery gallery={gallery} />
      {/* {showContent && <CountDownTimer startingDate={starttingDate} />} */}
      <Footer />
    </div>
  );
};

export default HomePage;
