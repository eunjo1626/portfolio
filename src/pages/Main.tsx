import { useState } from "react";
import "../styles/main.css";
import { useNavigate } from "react-router-dom";

type Stage = "plane" | "paper" | "exit" | "go";

export default function Main() {
  const [stage, setStage] = useState<Stage>("plane");
  const navigate = useNavigate();

  return (
    <div className="morph-stage">

      {/* 🏷 좌측 상단 타이틀 */}
      <div className="main-title">
        Eunjo Choi · Publisher
      </div>

      {/* ☁️ 배경 구름 */}
      <div className="cloud cloud-1 front" />
      <div className="cloud cloud-2 front" />
      <div className="cloud cloud-3 front" />

      {/* 🎭 메인 오브젝트 */}
      <div
        className={`morph-object ${stage}`}
        onAnimationEnd={() => {
          if (stage === "exit") setStage("plane");
          if (stage === "go") navigate("/project");
        }}
      >
        {/* ✈ 비행기 */}
        <button
          className="plane-layer"
          onClick={() => setStage("paper")}
          disabled={stage !== "plane"}
        >
          <span className="plane-trail" />
          <svg viewBox="0 0 64 64" width="450" height="450">
            <path
              d="M56.6 29.7 10.9 12.4c-1-.4-2 .5-1.7 1.6l4.2 15.6
                 18.4 2.4-18.4 2.4-4.2 15.6c-.3 1.1.7 2 1.7 1.6
                 l45.7-17.3c1.1-.4 1.1-2 0-2.4Z"
              fill="white"
            />
          </svg>
        </button>

        {/* 📄 종이 */}
        <div className="paper-layer">
          <div className="paper-header">
            <h1>About Me</h1>
          </div>

          <div className="paper-content">
            <section className="paper-section">
              <p>
                <strong style={{fontSize:15}}>안녕하세요 </strong>👋<br />
                약 7년간 회계 업무를 수행하며<br />
                정확성과 구조적인 정리가 요구되는 환경에서 근무를 했습니다.
              </p>

              <p>
                업무 과정에서 여러 회사 홈페이지들을 보면서<br />
                내부 시스템 화면을 접하며,<br />
                화면이 어떻게 구성되고 사용자에게 전달되는지에
                자연스럽게 관심을 가지게 되었습니다.
              </p>
            </section>

            <section className="paper-section skills">
              <h2>Skills</h2>
              <ul className="pill-list">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React 환경 퍼블리싱</li>
              </ul>
            </section>

            <section className="paper-section">
              <p>
                회계 업무를 통해 쌓은 꼼꼼함과 정리 능력을 바탕으로,<br />
                반복 작업이나 디테일한 UI 요소도 안정적으로 구현하는 것을
                강점으로 가지고 있습니다.
              </p>
              <p>
                작업 시에는 시안과 구조를 먼저 정리한 뒤,<br />
                재사용 가능한 마크업과 일관된 스타일을 유지하는 것을
                중요하게 생각합니다.
              </p>
            </section>

            <section className="paper-section contact">
              <h2>Contact</h2>
              <div className="contact-row">
                <span>Email</span>
                <span>
                  <a href="mailto:choeeunjo@naver.com">
                    choeeunjo@naver.com
                  </a>
                </span>
              </div>
              <div className="contact-row">
                <span>Phone</span>
                <span>
                  <a href="tel:01024869566">010-2486-9566</a>
                </span>
              </div>
            </section>
          </div>

          {/* 🔘 액션 버튼 */}
          <div className="paper-actions">
            <span>Project 파일 보시겠습니까?</span>
            <div className="buttons">
              <button
                className="yes"
                onClick={(e) => {
                  e.currentTarget.blur();
                  setStage("go");
                }}
              >
                Yes
              </button>
              <button
                className="no"
                onClick={(e) => {
                  e.currentTarget.blur();
                  setStage("exit");
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 💡 힌트 문구 */}
      {stage === "plane" && (
        <div className="hint">
          비행기를 클릭해보세요
        </div>
      )}
    </div>
  );
}
