import React from 'react';
import './stylesheet.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

function Resume() {
  return (
    <div className="Resume">
      <div className="paper">
        <div className="header">
          <div className="name">Jinseo Park</div>
          <div className="bar">
            <a className="item" href="https://github.com/parkjs814">
              <FontAwesomeIcon fixedWidth icon={faGithub}/>
              <span>github.com/parkjs814</span>
            </a>
            <a className="item"
               href="https://www.google.com/maps/place/Atlanta,+GA+30332/@33.7700012,-84.3833291,17z/data=!3m1!4b1!4m5!3m4!1s0x88f504a32025c03d:0x435f52a0da5daab!8m2!3d33.7700012!4d-84.3811458">
              <FontAwesomeIcon fixedWidth icon={faMapMarkerAlt}/>
              <span>Atlanta, GA 30332</span>
            </a>
            <a className="item" href="mailto:jason.park@gatech.edu">
              <FontAwesomeIcon fixedWidth icon={faEnvelope}/>
              <span>jason.park@gatech.edu</span>
            </a>
          </div>
        </div>
        <div className="body">
          <div className="narrow">
            <div className="section">
              <div className="title">Education</div>
              <div className="content">
                <div className="item">
                  <div className="primary">Georgia Institute of Technology</div>
                  <div className="row">BS in <b>Computer Science</b></div>
                  <div className="row">Expected <b>Dec. 2020</b></div>
                  <div className="row">Concentration in Theory and Intelligence</div>
                  <div className="row">Minor in Economics</div>
                </div>
                <div className="item">
                  <div className="primary">National University of Singapore</div>
                  <div className="row">Exchange in Fall 2019</div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Coursework</div>
              <div className="content">
                <div className="item">
                  <div className="row">Combinatorics and Graphs I</div>
                  <div className="row">Computer Vision</div>
                  <div className="row">Data Structures and Algorithms</div>
                  <div className="row">Design and Analysis of Algorithms</div>
                  <div className="row">Introduction to Discrete Mathematics</div>
                  <div className="row">Objects and Design</div>
                  <div className="row">Technical Communication</div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Skills</div>
              <div className="content">
                <div className="item">
                  <div className="primary">
                    <div className="name">JavaScript</div>
                    <div className="level">Expert</div>
                  </div>
                  <div className="primary">
                    <div className="name">Java</div>
                    <div className="level">Advanced</div>
                  </div>
                  <div className="primary">
                    <div className="name">Scala</div>
                    <div className="level">Advanced</div>
                  </div>
                  <div className="primary">
                    <div className="name">Python</div>
                    <div className="level">Intermediate</div>
                  </div>
                  <div className="primary">
                    <div className="name">Haskell</div>
                    <div className="level">Intermediate</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Languages</div>
              <div className="content">
                <div className="item">
                  <div className="primary">
                    <div className="name">English</div>
                    <div className="level">Fluent</div>
                  </div>
                  <div className="primary">
                    <div className="name">Korean</div>
                    <div className="level">Native</div>
                  </div>
                  <div className="primary">
                    <div className="name">Spanish</div>
                    <div className="level">Intermediate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wide">
            <div className="section">
              <div className="title">Work Experience</div>
              <div className="content">
                <div className="item">
                  <div className="primary">
                    <div className="name">Software Engineer at Prendssoin, Seoul</div>
                    <div className="date">Feb. 2017 - Present</div>
                  </div>
                  <div className="row">Recruited 5 developers and led the team using Scrum.</div>
                  <div className="row">Wrote boilerplates for React and Node.js projects in TypeScript.</div>
                  <div className="row">Automated testing and releasing process integrating AWS CloudFormation, CircleCI,
                    GitHub/Slack API, etc.
                  </div>
                  <div className="row">Worked on 4 outsourced projects and 7 internal projects.</div>
                  <div className="row">Conducted a weekly study group on the topics of development and communication.
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Projects</div>
              <div className="content">
                <div className="item">
                  <div className="primary">
                    <div className="name"><a href="https://github.com/parkjs814/gt-scheduler">GT Scheduler</a></div>
                    <div className="date">2018</div>
                  </div>
                  <div className="row">A scheduler that helps Georgia Tech students find the best schedule among all the
                    possible combinations of courses.
                  </div>
                  <div className="row">Used GitHub Pages to serve the static website built with React and ran the
                    Node.js
                    crawler periodically on Heroku.
                  </div>
                  <div className="row">Recorded 4k+ unique visitors during the Fall 2019 registration period.</div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name"><a href="https://github.com/algorithm-visualizer">Algorithm Visualizer</a>
                    </div>
                    <div className="date">2016</div>
                  </div>
                  <div className="row">An interactive online platform that visualizes algorithms from code.</div>
                  <div className="row">Wrote visualization libraries in JavaScript, C++, and Java.</div>
                  <div className="row">Used AWS Lambda to run user-submitted code at a lower cost and higher security.
                  </div>
                  <div className="row">Collaborated with 40+ developers and gained 24k+ stars on GitHub.</div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Awards</div>
              <div className="content">
                <div className="item">
                  <div className="primary">
                    <div className="name">T-Mobile C2CHack</div>
                    <div className="date">2019</div>
                  </div>
                  <div className="row">First Place</div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name">Consortium for Computing Sciences in Colleges: Midwest</div>
                    <div className="date">2017</div>
                  </div>
                  <div className="row">First Place in Application Track of Student Showcase</div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name">University of Texas at Dallas HS Programming Contest</div>
                    <div className="date">2016</div>
                  </div>
                  <div className="row">First Place in Advanced Division</div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name">USA Computing Olympiad</div>
                    <div className="date">2015</div>
                  </div>
                  <div className="row">Platinum Division</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;