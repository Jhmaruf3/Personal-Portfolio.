/* ==========================================================================
   Portfolio behaviour — Maruf Mohammad Jubayer Hossen
   Vanilla JavaScript only. Sections:
     1. Editable site config (social links, etc.)
     2. Bilingual content dictionary (English + Simplified Chinese)
     3. Language switcher (localStorage, <html lang>, UI updates)
     4. Intro loader cleanup
     5. Header (scrolled state), mobile menu
     6. Scroll reveal + active navigation (Intersection Observer)
     7. Contact form client-side validation (i18n-aware)
     8. Footer year
   ========================================================================== */

"use strict";

/* 1. Editable site config -------------------------------------------------- */
/* Add your real LinkedIn profile URL to enable the LinkedIn button.
   Leave it empty ("") to keep the button hidden. */
const LINKEDIN_URL = ""; // e.g. "https://www.linkedin.com/in/your-handle"

/* 2. Bilingual content dictionary ------------------------------------------ */
/* One key per translatable element. English text here must match the
   default text in templates/index.html. To add a new translatable string:
     1) add data-i18n="my.new.key" to the element in index.html
     2) add "my.new.key" to both en and zh below. */
const I18N = {
  en: {
    /* meta */
    "meta.title": "Maruf Mohammad Jubayer Hossen — Portfolio",
    "meta.description": "Portfolio of Maruf Mohammad Jubayer Hossen — Computer Science & Technology student at Taizhou University, China.",

    /* skip link, nav */
    "skip.text": "Skip to content",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.achievements": "Achievements",
    "nav.contact": "Contact",
    "nav.menuOpen": "Open menu",
    "nav.menuClose": "Close menu",

    /* hero */
    "hero.greeting": "Hello, I'm",
    "hero.name": "Maruf Mohammad Jubayer Hossen",
    "hero.role": "Computer Science & Technology Student · Aspiring Software Developer",
    "hero.intro": "Fourth-year CS student from Bangladesh studying in China. I build with Python, Flask and modern web technologies — with a growing focus on data science and machine learning.",
    "hero.ctaProjects": "View My Projects",
    "hero.ctaContact": "Contact Me",
    "hero.photoAlt": "Portrait of Maruf Mohammad Jubayer Hossen",

    /* about */
    "about.eyebrow": "About Me",
    "about.title": "A student developer between two cultures",
    "about.p1": "I'm a dedicated fourth-year Computer Science and Technology student at Taizhou University, China, originally from Bangladesh. I'm passionate about software development, with hands-on experience in Python, web development and data science, and a strong foundation in data structures, databases and object-oriented programming.",
    "about.p2": "Living and studying abroad has shaped how I work: I communicate across cultures, adapt quickly to new environments and enjoy collaborating in multicultural teams — skills I've built through university activities and competitions in China. I'm a quick learner with a strong sense of responsibility, and I'm looking to apply my technical knowledge in a professional environment.",
    "about.factsTitle": "Quick facts",
    "about.locLabel": "Location",
    "about.locValue": "Taizhou, Zhejiang, China",
    "about.eduLabel": "University",
    "about.degreeLabel": "Degree",

    /* skills */
    "skills.eyebrow": "Skills",
    "skills.title": "What I work with",
    "skills.intro": "Tools and technologies I've used in coursework and projects. Basic-level skills are labelled honestly.",
    "skills.g1Title": "Programming Languages",
    "skills.g2Title": "Tools & Platforms",
    "skills.g3Title": "Domains",
    "skills.g4Title": "Soft Skills",
    "skills.js": "JavaScript (Basic)",
    "skills.kotlin": "Kotlin (Basic)",
    "skills.ds": "Data Science",
    "skills.webdev": "Web Development",
    "skills.ml": "Machine Learning",
    "skills.teamwork": "Teamwork",
    "skills.adapt": "Adaptability",
    "skills.cross": "Cross-cultural Communication",
    "skills.quick": "Quick Learner",

    /* projects */
    "projects.eyebrow": "Projects",
    "projects.title": "Featured project",
    "projects.pvAlt": "Concept preview of a tourism data dashboard interface",
    "projects.conceptLabel": "Concept preview — illustrative mockup, not a screenshot of the actual application",
    "projects.featured": "Featured Project",
    "projects.pTitle": "Tourism Intelligence Dashboard",
    "projects.pDesc": "A tourism data analysis dashboard that turns raw tourism data into an interactive, insight-driven web experience.",
    "projects.techLabel": "Technologies",
    "projects.featuresLabel": "Key features",
    "projects.f1": "Tourism data analysis and exploration using Python and Pandas",
    "projects.f2": "Predictive analytics powered by machine-learning models",
    "projects.f3": "Interactive charts and data visualizations built with Matplotlib",
    "projects.f4": "Responsive web interface developed with Flask",
    "projects.moreTitle": "More projects coming soon",
    "projects.moreText": "This area is reserved for future projects — it will be updated as new work is published.",

    /* experience */
    "exp.eyebrow": "Experience",
    "exp.title": "Where I've worked",
    "exp.company": "Creative Digital Agency",
    "exp.role": "Digital Marketing & Media Team Member",
    "exp.type": "Part-time / Freelance",
    "exp.b1": "Assisted in planning and executing digital marketing campaigns",
    "exp.b2": "Created social media content, promotional materials and marketing strategies",
    "exp.b3": "Worked with team members to improve online brand presence",
    "exp.b4": "Coordinated with clients to understand project requirements",
    "exp.b5": "Supported event promotion and audience engagement",
    "exp.b6": "Contributed graphic and multimedia content for social media platforms",

    /* education */
    "edu.eyebrow": "Education",
    "edu.title": "Academic background",
    "edu.university": "Taizhou University",
    "edu.degree": "Bachelor of Computer Science and Technology",
    "edu.status": "4th Year · International Student",
    "edu.grad": "Expected graduation: 2027",
    "edu.courses": "Relevant coursework",
    "courses.ds": "Data Structures",
    "courses.db": "Database Systems",
    "courses.ai": "Artificial Intelligence",
    "courses.os": "Operating Systems",
    "courses.cn": "Computer Networks",
    "courses.se": "Software Engineering",
    "courses.py": "Python Programming",
    "courses.web": "Web Development",

    /* achievements */
    "ach.eyebrow": "Achievements",
    "ach.title": "Competitions & activities",
    "ach.intro": "University competitions and extracurricular involvement in China.",
    "ach.i1": "Participated in multiple university-level \"Datang Cup\" competitions in China",
    "ach.i2": "Participated in a provincial poetry competition",
    "ach.i3": "Taizhou University Student Union — Publicity Department, multicultural teamwork experience",
    "ach.i4": "Participated in the Zhejiang Province E-commerce Innovation Competition",

    /* languages */
    "lang.eyebrow": "Languages",
    "lang.title": "Languages I speak",
    "lang.banglaName": "Bangla",
    "lang.banglaLevel": "Native",
    "lang.englishName": "English",
    "lang.englishLevel": "Working Proficiency",
    "lang.hindiName": "Hindi",
    "lang.hindiLevel": "Conversational",
    "lang.chineseName": "Chinese",
    "lang.chineseLevel": "HSK Level 4",

    /* contact */
    "contact.eyebrow": "Contact",
    "contact.title": "Let's get in touch",
    "contact.intro": "Have a question or an opportunity to discuss? Feel free to reach out.",
    "contact.emailLabel": "Email",
    "contact.phoneLabel": "Phone",
    "contact.githubLabel": "GitHub",
    "contact.name": "Name",
    "contact.namePh": "Your name",
    "contact.email": "Email",
    "contact.emailPh": "you@example.com",
    "contact.message": "Message",
    "contact.messagePh": "Your message (10–2000 characters)",
    "contact.send": "Send Message",
    "contact.formNote": "Local demo: messages are validated and logged, but not emailed unless SMTP is configured (see README).",
    "contact.errors.name": "Please enter your name (2–100 characters).",
    "contact.errors.email": "Please enter a valid email address.",
    "contact.errors.message": "Please enter a message between 10 and 2000 characters.",

    /* footer */
    "footer.navTitle": "Navigate",
    "footer.rights": "All rights reserved.",
    "footer.built": "Built with Python & Flask",
  },

  zh: {
    /* meta */
    "meta.title": "Maruf Mohammad Jubayer Hossen — 个人作品集",
    "meta.description": "Maruf Mohammad Jubayer Hossen 的个人作品集 —— 台州大学计算机科学与技术专业学生（孟加拉国留学生）。",

    /* skip link, nav */
    "skip.text": "跳到主要内容",
    "nav.home": "首页",
    "nav.about": "关于我",
    "nav.skills": "技能",
    "nav.projects": "项目",
    "nav.experience": "经历",
    "nav.achievements": "成就",
    "nav.contact": "联系我",
    "nav.menuOpen": "打开菜单",
    "nav.menuClose": "关闭菜单",

    /* hero */
    "hero.greeting": "你好，我是",
    "hero.name": "Maruf Mohammad Jubayer Hossen（李诚凯）",
    "hero.role": "计算机科学与技术专业学生 · 志在成为软件开发工程师",
    "hero.intro": "我来自孟加拉国，现于中国就读计算机科学与技术专业四年级。我用 Python、Flask 和现代网页技术进行开发，并专注于数据科学与机器学习方向。",
    "hero.ctaProjects": "查看我的项目",
    "hero.ctaContact": "联系我",
    "hero.photoAlt": "Maruf Mohammad Jubayer Hossen 的个人照片",

    /* about */
    "about.eyebrow": "关于我",
    "about.title": "跨越两种文化的学生开发者",
    "about.p1": "我是台州大学计算机科学与技术专业四年级学生，来自孟加拉国。我热爱软件开发，在 Python、网页开发和数据科学方面具有实践经验，并拥有扎实的数据结构、数据库和面向对象编程基础。",
    "about.p2": "海外求学塑造了我的工作方式：我擅长跨文化沟通，能快速适应新环境，乐于在多元文化团队中合作——这些能力都是通过在中国参加校园活动和竞赛锻炼出来的。我学习能力强、责任心重，期望在专业环境中运用所学技术知识。",
    "about.factsTitle": "基本信息",
    "about.locLabel": "所在地",
    "about.locValue": "中国 浙江 台州",
    "about.eduLabel": "学校",
    "about.degreeLabel": "学位",

    /* skills */
    "skills.eyebrow": "技能",
    "skills.title": "我的技术栈",
    "skills.intro": "我在课程和项目中使用过的工具与技术。基础水平如实体现在标签中。",
    "skills.g1Title": "编程语言",
    "skills.g2Title": "工具与平台",
    "skills.g3Title": "技术领域",
    "skills.g4Title": "软技能",
    "skills.js": "JavaScript（基础）",
    "skills.kotlin": "Kotlin（基础）",
    "skills.ds": "数据科学",
    "skills.webdev": "网页开发",
    "skills.ml": "机器学习",
    "skills.teamwork": "团队合作",
    "skills.adapt": "适应能力",
    "skills.cross": "跨文化沟通",
    "skills.quick": "快速学习",

    /* projects */
    "projects.eyebrow": "项目",
    "projects.title": "精选项目",
    "projects.pvAlt": "旅游数据分析仪表板界面的概念预览图",
    "projects.conceptLabel": "概念预览 —— 示意性示意图，并非实际应用的截图",
    "projects.featured": "精选项目",
    "projects.pTitle": "旅游智能数据分析平台",
    "projects.pDesc": "一个旅游数据分析仪表板，将原始旅游数据转化为交互式、洞察驱动的网页体验。",
    "projects.techLabel": "技术栈",
    "projects.featuresLabel": "核心功能",
    "projects.f1": "使用 Python 和 Pandas 进行旅游数据分析与探索",
    "projects.f2": "基于机器学习模型的预测分析",
    "projects.f3": "使用 Matplotlib 构建交互式图表与数据可视化",
    "projects.f4": "基于 Flask 开发的响应式网页界面",
    "projects.moreTitle": "更多项目即将上线",
    "projects.moreText": "此区域预留给未来的项目，将持续更新。",

    /* experience */
    "exp.eyebrow": "工作经历",
    "exp.title": "我的经历",
    "exp.company": "创意数字营销机构",
    "exp.role": "数字营销与媒体团队成员",
    "exp.type": "兼职 / 自由职业",
    "exp.b1": "协助策划和执行数字营销活动",
    "exp.b2": "制作社交媒体内容、宣传材料和营销策略",
    "exp.b3": "与团队成员合作提升在线品牌影响力",
    "exp.b4": "与客户协调沟通，了解项目需求",
    "exp.b5": "支持活动推广和受众互动",
    "exp.b6": "为社交媒体平台贡献图文和多媒体内容",

    /* education */
    "edu.eyebrow": "教育背景",
    "edu.title": "学习经历",
    "edu.university": "台州大学",
    "edu.degree": "计算机科学与技术 学士学位",
    "edu.status": "四年级 · 国际学生",
    "edu.grad": "预计毕业：2027 年",
    "edu.courses": "相关课程",
    "courses.ds": "数据结构",
    "courses.db": "数据库系统",
    "courses.ai": "人工智能",
    "courses.os": "操作系统",
    "courses.cn": "计算机网络",
    "courses.se": "软件工程",
    "courses.py": "Python 编程",
    "courses.web": "网页开发",

    /* achievements */
    "ach.eyebrow": "成就",
    "ach.title": "竞赛与活动",
    "ach.intro": "在中国参加的校园竞赛与课外活动。",
    "ach.i1": "多次参加中国大学级别的“大唐杯”竞赛",
    "ach.i2": "参加省级诗歌比赛",
    "ach.i3": "台州大学学生会宣传部成员 —— 多元文化团队合作经历",
    "ach.i4": "参加浙江省电子商务三创赛",

    /* languages */
    "lang.eyebrow": "语言能力",
    "lang.title": "我使用的语言",
    "lang.banglaName": "孟加拉语",
    "lang.banglaLevel": "母语",
    "lang.englishName": "英语",
    "lang.englishLevel": "工作熟练",
    "lang.hindiName": "印地语",
    "lang.hindiLevel": "会话水平",
    "lang.chineseName": "中文",
    "lang.chineseLevel": "HSK 4 级",

    /* contact */
    "contact.eyebrow": "联系方式",
    "contact.title": "与我联系",
    "contact.intro": "有问题或合作机会？欢迎随时联系我。",
    "contact.emailLabel": "邮箱",
    "contact.phoneLabel": "电话",
    "contact.githubLabel": "GitHub",
    "contact.name": "姓名",
    "contact.namePh": "您的姓名",
    "contact.email": "邮箱",
    "contact.emailPh": "you@example.com",
    "contact.message": "留言内容",
    "contact.messagePh": "您的留言（10–2000 字）",
    "contact.send": "发送消息",
    "contact.formNote": "本地演示：留言会经过验证并记录到日志，但除非配置了 SMTP，否则不会真正发送邮件（详见 README）。",
    "contact.errors.name": "请输入您的姓名（2–100 个字符）。",
    "contact.errors.email": "请输入有效的邮箱地址。",
    "contact.errors.message": "留言长度需在 10 到 2000 个字符之间。",

    /* footer */
    "footer.navTitle": "快速导航",
    "footer.rights": "保留所有权利。",
    "footer.built": "使用 Python 与 Flask 构建",
  },
};

