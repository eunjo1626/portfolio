import { useState, useEffect, useRef } from "react";
import Layout from "../components/layout";
import "../styles/project.css";

/* ======================
   데이터
====================== */

const PROJECTS = {
  Personal: [
    { title: "Japan Travel", desc: "개인 창작 과제", link: "https://eunjo1626.github.io/travel/" },
    { title: "CRUD System", desc: "계산서, 명세서 CRUD", link: "https://eunjo1626.github.io/react-invoice-crud/" }
  ],
  React: [
    { title: "Shopping Mall", desc: "리액트 쇼핑몰", link: "https://eunjo1626.github.io/project01/" }
  ],
  Team: [
    { title: "Gyeryong Tourism", desc: "메인 페이지 마크업", link: "https://minshork.github.io/lineup-project/" }
  ],
  Copy: [
    { title: "Eroom", desc: "Copy site", link: "https://eunjo1626.github.io/erom/" },
    { title: "Woodin", desc: "Copy site", link: "https://eunjo1626.github.io/woodin/" }
  ],
  Game: [
    { title: "Brick Breaker", desc: "Canvas game", link: "https://eunjo1626.github.io/brick-braek-game/" },
    { title: "Number Guess", desc: "Simple game", link: "https://eunjo1626.github.io/number-guess-game/" }
  ]
} as const;

type CategoryKey = keyof typeof PROJECTS;
type ViewMode = "category" | "all";

const ALL_PROJECTS = Object.values(PROJECTS).flat();

/* ======================
   컴포넌트
====================== */

export default function Project() {
  const [viewMode, setViewMode] = useState<ViewMode>("category");
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const allRef = useRef<HTMLElement | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  /* ======================
     IntersectionObserver
     (스크롤로 내려온 경우)
  ====================== */
  useEffect(() => {
  if (!allRef.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
        if (isAutoScrolling) return; // 🔥 핵심
      if (entry.isIntersecting) {
  setViewMode(prev => {
    if (prev !== "all") setActiveCategory(null);
    return "all";
  });
} else {
  setViewMode(prev => (prev === "all" ? "category" : prev));
}
    },
    {
      threshold: 0.2, // 20% 보일 때 기준 (중요)
       rootMargin: "-20% 0px 0px 0px", // 🔥 이 줄 추가
    }
  );

  observer.observe(allRef.current);
  return () => observer.disconnect();
}, [isAutoScrolling]);

  return (
      <Layout>
      <div
        className="project-wrapper"
        onMouseLeave={() => setActiveCategory(null)}
      >
        {/* ======================
            All Projects 링크
        ====================== */}
       <div
          className="all-projects-link"
          onClick={() => {
  setIsAutoScrolling(true);
  setViewMode("all");
  setActiveCategory(null);

  requestAnimationFrame(() => {
    allRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  // 스크롤 애니메이션 끝난 뒤 observer 다시 허용
  setTimeout(() => {
    setIsAutoScrolling(false);
  }, 600); // smooth scroll 대략 시간
}}

        >
          All Projects ↓
        </div>


        {/* ======================
            상단 카테고리 영역
        ====================== */}
        <section className="project-focus">
          <div className="top-categories">
            {(["Personal", "React", "Team"] as CategoryKey[]).map(cat => (
              <div
                key={cat}
                className="category-card"
                onMouseEnter={() => {
  if (viewMode !== "category") {
    setViewMode("category");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  setActiveCategory(cat);
}}

              >
                {cat}
              </div>
            ))}
          </div>

          <div className="focus-center">
            {activeCategory ?? "Hover a category"}
          </div>

          <div className="bottom-categories">
            {(["Copy", "Game"] as CategoryKey[]).map(cat => (
              <div
                key={cat}
                className="category-card"
                onMouseEnter={() => {
  if (viewMode !== "category") {
    setViewMode("category");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  setActiveCategory(cat);
}}

              >
                {cat}
              </div>
            ))}
          </div>
        </section>

        {/* ======================
            카테고리별 프로젝트
        ====================== */}
        {viewMode === "category" && activeCategory && (
          <section className="project-list">
            {PROJECTS[activeCategory].map((project, index) => (
              <div
                key={index}
                className="project-card"
                onClick={() => window.open(project.link, "_blank")}
              >
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            ))}
          </section>
        )}

     

        {/* ======================
            All Projects
        ====================== */}
        <section
  ref={allRef}
  className={`project-all ${viewMode === "all" ? "visible" : ""}`}
>
  <h2 className="project-all-title">All Projects</h2>

  <div className="project-all-grid">
    {ALL_PROJECTS.map((project, index) => (
      <div
        key={index}
        className="project-card"
        onClick={() => window.open(project.link, "_blank")}
      >
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
      </div>
    ))}
  </div>
</section>
      </div>
    </Layout>
  );
}
