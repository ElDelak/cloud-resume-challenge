import React from "react";
import { NavLink } from "react-router-dom";
export default function ResumePage() {
  return (
    <>
      <section className="header">
        <h1>Khaled Mabrouk</h1>
        <p>
          1825 Rue Saint-Rose, Montreal, QC H2K 4M1, Canada &bull;
          <a href="mailto:mabrouk.kha@gmail.com">mabrouk.kha@gmail.com</a>
          &bull; +1 514-995-9567
        </p>
      </section>
      <section className="education">
        <h2>Education</h2>
        <div className="items">
          <div className="item">
            <div className="item_heading">
              <div className="info">
                <h3>Baccalauréat</h3>
                <p>
                  Institut Supérieur des Sciences Appliquées et de Technologie
                </p>
              </div>
              <div className="details">
                <div className="location">Sousse, Tunisia</div>
                <div className="duration">2009</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="experience">
        <h2>Experience</h2>
        <div className="items">
          <div className="item">
            <div className="item_heading">
              <div className="info">
                <h3>IT Developper</h3>
                <p>Levio inc</p>
              </div>
              <div className="details">
                <div className="location">Montreal, QC</div>
                <div className="duration">2022-now</div>
              </div>
            </div>
            <ul>
              <li>frontend developper at desjardins</li>
              <li>.net developper at MRNF</li>
            </ul>
          </div>
          <div className="item">
            <div className="item_heading">
              <div className="info">
                <h3>Engineer / IOT system</h3>
                <p>CPG</p>
              </div>
              <div className="details">
                <div className="location">Gafsa, Tunisia</div>
                <div className="duration">2016-2022</div>
              </div>
            </div>
            <ul>
              <li>
                Built an IoT system (hardware and software) to remotely monitor
                production.
              </li>
            </ul>
          </div>
          <div className="item">
            <div className="item_heading">
              <div className="info">
                <h3>It Developer</h3>
                <p>Archimed / Neoledge</p>
              </div>
              <div className="details">
                <div className="location">Tunis, Tunisia</div>
                <div className="duration">2010 - 1016</div>
              </div>
            </div>
            <ul>
              <li>
                Develop and integrate EDM (Electronic Document Management)
                solutions
              </li>
              <li>Develop the physical archives management platform</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="skills">
        <h2>Skills &amp; Interests</h2>
        <div className="items">
          <div className="item">
            <div className="item_heading">
              <div className="info">
                <h3>Cloud Architecture</h3>
                <p>
                  As a it developper I would like to learn also Cloud
                  Architecture
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="items">
          <div className="item">
            <div className="item_heading">
              <div className="info">
                <h3>AWS Certification</h3>
                <p>
                  I’m currently in the process of renewing the AWS Certified
                  Solutions Architect – Associate certification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
