import { useState, useEffect } from "react";
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
            <div className="hero-tagline">
              <span className="tagline-text">
                CS student building games, backend tools, and Linux experiments.
              </span>
            </div>
            <p className="hero-summary">
              I spend a lot of time around building games, Linux, backend systems, and the
              little details that make software feel solid. Most of my projects
              start from curiosity, then turn into something I can build, break,
              and make a little better.
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
              <a href="#projects" className="hero-action primary">
                Projects
              </a>
              <a href="/blog" className="hero-action">
                Writing
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
