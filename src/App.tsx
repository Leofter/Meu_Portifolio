import { useEffect, useMemo, useState } from "react";

type Language = "pt" | "en";
type Theme = "dark" | "light";

const ENGLISH_CERT_URL = "https://app.voxy.com/certificates/proficiency-test/696658c3f48082b9ff02653e/";

const translations: Record<
  Language,
  {
    nav: {
      about: string;
      skills: string;
      projects: string;
      contact: string;
    };
    heroTitle: string;
    heroSubtitle: string;
    heroTagline: string;
    aboutTitle: string;
    aboutBody: string;
    skillsTitle: string;
    skillsIntro: string;
    englishLevel: string;
    englishCertificateCta: string;
    projectsTitle: string;
    contactTitle: string;
    contactSubtitle: string;
    labels: {
      theme: string;
      language: string;
      dark: string;
      light: string;
      portuguese: string;
      english: string;
    };
  }
> = {
  pt: {
    nav: {
      about: "Sobre",
      skills: "Habilidades",
      projects: "Projetos",
      contact: "Contato"
    },
    heroTitle: "Leonardo Magalhães",
    heroSubtitle: "Engenharia da Computação · Cloud · IA · Software",
    heroTagline:
      "Construindo soluções escaláveis que conectam cloud, código e inteligência artificial.",
    aboutTitle: "Sobre mim",
    aboutBody:
      "Cursando Engenharia da Computação no SENAI CIMATEC e atuando como AWS Cloud Club Leader. Iniciei minha jornada em 2023 e adoro trabalhar em projetos que envolvam cloud, desenvolvimento de software e inteligência artificial. Atualmente trabalho em um laboratório de engenharia óptica e fotônica, desenvolvendo software para criação de sensores baseados em fibra óptica.",
    skillsTitle: "Habilidades",
    skillsIntro:
      "Tecnologias e soft skills que mais utilizo em projetos acadêmicos, pessoais e de pesquisa.",
    englishLevel: "Inglês intermediário-avançado",
    englishCertificateCta: "Ver certificado de inglês",
    projectsTitle: "Projetos em destaque",
    contactTitle: "Contato",
    contactSubtitle:
      "Quer conversar sobre oportunidades, projetos ou pesquisas? Vamos falar!",
    labels: {
      theme: "Tema",
      language: "Idioma",
      dark: "Escuro",
      light: "Claro",
      portuguese: "Português",
      english: "Inglês"
    }
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact"
    },
    heroTitle: "Leonardo Magalhães",
    heroSubtitle: "Computer Engineering · Cloud · AI · Software",
    heroTagline:
      "Building scalable solutions that connect cloud, code, and artificial intelligence.",
    aboutTitle: "About me",
    aboutBody:
      "Computer Engineering student at SENAI CIMATEC and AWS Cloud Club Leader. I started my journey in 2023 and I love working on projects involving cloud, software development, and artificial intelligence. I currently work in an optical and photonics engineering lab, developing software for fiber-optic based sensors.",
    skillsTitle: "Skills",
    skillsIntro:
      "Technologies and soft skills I use the most in academic, personal, and research projects.",
    englishLevel: "Upper-intermediate English",
    englishCertificateCta: "View English certificate",
    projectsTitle: "Highlighted projects",
    contactTitle: "Contact",
    contactSubtitle:
      "Want to talk about opportunities, projects, or research? Let’s talk!",
    labels: {
      theme: "Theme",
      language: "Language",
      dark: "Dark",
      light: "Light",
      portuguese: "Portuguese",
      english: "English"
    }
  }
};

type Project = {
  id: string;
  title: string;
  role: string;
  tech: string;
  descriptionPt: string;
  descriptionEn: string;
  link?: string;
};

