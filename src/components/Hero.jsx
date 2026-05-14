import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from "react-icons/fa";
import GameOfLife from "./GameOfLife";
import "./Hero.css";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="hero" id="hero-section">
        <GameOfLife />
        <div className="hero-container">
          <div className={`hero-content ${loaded ? "show" : ""}`}>
            <div className="hero-eyebrow">
              <span>gandhinagar / remote</span>
            </div>
            <h1 className="hero-name">
              <span className="glitch-text" data-text="Veer Mehta">
                Veer Mehta
              </span>
            </h1>
            <p className="hero-summary">
              I spend a lot of time around building games, Linux, backend
              systems, and the little details that make software feel solid.
              Most of my projects start from curiosity, then turn into something
              I can build, break, and make a little better.
            </p>
            <div className="hero-console" aria-label="Quick profile">
              <div>
                <span>interests</span>
                <strong>linux, backend, game dev</strong>
              </div>
              <div>
                <span>stack</span>
                <strong>react / node / python / linux</strong>
              </div>
              <div>
                <span>learning</span>
                <strong>golang, opengl</strong>
              </div>
            </div>
            <div className="hero-actions">
              <a
                href="https://github.com/veer-mehta"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-action primary"
              >
                <FaGithub /> github
              </a>
              <a
                href="https://linkedin.com/in/viirmehta"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-action"
              >
                <FaLinkedin /> linkedin
              </a>
              <a href="mailto:veeramehta09@gmail.com" className="hero-action">
                <FaEnvelope /> email
              </a>
              <a href="/VeerMehtaResume.pdf" download className="hero-action">
                <FaFileAlt /> resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
