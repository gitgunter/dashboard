import { useState } from 'react';
import { useQuery } from 'react-query';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

import { Page } from '@components/Page/Page';
import { PageNavigationBar } from '@components/PageNavigationBar/PageNavigationBar';
import { getQuestions } from '@services/examService';
import {
  deleteQuickTest,
  getAllQuickTests,
} from '@services/quickTestService.js';
import { QuickTestExam } from '@components/QuickTestExam/QuickTestExam';
import { ExamCard } from '@components/ExamCard/ExamCard.jsx';
import TeodriveButton from '@components/TeodriveButton/TeodriveButton';
import EmptyState from '@components/EmptyState/EmptyState';
import LoadingState from '@components/LoadingState/LoadingState';
import arrObjLength from '@utils/arrayObjectLength.js';

import { Add01, Hourglass } from '@icons/index';

import css from './QuickTest.module.css';
import useDeleteMutation from '@hooks/useDeleteMutation';

function QuickTest() {
  const [isExamInProgress, setIsExamInProgress] = useState(false);
  const [questionData, setQuestionData] = useState(null);

  const breadcrumbs = ['Modalidades', 'Quick Test'];

  const quickTestQuery = useQuery(['quicktest'], getAllQuickTests);

  const questionQuery = useQuery(['questions'], () => getQuestions(15), {
    enabled: false,
    onSuccess: (res) => {
      setQuestionData(res.data);
    },
  });

  const handleCreateQuickTest = async () => {
    await questionQuery.refetch();
    setIsExamInProgress(true);
  };

  const handleCancelQuickTest = () => {
    setIsExamInProgress(false);
    setQuestionData(null);
  };

  const quickTestConfig = {
    name: 'Quick Test',
    timeLimit: 30,
  };

  const deleteMutation = useDeleteMutation('quicktest', deleteQuickTest);
  const objLength = arrObjLength(
    !quickTestQuery.isLoading && quickTestQuery?.data
  );

  return (
    <Page
      title='Quick Test - Teodrive'
      metaDesc='Una prueba rápida y sencilla para evaluar tus conocimientos'
      canonical='modalidades/quick-test'
    >
      <div className={css.quickTestContainer}>
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            {isExamInProgress && questionData && (
              <QuickTestExam
                questions={questionData}
                config={quickTestConfig}
                onClose={handleCancelQuickTest}
              />
            )}
          </AnimatePresence>
        </LazyMotion>
        <PageNavigationBar
          breadcrumbs={breadcrumbs}
          title='Quick Test'
          caption='Una prueba rápida y sencilla para evaluar tus conocimientos'
          number={objLength}
        >
          {!objLength <= 0 && (
            <TeodriveButton
              onClick={handleCreateQuickTest}
              size='small'
              title='Nuevo'
              icon={<Add01 size={20} />}
            >
              Nuevo
            </TeodriveButton>
          )}
        </PageNavigationBar>
        {quickTestQuery.isLoading ? (
          <LoadingState />
        ) : quickTestQuery.data.length <= 0 ? (
          <EmptyState
            icon={<Hourglass size={32} color='#207FD6' />}
            title='Sin Quick Test'
            caption='Empieza creando un nuevo quick test.'
            action={
              <TeodriveButton
                onClick={handleCreateQuickTest}
                title='Nuevo'
                size='small'
                icon={<Add01 size={20} />}
              >
                Nuevo
              </TeodriveButton>
            }
          />
        ) : (
          <div className={css.quickTestCardWrapper}>
            {quickTestQuery.data.map((quickTest, index) => (
              <ExamCard
                key={index}
                score={quickTest.score}
                status={quickTest.status}
                name={quickTest.name}
                correct={arrObjLength(quickTest.correctData)}
                incorrect={arrObjLength(quickTest.incorrectData)}
                onDelete={() => deleteMutation.mutate(quickTest.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
export default QuickTest;
