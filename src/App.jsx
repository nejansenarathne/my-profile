import { useEffect, useMemo, useState } from "react";
import "./index.css";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import nsLogo from "./assets/NS logo v2 no bg.png";

/* ---------------- Icons ---------------- */

function Icon({ name }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none" };

  if (name === "email") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 6.5h16v11H4v-11Z" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
        <path
          d="M4.5 7l7.1 6.1c.2.2.6.2.8 0L19.5 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M6.5 9.5V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6.5 6.7v.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path
          d="M10.2 18v-5.1c0-1.8 1-3.1 2.7-3.1 1.7 0 2.4 1.2 2.4 3.1V18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...common} aria-hidden="true">
        <path
          d="M8.2 4.8h7.6A3.4 3.4 0 0 1 19.2 8.2v7.6a3.4 3.4 0 0 1-3.4 3.4H8.2a3.4 3.4 0 0 1-3.4-3.4V8.2a3.4 3.4 0 0 1 3.4-3.4Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12 15.7A3.7 3.7 0 1 0 12 8.3a3.7 3.7 0 0 0 0 7.4Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M16.8 7.2h.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg {...common} aria-hidden="true">
        <path
          d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.2-4.4-1.1-4.4-4.9 0-1.1.4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.2 2.7 1a9 9 0 0 1 4.9 0c1.9-1.2 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.5 1 2.6 0 3.8-2.2 4.7-4.4 4.9.3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.95"
        />
      </svg>
    );
  }