/* Server-side flash messages → translation keys (message text must match
   the strings flashed in app.py exactly). */
const FLASH_KEYS = {
  "Security check failed. Please reload the page and try again.": "flash.csrf",
  "Please enter your name (2–100 characters).": "flash.name",
  "Please enter a valid email address.": "flash.email",
  "Please enter a message between 10 and 2000 characters.": "flash.message",
  "Thanks for reaching out! Your message has been sent.": "flash.sent",
  "Sorry, the email could not be sent. Please try again later.": "flash.failed",
  "This site runs in demo mode, so no email was sent. Your message was validated and logged for the developer.": "flash.demo",
};

/* 3. Language switcher ------------------------------------------------------ */
const LANG_KEY = "portfolio-lang";

function t(lang, key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

function applyLanguage(lang) {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (el.matches("meta")) {
      el.setAttribute("content", t(lang, el.dataset.i18n));
    } else {
      el.textContent = t(lang, el.dataset.i18n);
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(lang, el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(lang, el.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    el.alt = t(lang, el.dataset.i18nAlt);
  });

  /* Translate flash messages that came from the server in English */
  document.querySelectorAll("[data-flash]").forEach((el) => {
    const key = FLASH_KEYS[el.dataset.flash];
    if (key) el.textContent = t(lang, key);
  });

  /* Highlight the active button */
  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  /* Re-run validation labels if the user already typed an invalid value */
  validateForm(undefined, true);

  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (_) {
    /* localStorage unavailable — language simply won't persist */
  }
}

function initLanguage() {
  let saved = "en";
  try {
    saved = localStorage.getItem(LANG_KEY) || "en";
  } catch (_) { /* ignore */ }
  if (saved !== "en" && saved !== "zh") saved = "en";
  applyLanguage(saved);

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
}

/* 4. Intro loader cleanup --------------------------------------------------- */
/* The loader is removed by CSS on its own (~1.65s); JS also drops it from
   the DOM afterwards so it can never intercept clicks or focus. */
function cleanupLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(() => loader.remove(), 1800);
  }
}

