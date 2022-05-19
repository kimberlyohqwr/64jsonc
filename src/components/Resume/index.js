import React from 'react';
import './stylesheet.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { bio } from '../../data';
import { removeProtocol } from '../../common/utils';

function Resume() {
  return (
    <div className="Resume">
      <div className="paper">
        <div className="header">
          <div className="name">{bio.full_name}</div>
          <div className="bar">
            <a className="item" href={bio.links.github}>
              <FontAwesomeIcon fixedWidth icon={faGithub}/>
              <span>{removeProtocol(bio.links.github)}</span>
            </a>
            <a className="item"
               href={`https://www.google.com/maps/place/${encodeURI(bio.location)}`}>
              <FontAwesomeIcon fixedWidth icon={faMapMarkerAlt}/>
              <span>{bio.location}</span>
            </a>
            <a className="item" href={`mailto:${bio.email}`}>
              <FontAwesomeIcon fixedWidth icon={faEnvelope}/>
              <span>{bio.email}</span>
            </a>
          </div>
        </div>
        <div className="body">
          <div className="narrow">
            <div className="section">
              <div className="title">Summary</div>
              <div className="content">
                <div className="item">
                  <div className="primary paragraph">
                    Software Engineer with 3.5 years of work experience. Open source projects and hackathons keep myself
                    up to date with the latest tech trends.
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Education</div>
              <div className="content">
                <div className="item">
                  <div className="primary">Georgia Institute of Technology</div>
                  <div className="row">BS in <b>Computer Science</b></div>
                  <div className="row">Expected <b>May 2021</b></div>
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
                  {
                    bio.coursework.map(course => (
                      <div className="row" key={course}>{course}</div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Skills</div>
              <div className="content">
                <div className="item">
                  {
                    Object.entries(bio.skills).map(([skill, level]) => (
                      <div className="primary" key={skill}>
                        <div className="name">{skill}</div>
                        <div className="level">{level}</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Languages</div>
              <div className="content">
                <div className="item">
                  {
                    Object.entries(bio.languages).map(([language, level]) => (
                      <div className="primary" key={language}>
                        <div className="name">{language}</div>
                        <div className="level">{level}</div>
                      </div>
                    ))
                  }
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
                    <div className="name">SWE Intern at Google</div>
                    <div className="location">Mountain View, CA (Remote)</div>
                    <div className="date">May. 2020 - Present</div>
                  </div>
                  <div className="row">
                    Exploring improvements to data visualization accessibility for visually impaired users, with an aim
                    to merge the features into Google Analytics.
                  </div>
                  <div className="row">
                    Set up CI/CD pipelines to facilitate collaboration with the teammates.
                  </div>
                  <div className="row">
                    Implemented data audification of line/bar charts using the Web Audio API.
                  </div>
                  <div className="row">
                    Minimized the anticipated performance impact on Google Analytics by lazy loading the accessibility
                    Angular modules.
                  </div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name">SWE Intern at Randstad USA</div>
                    <div className="location">Atlanta, GA</div>
                    <div className="date">Jan. 2020 - Apr. 2020</div>
                  </div>
                  <div className="row">
                    Maintained a talent management system written in Angular and Node.js.
                  </div>
                  <div className="row">
                    Enhanced the use of TypeScript and improved data flow within the Angular app.
                  </div>
                  <div className="row">
                    Logged inbound HTTP requests into BigQuery within the backend microservices.
                  </div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name">Software Engineer at Prendssoin</div>
                    <div className="location">Seoul, South Korea</div>
                    <div className="date">Feb. 2017 - Jan. 2020</div>
                  </div>
                  <div className="row">
                    Recruited 5 developers and led the team using Scrum.
                  </div>
                  <div className="row">
                    Wrote boilerplates for React and Node.js projects in TypeScript, implementing dependency injection
                    and modularization in a monorepo.
                  </div>
                  <div className="row">
                    Conducted a weekly study group on the topics of development and communication.
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Projects</div>
              <div className="content">
                <div className="item">
                  <div className="primary">
                    <div className="name"><a href="https://github.com/64json/gt-scheduler">GT Scheduler</a></div>
                    <div className="date">2018</div>
                  </div>
                  <div className="row">
                    A scheduler that helps Georgia Tech students find the best schedule among all the possible
                    combinations of courses.
                  </div>
                  <div className="row">
                    Used GitHub Pages to serve the static website built with React and ran the Node.js crawler
                    periodically on Heroku.
                  </div>
                  <div className="row">
                    Recorded 4k+ unique visitors during the Fall 2019 registration period.
                  </div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name"><a href="https://github.com/algorithm-visualizer">Algorithm Visualizer</a>
                    </div>
                    <div className="date">2016</div>
                  </div>
                  <div className="row">
                    An interactive online platform that visualizes algorithms from code.
                  </div>
                  <div className="row">
                    Wrote visualization libraries in JavaScript, C++, and Java.
                  </div>
                  <div className="row">
                    Used AWS Lambda to securely run user-submitted code at a low cost.
                  </div>
                  <div className="row">
                    Collaborated with 40+ developers and gained 30k+ stars on GitHub.
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Awards</div>
              <div className="content wrap">
                <div className="item">
                  <div className="primary">
                    <div className="name">The Home Depot Hackathon</div>
                    <div className="date">2020</div>
                  </div>
                  <div className="row">First Place</div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name">T-Mobile C2CHack</div>
                    <div className="date">2019</div>
                  </div>
                  <div className="row">First Place</div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name">Developer Circles Community Challenge</div>
                    <div className="date">2017</div>
                  </div>
                  <div className="row">Best Updated Pre-Existing App</div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name">Consortium for Computing Sciences in Colleges: Midwest</div>
                    <div className="date">2017</div>
                  </div>
                  <div className="row">First Place in Student Showcase</div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name">USA Computing Olympiad</div>
                    <div className="date">2015</div>
                  </div>
                  <div className="row">Platinum Division</div>
                </div>
                <div className="item">
                  <div className="primary">
                    <div className="name">Korea Olympiad in Informatics</div>
                    <div className="date">2010</div>
                  </div>
                  <div className="row">Silver Medal</div>
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
