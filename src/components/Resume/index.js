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
              <FontAwesomeIcon fixedWidth icon={faGithub} />
              <span>{removeProtocol(bio.links.github)}</span>
            </a>
            <a className="item"
               href={`https://www.google.com/maps/place/${encodeURI(bio.location)}`}>
              <FontAwesomeIcon fixedWidth icon={faMapMarkerAlt} />
              <span>{bio.location}</span>
            </a>
            <a className="item" href={`mailto:${bio.email}`}>
              <FontAwesomeIcon fixedWidth icon={faEnvelope} />
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
                  <div className="row paragraph">
                    {bio.description}
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Education</div>
              <div className="content">
                <div className="item">
                  <div className="row">Georgia Institute of Technology</div>
                  <div className="bullet">Aug. 2018 - May 2021</div>
                  <div className="bullet">BS in <b>Computer Science</b></div>
                  <div className="bullet">Concentration in Theory and Intelligence</div>
                  <div className="bullet">Minor in Economics</div>
                </div>
                <div className="item">
                  <div className="row">National University of Singapore</div>
                  <div className="bullet">Exchange in Fall 2019</div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Awards</div>
              <div className="content">
                <div className="item">
                  <div className="row">The Home Depot Hackathon</div>
                  <div className="bullet">2020, First Place</div>
                </div>
                <div className="item">
                  <div className="row">Chengdu 80 Fintech Product Design & Research Competition</div>
                  <div className="bullet">2019, Second Place</div>
                </div>
                <div className="item">
                  <div className="row">T-Mobile Hackathon</div>
                  <div className="bullet">2019, First Place</div>
                </div>
                <div className="item">
                  <div className="row">Consortium for Computing Sciences in Colleges - Midwest</div>
                  <div className="bullet">2017, First Place in Student Showcase</div>
                </div>
                <div className="item">
                  <div className="row">USA Computing Olympiad</div>
                  <div className="bullet">2015, Platinum Division</div>
                </div>
                <div className="item">
                  <div className="row">Korea Youth Science of Information Olympiad</div>
                  <div className="bullet">2011, First Place</div>
                </div>
                <div className="item">
                  <div className="row">Korea Olympiad in Informatics</div>
                  <div className="bullet">2010, Silver Medal</div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Skills</div>
              <div className="content">
                <div className="item">
                  {
                    Object.entries(bio.skills).map(([skill, level]) => (
                      <div className="row" key={skill}>
                        <div className="primary">{skill}</div>
                        <div className="spacer" />
                        <div className="secondary">{level}</div>
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
                  <div className="row">
                    <div className="primary">Google</div>
                    <div className="spacer" />
                    <div className="secondary">Mountain View, CA</div>
                  </div>
                  <div className="row">
                    <div className="secondary">Software Engineer</div>
                    <div className="spacer" />
                    <div className="secondary">July 2021 - Current</div>
                  </div>
                  <div className="bullet">
                      Working with the Ads Serving Intelligence team.
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="primary">True Shape (d.b.a. Gatherly)</div>
                    <div className="spacer" />
                    <div className="secondary">Remote</div>
                  </div>
                  <div className="row">
                    <div className="secondary">Software Engineering Intern</div>
                    <div className="spacer" />
                    <div className="secondary">Jan. 2021 - Apr. 2021</div>
                  </div>
                  {/*<div className="row">*/}
                  {/*  <div className="secondary">Contract Software Engineer (Remote)</div>*/}
                  {/*  <div className="spacer" />*/}
                  {/*  <div className="secondary">Oct. 2020 - Jan. 2021</div>*/}
                  {/*</div>*/}
                  <div className="bullet">
                    Fully rewrote a virtual conference platform written in React and Node.js to be more performant and robust with the help of end-to-end, integration, and load testing.
                  </div>
                  {/*<div className="bullet">*/}
                  {/*  Created a TypeScript package to define interfaces of REST API and WebSocket payloads to be shared by the backend and frontend packages.*/}
                  {/*</div>*/}
                  <div className="bullet">
                    Implemented semantic versioning using Lerna and Conventional Commits, and integrated Sentry to facilitate error tracking and troubleshooting.
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="primary">Google</div>
                    <div className="spacer" />
                    <div className="secondary">Remote</div>
                  </div>
                  <div className="row">
                    <div className="secondary">Software Engineering Intern</div>
                    <div className="spacer" />
                    <div className="secondary">May 2020 - Aug. 2020</div>
                  </div>
                  <div className="bullet">
                    Explored improvements to the accessibility of data visualization with an aim to merge the features into Google Analytics.
                  </div>
                  <div className="bullet">
                    Designed data flow and component hierarchy of the Angular app, and used lazy loading to minimize the anticipated performance impact.
                  </div>
                  <div className="bullet">
                    Set up CI/CD pipelines to automate linting, unit testing, and deployment.
                  </div>
                  <div className="bullet">
                    Developed data audification of line charts using the Web Audio API.
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="primary">Randstad Technologies</div>
                    <div className="spacer" />
                    <div className="secondary">Atlanta, GA</div>
                  </div>
                  <div className="row">
                    <div className="secondary">Software Engineering Intern</div>
                    <div className="spacer" />
                    <div className="secondary">Jan. 2020 - Apr. 2020</div>
                  </div>
                  <div className="bullet">
                    Maintained a talent management system written in Angular and Node.js.
                  </div>
                  <div className="bullet">
                    Rewrote TypeScript interfaces in a more object-oriented way, and simplified data flow within the Angular app.
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="primary">Prendssoin</div>
                    <div className="spacer" />
                    <div className="secondary">Seoul, South Korea</div>
                  </div>
                  <div className="row">
                    <div className="secondary">Software Engineer</div>
                    <div className="spacer" />
                    <div className="secondary">Feb. 2017 - Jan. 2020</div>
                  </div>
                  <div className="bullet">
                    Managed a Scrum team of five engineers to deliver multiple outsourced web services.
                  </div>
                  <div className="bullet">
                    Wrote boilerplates for React and Node.js projects in TypeScript, implementing dependency injection
                    and modularization in a monorepo.
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">Projects</div>
              <div className="content">
                <div className="item">
                  <div className="row">
                    <div className="primary"><a href="https://github.com/64json/gt-scheduler">GT Scheduler</a></div>
                    <div className="spacer" />
                    <div className="secondary">2018</div>
                  </div>
                  <div className="bullet">
                    A scheduler that helps Georgia Tech students find the best schedule among all the possible
                    combinations of courses.
                  </div>
                  <div className="bullet">
                    Used GitHub Pages to serve a React app, and GitHub Actions to periodically run a Node.js crawler.
                  </div>
                  <div className="bullet">
                    Recorded 4k+ unique visitors during the Fall 2019 registration period.
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="primary"><a href="https://github.com/algorithm-visualizer">Algorithm Visualizer</a>
                    </div>
                    <div className="spacer" />
                    <div className="secondary">2016</div>
                  </div>
                  <div className="bullet">
                    An interactive online platform that visualizes algorithms from code.
                  </div>
                  <div className="bullet">
                    Wrote visualization libraries in JavaScript, C++, and Java.
                  </div>
                  <div className="bullet">
                    Used AWS Lambda for running user-submitted code for the sake of security, scalability, and affordability.
                  </div>
                  <div className="bullet">
                    Collaborated with 40+ developers and gained 33k+ stars on GitHub.
                  </div>
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