/* 5. Header state + mobile menu --------------------------------------------- */
function initHeader() {
  const header = document.getElementById("site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    const lang = document.documentElement.lang === "zh-CN" ? "zh" : "en";
    toggle.setAttribute("aria-label", t(lang, open ? "nav.menuClose" : "nav.menuOpen"));
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));

  /* Close when a link is chosen */
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));

  /* Close on Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  /* Reset if the viewport grows to desktop width */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) setOpen(false);
  });
}

/* 6. Scroll reveal + active navigation -------------------------------------- */
function initScrollEffects() {
  /* Section reveal */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* Active nav link */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) =>
              link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`)
            );
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
  }
}

/* 7. Contact form client-side validation ------------------------------------ */
const VALIDATORS = {
  name: (value) => {
    if (value.length < 2 || value.length > 100) return "contact.errors.name";
    return "";
  },
  email: (value) => {
    if (value.length < 5 || value.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "contact.errors.email";
    return "";
  },
  message: (value) => {
    if (value.length < 10 || value.length > 2000) return "contact.errors.message";
    return "";
  },
};

function validateForm(event, silent) {
  const form = document.getElementById("contact-form");
  if (!form) return true;

  const lang = document.documentElement.lang === "zh-CN" ? "zh" : "en";
  let allValid = true;

  Object.keys(VALIDATORS).forEach((fieldName) => {
    const input = form.elements[fieldName];
    const errorEl = document.getElementById(`cf-${fieldName}-error`);
    const fieldWrap = input.closest(".form-field");
    const errorKey = VALIDATORS[fieldName](input.value.trim());

    if (errorKey) {
      allValid = false;
      input.setAttribute("aria-invalid", "true");
      if (errorEl) {
        errorEl.textContent = t(lang, errorKey);
        errorEl.hidden = false;
      }
      if (fieldWrap) fieldWrap.classList.add("has-error");
    } else {
      input.removeAttribute("aria-invalid");
      if (errorEl) errorEl.hidden = true;
      if (fieldWrap) fieldWrap.classList.remove("has-error");
    }
  });

  if (event && !allValid) event.preventDefault();
  return allValid;
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", validateForm);

  /* Clear the error for a field as soon as the user edits it */
  Object.keys(VALIDATORS).forEach((fieldName) => {
    const input = form.elements[fieldName];
    const errorEl = document.getElementById(`cf-${fieldName}-error`);
    const fieldWrap = input.closest(".form-field");
    input.addEventListener("input", () => {
      input.removeAttribute("aria-invalid");
      if (errorEl) errorEl.hidden = true;
      if (fieldWrap) fieldWrap.classList.remove("has-error");
    });
  });
}

/* 8. Footer year ------------------------------------------------------------- */
function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

/* Init ---------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  /* LinkedIn placeholder: only show the button when a real URL is set */
  const linkedinLi = document.getElementById("linkedin-li");
  const linkedinLink = document.getElementById("linkedin-link");
  if (linkedinLi && linkedinLink) {
    if (LINKEDIN_URL) {
      linkedinLink.href = LINKEDIN_URL;
    } else {
      linkedinLi.hidden = true;
    }
  }

  cleanupLoader();
  initLanguage();
  initHeader();
  initMobileMenu();
  initScrollEffects();
  initContactForm();
  initYear();
});