const projects: Project[] = [
  {
    id: "rpg-c",
    title: "RPG em C",
    role: "Game development · C",
    tech: "C",
    descriptionPt:
      "Criação de um jogo RPG em C, focando em lógica de combate, sistema de inventário e estruturação de dados.",
    descriptionEn:
      "Development of an RPG game in C, focusing on combat logic, inventory system, and data structures.",
    link: undefined
  },
  {
    id: "estoque-java",
    title: "Controle de estoque em Java",
    role: "Backend · Java",
    tech: "Java",
    descriptionPt:
      "Desenvolvimento de um sistema de controle de estoque para uma loja de games, com cadastro de produtos e controle de saída/entrada.",
    descriptionEn:
      "Development of an inventory management system for a game store, with product registration and stock in/out control.",
    link: "https://github.com/Leofter/Controle_de_estoque_POO"
  },
  {
    id: "bd-oracle",
    title: "Banco de dados Oracle",
    role: "Database design · SQL",
    tech: "SQL · Oracle",
    descriptionPt:
      "Modelagem e implementação de um banco de dados funcional para uma empresa real de venda de produtos médicos.",
    descriptionEn:
      "Modeling and implementation of a functional database for a real medical products company.",
    link: undefined
  },
  {
    id: "n8n-email-ia",
    title: "Filtro inteligente de e-mails",
    role: "Automation · n8n · AI",
    tech: "n8n · IA",
    descriptionPt:
      "Criação de um fluxo em n8n que utiliza IA para filtrar e-mails e gerar um resumo geral das mensagens recebidas.",
    descriptionEn:
      "Creation of an n8n workflow that uses AI to filter emails and generate a general summary of received messages.",
    link: undefined
  },
  {
    id: "faces-cv",
    title: "Contador de rostos",
    role: "Computer vision · Python",
    tech: "Python · Visão computacional",
    descriptionPt:
      "Desenvolvimento de um identificador de rostos para contagem de pessoas em um ambiente, utilizando técnicas de visão computacional.",
    descriptionEn:
      "Development of a face detector to count people in a space, using computer vision techniques.",
    link: "https://github.com/Leofter/Count-numbers-of-faces"
  }
];

type Skill = {
  id: string;
  labelPt: string;
  labelEn: string;
  highlight?: boolean;
};

const skills: Skill[] = [
  {
    id: "english",
    labelPt: "Inglês intermediário-avançado",
    labelEn: "Upper-intermediate English",
    highlight: true
  },
  { id: "python", labelPt: "Python", labelEn: "Python" },
  { id: "java", labelPt: "Java", labelEn: "Java" },
  { id: "c", labelPt: "C", labelEn: "C" },
  { id: "aws", labelPt: "AWS Cloud", labelEn: "AWS Cloud" },
  { id: "n8n", labelPt: "n8n", labelEn: "n8n" },
  { id: "sql", labelPt: "SQL Oracle", labelEn: "SQL Oracle" },
  {
    id: "ml",
    labelPt: "Machine Learning",
    labelEn: "Machine Learning"
  },
  {
    id: "cv",
    labelPt: "Visão computacional",
    labelEn: "Computer vision"
  },
  {
    id: "teamwork",
    labelPt: "Trabalho em equipe",
    labelEn: "Teamwork"
  }
];

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme") as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem("language") as Language | null;
  if (stored === "pt" || stored === "en") return stored;
  return "pt";
}

