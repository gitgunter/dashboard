import { useState } from 'react';
import { useQuery } from 'react-query';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

import { Page } from '@components/Page/Page';
import { PageNavigationBar } from '@components/PageNavigationBar/PageNavigationBar';
import { getQuestions } from '@services/examService';
import { UnMinutoExam } from '@components/UnMinutoExam/UnMinutoExam';
import TeodriveButton from '@components/TeodriveButton/TeodriveButton';
import EmptyState from '@components/EmptyState/EmptyState';

import { Add01, Timer02 } from '@icons/index';

import css from './UnMinuto.module.css';

function UnMinuto() {
  const [isExamInProgress, setIsExamInProgress] = useState(false);
  const [questionData, setQuestionData] = useState(null);

  const breadcrumbs = ['Modalidades', 'Un Minuto'];

  const questionQuery = useQuery(['questions'], () => getQuestions(200), {
    enabled: false,
    onSuccess: (res) => {
      setQuestionData(res.data);
    },
  });

  const handleCreateUnMinuto = async () => {
    await questionQuery.refetch();
    setIsExamInProgress(true);
  };

  const handleCancelUnMinuto = () => {
    setIsExamInProgress(false);
    setQuestionData(null);
  };

  const unMinutoConfig = {
    name: 'Un Minuto',
    timeLimit: 1,
  };

  return (
    <Page
      title='Un Minuto - Teodrive'
      metaDesc='Responde el máximo de preguntas en un minuto'
      canonical='modalidades/un-minutoun-minuto'
    >
      <div className={css.unMinutoContainer}>
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            {isExamInProgress && questionData && (
              <UnMinutoExam
                questions={questionData}
                config={unMinutoConfig}
                onClose={handleCancelUnMinuto}
              />
            )}
          </AnimatePresence>
        </LazyMotion>
        <PageNavigationBar
          breadcrumbs={breadcrumbs}
          title='Un Minuto'
          caption='Responde el máximo de preguntas en un minuto'
          number={0}
        >
          <TeodriveButton
            onClick={handleCreateUnMinuto}
            title='Nuevo'
            size='small'
            icon={<Add01 size={20} />}
          >
            Nuevo
          </TeodriveButton>
        </PageNavigationBar>
        <EmptyState
          icon={<Timer02 size={32} color='#207FD6' />}
          title='Sin Un Minuto'
          caption='Empieza creando un minuto nuevo.'
          action={
            <TeodriveButton
              onClick={handleCreateUnMinuto}
              title='Nuevo'
              size='small'
              icon={<Add01 size={20} />}
            >
              Nuevo
            </TeodriveButton>
          }
        />
      </div>
    </Page>
  );
}

export default UnMinuto;
