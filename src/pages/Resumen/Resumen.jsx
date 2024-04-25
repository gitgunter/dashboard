import { useQuery } from 'react-query';

import { useAuth } from '@context/AuthContext';
import { Page } from '@components/Page/Page';
import { Breadcrumbs } from '@components/Breadcrumbs/Breadcrumbs';
import { StatisticsCardWrapper } from '@components/StatisticsCardWrapper/StatisticsCardWrapper';
import { DateTimeCard } from '@components/DateTimeCard/DateTimeCard';
import { RestrictionCard } from '@components/RestrictionCard/RestrictionCard';
import WelcomeMessage from '@components/WelcomeMessage/WelcomeMessage';
import { Hourglass, ThumbsUpDown, Timer02 } from '@icons/index';
import { Emoji } from 'emoji-picker-react';
import { getAllExams } from '@services/examService';

import css from './Resumen.module.css';
import { getAllNotes } from '@services/noteService';

function Resumen() {
  const { isLoading, data } = useAuth();

  const breadcrumbs = ['General', 'Resumen'];

  const examsQuery = useQuery(['exams'], getAllExams);
  const noteQuery = useQuery(['notes'], getAllNotes);

  function slateFormat(data) {
    const texts = JSON.parse(data)
      .map((item) => item.children.map((child) => child.text))
      .flat();

    const paragraph = texts.join(' ');

    return paragraph;
  }

  return (
    <Page
      title='Resumen - Teodrive'
      metaDesc='Resumen de tu progreso por Teodrive'
      className={css.Resumen}
    >
      <div className={css.resumenContainer}>
        <div className={css.pageNavigationBar}>
          <Breadcrumbs paths={breadcrumbs} />
          <div className={css.headerWrapper}>
            <div className={css.titleAndCaption}>
              <WelcomeMessage username={isLoading ? '--' : data.username} />
              <p className={css.caption}>Resumen de tu progreso por Teodrive</p>
            </div>
          </div>
        </div>
        <div className={css.resumenGrid}>
          <StatisticsCardWrapper
            aciertos={isLoading ? 0 : data.hits}
            fallos={isLoading ? 0 : data.failures}
            examenes={isLoading ? 0 : data.examCounter}
            modalidades={isLoading ? 0 : data.modeCounter}
            id={css.StatisticsCardWrapper}
          />
          <DateTimeCard id={css.DateTimeCard} />
          <RestrictionCard id={css.RestrictionCard} />
          <div id={css.extra}></div>
          <div id={css.box1}>
            <h1 className={css.cardSectionTitle}>Exámenes</h1>
            <div className={css.overflowscroll}>
              {examsQuery.isLoading
                ? 'Cargando...'
                : examsQuery.data
                    .slice(Math.max(examsQuery.data?.length - 4, 0))
                    .reverse()
                    .map((exam) => (
                      <div className={css.overviewExamCard} key={exam.id}>
                        <div className={css.cardLeft}>
                          <h1 className={css.examName}>{exam.name}</h1>
                          <h2
                            className={`${css.examStatus} ${
                              exam.status === 'Aprobado'
                                ? css.approved
                                : css.failed
                            }`}
                          >
                            {exam.status}
                          </h2>
                        </div>
                        <div className={css.cardRight}>
                          <h1
                            className={`${css.examScore} ${
                              exam.status === 'Aprobado'
                                ? css.approved
                                : css.failed
                            }`}
                          >
                            {exam.score}
                          </h1>
                          <h2 className={css.examScoreLabel}>Nota</h2>
                        </div>
                      </div>
                    ))}
            </div>
          </div>
          <div id={css.box2}>
            <h1 className={css.cardSectionTitle}>Modalidades</h1>
            <div className={css.overflowscroll}>
              <div className={css.overviewUnMinutoCard}>
                <Timer02 size={24} className={css.icon} />
                <div className={css.cardLeft}>
                  <h1 className={css.modeName}>Un minuto</h1>
                  <h2 className={css.createdAt}>31 May 2024</h2>
                </div>
                <div className={css.cardRight}>
                  <h1 className={css.modeScore}>32</h1>
                  <h2 className={css.modeScoreLabel}>Preguntas</h2>
                </div>
              </div>
              <div className={css.overviewUnMinutoCard}>
                <ThumbsUpDown size={24} className={css.icon} />
                <div className={css.cardLeft}>
                  <h1 className={css.modeName}>Verdad o falso</h1>
                  <h2 className={css.createdAt}>31 May 2024</h2>
                </div>
                <div className={css.cardRight}>
                  <h1 className={css.modeScore}>32 / 11</h1>
                  <h2 className={css.modeScoreLabel}>V / F</h2>
                </div>
              </div>
              <div className={css.overviewUnMinutoCard}>
                <Hourglass size={24} className={css.icon} />
                <div className={css.cardLeft}>
                  <h1 className={css.modeName}>Quick test</h1>
                  <h2 className={css.createdAt}>31 May 2024</h2>
                </div>
                <div className={css.cardRight}>
                  <h1 className={css.modeScore}>68</h1>
                  <h2 className={css.modeScoreLabel}>Nota</h2>
                </div>
              </div>
              <div className={css.overviewUnMinutoCard}>
                <Hourglass size={24} className={css.icon} />
                <div className={css.cardLeft}>
                  <h1 className={css.modeName}>Quick test</h1>
                  <h2 className={css.createdAt}>31 May 2024</h2>
                </div>
                <div className={css.cardRight}>
                  <h1 className={css.modeScore}>68</h1>
                  <h2 className={css.modeScoreLabel}>Nota</h2>
                </div>
              </div>
            </div>
          </div>
          <div id={css.box3}>
            <h1 className={css.cardSectionTitle}>Notas</h1>
            <div className={css.overflowscroll}>
              <div className={css.overviewNoteGrid}>
                {noteQuery.isLoading
                  ? 'Cargando...'
                  : noteQuery.data
                      .slice(Math.max(noteQuery.data?.length - 4, 0))
                      .reverse()
                      .map((note, index) => (
                        <NoteCard
                          key={index}
                          id={note.id}
                          emoji={note.emoji}
                          title={slateFormat(note.title)}
                          content={slateFormat(note.content)}
                          date={note.createdAt
                            .split(',')
                            .slice(0, 2)
                            .join(',')
                            .replace(',', '')}
                        />
                      ))}
              </div>
            </div>
          </div>
        </div>
        {/* <div className={css.overviewExamCard}>
          <div className={css.cardLeft}>
            <h1 className={css.examName}>Examen</h1>
            <h2 className={`${css.examStatus} ${css.approved}`}>Aprobado</h2>
          </div>
          <div className={css.cardRight}>
            <h1 className={`${css.examScore} ${css.approved}`}>92</h1>
            <h2 className={css.examScoreLabel}>Nota</h2>
          </div>
        </div>
        <div className={css.overviewUnMinutoCard}>
          <Timer02 size={24} className={css.icon} />
          <div className={css.cardLeft}>
            <h1 className={css.modeName}>Un minuto</h1>
            <h2 className={css.createdAt}>31 May 2024</h2>
          </div>
          <div className={css.cardRight}>
            <h1 className={css.modeScore}>32</h1>
            <h2 className={css.modeScoreLabel}>Preguntas</h2>
          </div>
        </div>
        <div className={css.overviewUnMinutoCard}>
          <ThumbsUpDown size={24} className={css.icon} />
          <div className={css.cardLeft}>
            <h1 className={css.modeName}>Verdad o falso</h1>
            <h2 className={css.createdAt}>31 May 2024</h2>
          </div>
          <div className={css.cardRight}>
            <h1 className={css.modeScore}>32 / 11</h1>
            <h2 className={css.modeScoreLabel}>V / F</h2>
          </div>
        </div>
        <div className={css.overviewUnMinutoCard}>
          <Hourglass size={24} className={css.icon} />
          <div className={css.cardLeft}>
            <h1 className={css.modeName}>Quick test</h1>
            <h2 className={css.createdAt}>31 May 2024</h2>
          </div>
          <div className={css.cardRight}>
            <h1 className={css.modeScore}>68</h1>
            <h2 className={css.modeScoreLabel}>Nota</h2>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '404px',
            columnGap: '0.625rem',
          }}
        >
          <NoteCard
            emoji='1fae5'
            title='Something'
            content='Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
          />
          <NoteCard
            emoji='1fae5'
            title='Something'
            content='Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '404px',
            columnGap: '0.625rem',
          }}
        >
          <NoteCard
            emoji='1fae5'
            title='Something'
            content='Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
          />
          <NoteCard
            emoji='1fae5'
            title='Something'
            content='Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
          />
        </div> */}
      </div>
    </Page>
  );
}
export default Resumen;

export const NoteCard = ({ emoji, title, content, date, onNoteClick }) => {
  return (
    <div className={css.NoteCard} onClick={onNoteClick}>
      <div className={css.noteCardHeader}>
        <Emoji unified={emoji} size={40} />
        <h2 className={css.noteCardDate}>{date}</h2>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', rowGap: '0.625rem' }}
      >
        <h1 className={css.noteCardTitle}>{title}</h1>
        <p className={css.noteCardContent}>{content}</p>
      </div>
    </div>
  );
};
