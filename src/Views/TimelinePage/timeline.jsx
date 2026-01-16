import React from 'react';
import './timeline.css';
import HeaderPage from "../HeaderPage/HeaderPage";
import SCl from '../../assests/images/timeline/SCL.jpeg';
import AGE from '../../assests/images/timeline/Age.jpeg'
import Club from '../../assests/images/timeline/Club.jpg';
import University from '../../assests/images/timeline/university.jpeg';
import Novice from '../../assests/images/timeline/novices.jpeg';
import Staff from '../../assests/images/timeline/stff.jpeg'
import Footer from '../HomePage/Footer/footer'

const TimelineData = [
  {
    title: 'All Island Age Group',
    description: 'The All Island Age Group Badminton Championship was a thrilling event last year with over 1,000 participants competing across four age categories; Under 9, 11, 13, and 15. It showcased young talent making it one of the most exciting and competitive school level badminton tournaments.',
    imageSrc: AGE,  // Corrected image reference
    imageAlt: 'All Island Age Group Event'
  },
  {

    title: 'University Badminton Championship',
    description: 'The University Badminton Championship 2025 is set to bring together some of the brightest badminton talent from universities and institutions across the country. Exclusively for full-time undergraduate students, this tournament features both team and individual events. The event promises high-energy competition, showcasing passion, sportsmanship, and the determination of university athletes striving to make their mark in the sport.',
    imageSrc: University,  // Add appropriate image source
    imageAlt: 'First Major Project'
  },
  {

    title: 'University Staff Badminton Championship',
    description: 'The University Staff Badminton Championship 2025 brings together the best players from academic institutions across the country. Open to full-time employees and postgraduate students of degree-awarding institutes, the tournament offers an exciting opportunity for staff members to compete at a high level. With an atmosphere full of camaraderie and fierce competition, the event highlights both skill and sportsmanship, making it a must-watch for badminton enthusiast',
    imageSrc: Staff,
    imageAlt: 'Global Expansion'
  },
  {

    title: 'Novices Badminton Championship',
    description: 'The Novices Badminton Championship 2025 sets the stage for passionate and ambitious players to showcase their skills in a highly competitive environment. Open to players over 18 who are not ranked within the top 30 of Sri Lanka Badminton Association’s Open Category, this tournament provides a fair and exciting opportunity for new talent to rise. With intense rallies, determined athletes, and an atmosphere of sportsmanship, the championship promises thrilling matches and unforgettable moments.',
    imageSrc: Novice,
    imageAlt: 'Award Ceremony'
  },
  {

    title: 'Club Team Badminton Championship',
    description: 'The Club Team Badminton Championship 2025 is a men’s-only event that brings together top-tier players from various clubs, competing in a thrilling atmosphere of strategy and athleticism. Open to players above 18 years old, the tournament provides an exciting platform for talented athletes to showcase their skills. Ranked players holding a national ranking above 20 in Open singles, doubles, or mixed doubles are not eligible to participate. However, veteran players (aged 30 and above) are welcome to compete, adding a diverse range of experience to the competition. With fierce rivalry and high-level play, this newly introduced event promises to be a game changer in the badminton scene.',
    imageSrc: Club,
    imageAlt: 'Award Ceremony'
  }
  ,
  {

    title: 'Invitational school badminton team championship',
    description: 'The School Team Badminton Championship 2025 is a newly introduced event that brings together top young talent from selected schools. This team-based competition highlights the skill, teamwork, and determination of school-level athletes as they compete for victory. With a focus on fostering sportsmanship and providing a platform for emerging badminton stars, the championship promises to be an exciting and unforgettable event, filled with competitive energy and promising talent.',
    imageSrc: SCl,
    imageAlt: 'Award Ceremony'
  }
];

const CompanyTimeline = () => {
  return (
    <div>
    <HeaderPage />
    <div className="timeline-container">
    
      <h2 className="timeline-heading">Events</h2>
      
      <div className="timeline">
        <div className="timeline-line"></div>
        
        {TimelineData.map((item, index) => (
          <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-content">
              <div className="timeline-card text">
                {item.year && <span className="timeline-year">{item.year}</span>}
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-card image">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </div >
  );
};

export default CompanyTimeline;
