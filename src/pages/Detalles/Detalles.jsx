import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { Page } from '@components/Page/Page';
import { PageNavigationBar } from '@components/PageNavigationBar/PageNavigationBar';
import LoadingState from '@components/LoadingState/LoadingState';
import { getExam } from '@services/examService.js';
import { ArrowLeft02 } from '@icons/index';

import css from './Detalles.module.css';

function Detalles() {
  const [segmentedControl, setSegmentedControl] = useState('aciertos');

  const { id } = useParams();
  const navigate = useNavigate();

  const resultsQuery = useQuery(['results'], () => getExam(id));

  const breadcrumbs = ['General', 'Exámenes', 'Detalles'];

  const tabs = [
    {
      id: 'aciertos',
      label: 'Aciertos',
      content: resultsQuery?.data?.correctData,
    },
    {
      id: 'fallos',
      label: 'Fallos',
      content: resultsQuery?.data?.incorrectData,
    },
  ];

  const handleTabClick = (tabId) => {
    setSegmentedControl(tabId);
  };

  return (
    <Page
      title='Detalles - Teodrive'
      metaDesc='Informe detallado de los resultados de tu examen'
      canonical='quick-test'
    >
      <div className={css.detallesContainer}>
        <PageNavigationBar
          breadcrumbs={breadcrumbs}
          onGoBack={() => navigate(-1)}
          title='Detalles'
          caption='Informe detallado de los resultados de tu examen'
        />
        <div className={css.tabWrapper}>
          {tabs.map((tab, i) => (
            <div
              key={i}
              onContextMenu={(e) => e.preventDefault()}
              onClick={() => handleTabClick(tab.id)}
              className={`${css.control} ${
                segmentedControl === tab.id && css.active
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className={css.tabContentWrapper}>
          {resultsQuery.isFetching ? (
            <LoadingState />
          ) : (
            tabs.map((tab) => (
              <div key={tab.id} className={css.tabContent}>
                {segmentedControl === tab.id &&
                  !resultsQuery.isLoading &&
                  JSON.parse(tab?.content).map((content, index) => (
                    <div key={index} className={css.tabContentItem}>
                      <p className={css.question}>{content.question}</p>
                      <Answer
                        label='Tu respuesta'
                        letter={content.userAnswerLetter}
                        answer={content.userAnswerText}
                        state={
                          content.userAnswerLetter ===
                          content.correctAnswerLetter
                        }
                      />

                      <Answer
                        label='Respuesta correcta'
                        letter={content.correctAnswerLetter}
                        answer={content.correctAnswerText}
                        state={true}
                      />
                    </div>
                  ))}
              </div>
            ))
          )}
        </div>
      </div>
    </Page>
  );
}
export default Detalles;

export const GoBackBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      type='button'
      className={css.goBackBtn}
      onClick={() => navigate(-1)}
    >
      <ArrowLeft02 size={20} />
      Volver
    </button>
  );
};

export const Answer = ({ label, letter, answer, state }) => {
  return (
    <div className={css.letterWithAnswer}>
      <h2 className={css.answerLabel}>{`${label}:`}</h2>
      <div
        style={{
          display: 'inline-flex',
          columnGap: '0.625rem',
        }}
      >
        <span
          className={`${css.letter} ${state ? css.correct : css.incorrect}`}
        >
          {letter}
        </span>
        <p className={css.answer}>{answer}</p>
      </div>
    </div>
  );
};

// export const Tabs = ({ tabs }) => {
//   const [activeTab, setActiveTab] = useState(tabs[0].id);
//   const sliderRef = useRef(null);
//   const tabButtonsRef = useRef(null);

//   useEffect(() => {
//     const activeButton = tabButtonsRef.current.querySelector(
//       `.${css.tabBtn}[data-tab-id="${activeTab}"]`
//     );
//     if (activeButton && sliderRef.current) {
//       const { width, left } = activeButton.getBoundingClientRect();
//       const offsetLeft = tabButtonsRef.current.getBoundingClientRect().left;
//       sliderRef.current.style.width = `${width}px`;
//       sliderRef.current.style.transform = `translateX(${left - offsetLeft}px)`;
//     }
//   }, [activeTab, tabs]);

//   const handleTabClick = (tabId) => {
//     setActiveTab(tabId);
//   };

//   return (
//     <div>
//       <div className={css.tabWrapper} ref={tabButtonsRef}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             className={css.tabBtn}
//             data-tab-id={tab.id}
//             onClick={() => handleTabClick(tab.id)}
//           >
//             {tab.label}
//           </button>
//         ))}
//         <div className={css.slider} ref={sliderRef}></div>
//       </div>
//       <div className='tab-content'>
//         {tabs.map((tab) => (
//           <div key={tab.id}>{activeTab === tab.id && tab.content}</div>
//         ))}
//       </div>
//     </div>
//   );
// };
