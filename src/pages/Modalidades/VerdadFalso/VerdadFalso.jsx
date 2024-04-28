import { useState } from 'react';
import { useQuery } from 'react-query';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

import { Page } from '@components/Page/Page';
import { PageNavigationBar } from '@components/PageNavigationBar/PageNavigationBar';
import { getBooleanQuestions } from '@services/examService.js';
import { VerdadFalsoExam } from '@components/VerdadFalsoExam/VerdadFalsoExam';
import TeodriveButton from '@components/TeodriveButton/TeodriveButton';

import { Add01 } from '@icons/index';

import css from './VerdadFalso.module.css';

function VerdadFalso() {
  const [isExamInProgress, setIsExamInProgress] = useState(false);
  const [questionData, setQuestionData] = useState(null);

  const breadcrumbs = ['Modalidades', 'Verdad o falso'];

  const questionQuery = useQuery(['questions'], () => getBooleanQuestions(15), {
    enabled: false,
    onSuccess: (res) => {
      console.log(res);
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

  const verdadFalsoConfig = {
    name: 'Verdad o falso',
    timeLimit: 30,
  };

  return (
    <Page
      title='Verdad o falso - Teodrive'
      metaDesc='Preguntas de selección en las que decides si una afirmación es verdadera o falsa'
      canonical='modalidades/verdad-falso'
    >
      <div className={css.verdadFalsoContainer}>
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            {isExamInProgress && questionData && (
              <VerdadFalsoExam
                questions={questionData}
                config={verdadFalsoConfig}
                onClose={handleCancelUnMinuto}
              />
            )}
          </AnimatePresence>
        </LazyMotion>
        <PageNavigationBar
          breadcrumbs={breadcrumbs}
          title='Verdad o falso'
          caption='Preguntas de selección en las que decides si una afirmación es verdadera o falsa'
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
        <div></div>
      </div>
    </Page>
  );
}
export default VerdadFalso;