if (name === "download") {
  return (
    <svg {...common} aria-hidden="true">
      <path
        d="M12 4v9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M8.5 10.5L12 13.8l3.5-3.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 18h13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

  // default = X icon
  return (
    <svg {...common} aria-hidden="true">
      <path
        d="M6 6h4.3l2.8 3.8L16.6 6H19l-4.8 5.5L19.4 18H15l-3.2-4.2L8.1 18H6l5.3-6L6 6Z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 7h12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M6 12h12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M6 17h12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 19V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7.5 10.5 12 6l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoonSun({ mode }) {
  if (mode === "light") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2.5v2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 19.3v2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M3.2 12h2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18.6 12h2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5.1 5.1l1.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M17.3 17.3l1.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18.9 5.1l-1.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6.7 17.3l-1.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 14.2A7.2 7.2 0 0 1 9.8 4a6 6 0 1 0 10.2 10.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------- App ---------------- */

export default function App() {
  const [site, setSite] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeProject, setActiveProject] = useState(null);
  const [showMore, setShowMore] = useState(false); // default false
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  // theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  // esc closes drawer
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ✅ fetch Firestore
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // site/main
        const siteSnap = await getDoc(doc(db, "site", "main"));
        const siteData = siteSnap.exists() ? siteSnap.data() : null;
        setSite(siteData);

        // projects
        const snap = await getDocs(collection(db, "projects"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        // safe sort (if you have "order")
        list.sort((a, b) => {
          const ao = typeof a.order === "number" ? a.order : 9999;
          const bo = typeof b.order === "number" ? b.order : 9999;
          return ao - bo;
        });

        console.log("projects loaded:", list);
        setProjects(list);
      } catch (err) {
        console.error("Firestore load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const firstSix = useMemo(() => projects.slice(0, 6), [projects]);
  const extra = useMemo(() => projects.slice(6), [projects]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goTop = () => {
    const contentEl = document.querySelector(".content");
    if (contentEl && getComputedStyle(contentEl).overflowY === "auto" && contentEl.scrollHeight > contentEl.clientHeight + 5) {
      contentEl.scrollTo({ top: 0, behavior: "smooth" });
    }
    const root = document.scrollingElement || document.documentElement;
    try {
      root.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      root.scrollTop = 0;
    }
  };

  const menuNav = (id) => {
    setMenuOpen(false);
    setTimeout(() => scrollTo(id), 120);
  };

  const normalizeLinks = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) {
      return raw
        .map((x) => {
          if (!x) return null;
          if (typeof x === "string") return { label: "Open", href: x };
          if (typeof x === "object" && x.href) return { label: x.label || "Open", href: x.href };
          return null;
        })
        .filter(Boolean);
    }
    if (typeof raw === "string") return [{ label: "Open", href: raw }];
    return [];
  };

if (loading) {
  return (
    <div className="loadingScreen">
      <div className="loadingCard">
        <img className="loadingLogo" src={nsLogo} alt="Loading" />
        <div className="loadingText">
          <span className="loadingTitle">Loading NS Profile…</span>
          <span className="loadingSub">Fetching projects and content</span>
        </div>

        <div className="loadingBars" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

  if (!site) return <div style={{ padding: 24 }}>No site data found. (Create Firestore doc: site/main)</div>;

  const name = site.name || "Your Name";
  const miniBio = site.miniBio || "";
  const profileImageUrl = site.profileImageUrl || "";
  const about = Array.isArray(site.about) ? site.about : [];
  const experience = Array.isArray(site.experience) ? site.experience : [];
  const contacts = site.contacts || {};
  const resumeUrl = site.resumeUrl || "";

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="profileCard">
          <div className="profileMain">
            <img
              className="avatar"
              src={profileImageUrl || "https://via.placeholder.com/160"}
              alt="Profile"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/160";
              }}
            />
            <h1 className="name">{name}</h1>
            <p className="miniBio">{miniBio}</p>
{resumeUrl ? (
  <a
    className="resumeBtn"
    href={resumeUrl}
    target="_blank"
    rel="noreferrer"
  >
    <span>Download Resume</span>
    <Icon name="download" />
  </a>
) : null}



          </div>

          <div className="profileBottom">
            <div className="contacts">
              {contacts.email ? (
                <a className="iconBtn" href={`mailto:${contacts.email}`} aria-label="Email" title="Email">
                  <Icon name="email" />
                </a>
              ) : null}
              {contacts.linkedin ? (
                <a className="iconBtn" href={contacts.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                  <Icon name="linkedin" />
                </a>
              ) : null}
              {contacts.instagram ? (
                <a className="iconBtn" href={contacts.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                  <Icon name="instagram" />
                </a>
              ) : null}
              {contacts.github ? (
                <a className="iconBtn" href={contacts.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                  <Icon name="github" />
                </a>
              ) : null}
              {contacts.x ? (
                <a className="iconBtn" href={contacts.x} target="_blank" rel="noreferrer" aria-label="X" title="X">
                  <Icon name="x" />
                </a>
              ) : null}
            </div>
            <div className="bottomHint">Reach me on these</div>
          </div>
        </div>
      </aside>

      <main className="content">
        {/* hamburger */}
        <div className="floating">
          {!menuOpen ? (
            <button className="fab" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" title="Menu">
              <HamburgerIcon />
            </button>
          ) : (
            <button className="fab fabCloseDesktop" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" title="Close">
              <CloseIcon />
            </button>
          )}
        </div>

        {/* back to top */}
        <button className="fab fabTop" type="button" onClick={goTop} aria-label="Back to top" title="Back to top">
          <ArrowUpIcon />
        </button>

        <section className="section" id="about">
          <h2 className="h2">About</h2>
          <div className="aboutText">
            {about.length ? about.map((line, i) => <p className="p" key={`about-${i}`}>{line}</p>) : <p className="p">Add site/main.about (array)</p>}
          </div>
        </section>

        <section className="section" id="projects">
          <div className="sectionHead">
            <h2 className="h2">Projects</h2>
            <p className="muted">Click a card to view details.</p>
          </div>

          {/* ✅ if projects empty, show message */}
          {!projects.length ? (
            <div className="card" style={{ padding: 16 }}>
              <div className="h3" style={{ marginBottom: 6 }}>No projects found</div>
              <p className="p" style={{ margin: 0, opacity: 0.8 }}>
                Check Firestore: collection name must be <b>projects</b> and it must contain documents.
              </p>
            </div>
          ) : (
            <>
              <div className="grid">
                {firstSix.map((p) => (
                  <button key={p.id} className="card cardBtn" onClick={() => setActiveProject(p)} type="button">
                    <div className="cardTop">
                      <h3 className="h3">{p.title || "Untitled"}</h3>
                      <span className="openHint">Open</span>
                    </div>

                    {/* card short */}
                    <p className="p">{p.miniDesc || p.desc || ""}</p>

                    <div className="tags">
                      {(p.tags || []).map((t) => (
                        <span className="tag" key={`${p.id}-${t}`}>{t}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className={`expandWrap ${showMore ? "open" : ""}`}>
                <div className="grid expandGrid">
                  {extra.map((p) => (
                    <button key={p.id} className="card cardBtn" onClick={() => setActiveProject(p)} type="button">
                      <div className="cardTop">
                        <h3 className="h3">{p.title || "Untitled"}</h3>
                        <span className="openHint">Open</span>
                      </div>

                      <p className="p">{p.miniDesc || p.desc || ""}</p>

                      <div className="tags">
                        {(p.tags || []).map((t) => (
                          <span className="tag" key={`${p.id}-${t}`}>{t}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="seeMoreRow">
                <button className="seeMoreBtn" onClick={() => setShowMore((v) => !v)} type="button">
                  {showMore ? "See less" : "See more"}
                </button>
              </div>
            </>
          )}
        </section>

        <section className="section" id="experience">
          <div className="sectionHead">
            <h2 className="h2">Experience</h2>
            <p className="muted">Short timeline.</p>
          </div>

          <div className="simpleList">
            {experience.length ? (
              experience.map((item, idx) => (
                <div className="simpleItem" key={`${item.time || idx}-${item.title || idx}`}>
                  <span className="pill">{item.time || "—"}</span>
                  <div>
                    <div className="tTitle">{item.title || ""}</div>
                    <div className="tDesc">{item.desc || ""}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="simpleItem">
                <span className="pill">—</span>
                <div>
                  <div className="tTitle">Add experience in Firestore</div>
                  <div className="tDesc">site/main → experience (array of maps)</div>
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="footer">© {new Date().getFullYear()} Nejan</footer>
      </main>

      {/* Drawer */}
      <div className={`drawerOverlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} role="presentation">
        <aside className={`drawer ${menuOpen ? "open" : ""}`} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
          <div className="drawerTop">
            <div className="drawerTitle">Menu</div>
            <button className="drawerClose" onClick={() => setMenuOpen(false)} aria-label="Close menu" type="button">
              <CloseIcon />
            </button>
          </div>

          <nav className="drawerNav">
            <button className="drawerLink" type="button" onClick={() => menuNav("about")}>About</button>
            <button className="drawerLink" type="button" onClick={() => menuNav("projects")}>Projects</button>
            <button className="drawerLink" type="button" onClick={() => menuNav("experience")}>Experience</button>
          </nav>

          <div className="drawerDivider" />

          <div className="themeRow">
            <span className="themeLabel">Appearance</span>
            <button
              type="button"
              className={`neoToggle ${theme === "light" ? "on" : ""}`}
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label="Toggle appearance"
            >
              <span className="neoTrack">
                <span className="neoIcon">
                  <MoonSun mode={theme === "light" ? "light" : "dark"} />
                </span>
                <span className="neoKnob" />
              </span>
            </button>
          </div>

          <p className="drawerHint">
            Tip: press <span className="kbd">Esc</span> to close.
          </p>
        </aside>
      </div>

      {/* Project Modal */}
      {activeProject && (
        <div className="modalOverlay" onClick={() => setActiveProject(null)} role="presentation">
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modalHead">
              <h3 className="modalTitle">{activeProject.title}</h3>
              <button className="closeBtn" onClick={() => setActiveProject(null)} aria-label="Close" type="button">
                <CloseIcon />
              </button>
            </div>

            {/* screenshots */}
            {activeProject.images?.length ? (
              <div className="shotWrap">
                <div className="shotRow">
                  {activeProject.images.map((src, i) => (
                    <img
                      key={`${activeProject.id}-${src}`}
                      className="shot"
                      src={src}
                      alt={`${activeProject.title} screenshot ${i + 1}`}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {/* long details = desc */}
            <p className="p" style={{ marginTop: 12 }}>
              {activeProject.desc || ""}
            </p>

            {normalizeLinks(activeProject.links).length ? (
              <div className="modalLinks">
                {normalizeLinks(activeProject.links).map((l) => (
                  <a key={`${activeProject.id}-${l.href}`} className="btnLink" href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