export function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [showEnglishModal, setShowEnglishModal] = useState(false);

  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("language", language);
  }, [language]);

  const isDark = theme === "dark";

  return (
    <div className={`app-root theme-${theme}`}>
      <header className="app-header">
        <div className="container header-content">
          <div className="logo">
            <span className="logo-mark">&lt;/&gt;</span>
            <span className="logo-text">Leofter</span>
          </div>

          <nav className="nav-links">
            <a href="#about">{t.nav.about}</a>
            <a href="#skills">{t.nav.skills}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="header-controls">
            <div className="toggle-group">
              <span className="toggle-label">{t.labels.theme}</span>
              <button
                type="button"
                className="pill-toggle"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={
                  isDark
                    ? `${t.labels.light} ${t.labels.theme}`
                    : `${t.labels.dark} ${t.labels.theme}`
                }
              >
                <span className={`pill-thumb ${isDark ? "pill-left" : "pill-right"}`}>
                  {isDark ? "🌙" : "☀️"}
                </span>
                <span className="pill-option pill-option-left">
                  {t.labels.dark}
                </span>
                <span className="pill-option pill-option-right">
                  {t.labels.light}
                </span>
              </button>
            </div>

            <div className="toggle-group">
              <span className="toggle-label">{t.labels.language}</span>
              <div className="language-toggle">
                <button
                  type="button"
                  className={`lang-button ${language === "pt" ? "lang-active" : ""}`}
                  onClick={() => setLanguage("pt")}
                  aria-label={t.labels.portuguese}
                >
                  <span className="flag" aria-hidden="true">
                    🇧🇷
                  </span>
                  <span className="lang-code">PT</span>
                </button>
                <button
                  type="button"
                  className={`lang-button ${language === "en" ? "lang-active" : ""}`}
                  onClick={() => setLanguage("en")}
                  aria-label={t.labels.english}
                >
                  <span className="flag" aria-hidden="true">
                    🇺🇸
                  </span>
                  <span className="lang-code">EN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <p className="hero-kicker">
                {language === "pt"
                  ? "Engenharia da Computação • Cloud • IA"
                  : "Computer Engineering • Cloud • AI"}
              </p>
              <h1>{t.heroTitle}</h1>
              <p className="hero-subtitle">{t.heroSubtitle}</p>
              <p className="hero-tagline">{t.heroTagline}</p>

              <div className="hero-actions">
                <a className="primary-btn" href="#projects">
                  {language === "pt" ? "Ver projetos" : "View projects"}
                </a>
                <a className="ghost-btn" href="#contact">
                  {language === "pt" ? "Entrar em contato" : "Get in touch"}
                </a>
              </div>
            </div>

            <div className="hero-card">
              <div className="avatar-circle">
                <span className="avatar-initials">LM</span>
              </div>
              <ul className="hero-highlights">
                <li>
                  <span className="dot aws" />
                  <span>
                    AWS Cloud Club Leader
                    <span className="hero-meta">
                      {language === "pt" ? "Comunidade & liderança" : "Community & leadership"}
                    </span>
                  </span>
                </li>
                <li>
                  <span className="dot ai" />
                  <span>
                    {language === "pt"
                      ? "Projetos em IA e visão computacional"
                      : "Projects in AI and computer vision"}
                    <span className="hero-meta">
                      {language === "pt" ? "Modelos e automações" : "Models and automations"}
                    </span>
                  </span>
                </li>
                <li>
                  <span className="dot optics" />
                  <span>
                    {language === "pt"
                      ? "Lab de engenharia óptica e fotônica"
                      : "Optical & photonics engineering lab"}
                    <span className="hero-meta">
                      {language === "pt"
                        ? "Sensores em fibra óptica"
                        : "Fiber-optic sensors"}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container section-grid">
            <div className="section-header">
              <h2>{t.aboutTitle}</h2>
              <p className="section-kicker">
                {language === "pt" ? "Quem sou eu" : "Who I am"}
              </p>
            </div>
            <div className="section-body">
              <p>{t.aboutBody}</p>
              <div className="about-tags">
                <span className="tag">SENAI CIMATEC</span>
                <span className="tag">
                  {language === "pt" ? "Desde 2023" : "Since 2023"}
                </span>
                <span className="tag">
                  {language === "pt" ? "Cloud & Software" : "Cloud & Software"}
                </span>
                <span className="tag">AI</span>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <div className="section-header">
              <h2>{t.skillsTitle}</h2>
              <p className="section-kicker">
                {language === "pt" ? "Tecnologias & soft skills" : "Technologies & soft skills"}
              </p>
            </div>
            <p className="section-intro">{t.skillsIntro}</p>

            <div className="skills-grid">
              {skills.map((skill) => {
                const label = language === "pt" ? skill.labelPt : skill.labelEn;
                const isEnglishSkill = skill.id === "english";

                if (isEnglishSkill) {
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      className="skill-pill skill-pill-clickable"
                      onClick={() => setShowEnglishModal(true)}
                    >
                      <span className="skill-label">{label}</span>
                      <span className="skill-extra">
                        {t.englishCertificateCta}
                      </span>
                    </button>
                  );
                }

                return (
                  <div key={skill.id} className="skill-pill">
                    <span className="skill-label">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <div className="section-header">
              <h2>{t.projectsTitle}</h2>
              <p className="section-kicker">
                {language === "pt"
                  ? "Projetos acadêmicos, pessoais e de pesquisa"
                  : "Academic, personal and research projects"}
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <article key={project.id} className="project-card">
                  <header className="project-header">
                    <h3>{project.title}</h3>
                    <span className="project-tech">{project.tech}</span>
                  </header>
                  <p className="project-role">{project.role}</p>
                  <p className="project-description">
                    {language === "pt"
                      ? project.descriptionPt
                      : project.descriptionEn}
                  </p>
                  <footer className="project-footer">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        {language === "pt" ? "Ver no GitHub" : "View on GitHub"}
                      </a>
                    ) : (
                      <span className="project-link disabled">
                        {language === "pt"
                          ? "Repositório privado ou local"
                          : "Private or local repository"}
                      </span>
                    )}
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="container contact-grid">
            <div>
              <div className="section-header">
                <h2>{t.contactTitle}</h2>
                <p className="section-kicker">
                  {language === "pt" ? "Vamos conversar?" : "Let’s talk?"}
                </p>
              </div>
              <p className="section-intro">{t.contactSubtitle}</p>
            </div>

            <div className="contact-cards">
              <a
                className="contact-card"
                href="mailto:lmagal2003@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-label">Email</span>
                <span className="contact-value">lmagal2003@gmail.com</span>
              </a>

              <a
                className="contact-card"
                href="https://www.linkedin.com/in/leonardo-magalhães-3b6bba1a9"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">
                  linkedin.com/in/leonardo-magalhães-3b6bba1a9
                </span>
              </a>

              <a
                className="contact-card"
                href="https://github.com/Leofter"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-label">GitHub</span>
                <span className="contact-value">github.com/Leofter</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="container footer-content">
          <span>
            © {new Date().getFullYear()} Leonardo Magalhães.{" "}
            {language === "pt"
              ? "Construído com React, TypeScript e muita curiosidade."
              : "Built with React, TypeScript, and a lot of curiosity."}
          </span>
        </div>
      </footer>

      {showEnglishModal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="english-certificate-title"
        >
          <div className="modal">
            <div className="modal-header">
              <h3 id="english-certificate-title">
                {language === "pt"
                  ? "Certificado de inglês"
                  : "English certificate"}
              </h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowEnglishModal(false)}
                aria-label={language === "pt" ? "Fechar" : "Close"}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>
                {language === "pt"
                  ? "Aqui você pode adicionar o link ou a imagem do seu certificado de inglês."
                  : "Here you can add the link or image of your English certificate."}
              </p>
              <a
                href={ENGLISH_CERT_URL}
                target="_blank"
                rel="noreferrer"
                className="primary-btn modal-btn"
              >
                {language === "pt"
                  ? "Abrir certificado"
                  : "Open certificate"}
              </a>
              <p className="modal-hint">
                {language === "pt"
                  ? "Substitua o link ENGLISH_CERT_URL no código por sua URL real (Google Drive, plataforma do curso, etc.)."
                  : "Replace the ENGLISH_CERT_URL in the code with your real URL (Google Drive, course platform, etc.)."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

