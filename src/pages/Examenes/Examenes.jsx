import { useState } from 'react';
import { useQuery } from 'react-query';
import { useFormik } from 'formik';
import { boolean, number, object, string } from 'yup';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

import { ExamCard } from '@components/ExamCard/ExamCard';
import { Exam } from '@components/Exam/Exam';
import { CreateExamModal } from '@components/CreateExamModal/CreateExamModal';
import { Page } from '@components/Page/Page';
import { deleteExam, getAllExams, getQuestions } from '@services/examService';
import { PageNavigationBar } from '@components/PageNavigationBar/PageNavigationBar';
import TeodriveButton from '@components/TeodriveButton/TeodriveButton';
import arrObjLength from '@utils/arrayObjectLength.js';
import { Add01, Note } from '@icons/index';
import useDeleteMutation from '@hooks/useDeleteMutation';
import LoadingState from '@components/LoadingState/LoadingState';
import EmptyState from '@components/EmptyState/EmptyState';

import css from './Examenes.module.css';
import { useToast } from '@context/ToastContext';

function Examenes() {
  const [isExamInProgress, setIsExamInProgress] = useState(false);
  const [createExam, setCreateExam] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [examConfig, setExamConfig] = useState(null);

  const { toast } = useToast();

  const breadcrumbs = ['General', 'Exámenes'];

  const examsQuery = useQuery(['exams'], getAllExams);

  const questionQuery = useQuery(
    ['questions'],
    () => getQuestions(formik.values.questions),
    {
      enabled: false,
      onSuccess: (res) => {
        setQuestionData(res.data);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      questions: 40,
      timeLimit: 50,
      isShowResults: false,
      isRepeatFailures: false,
      isTimerControllers: false,
      isRealTimeValidation: false,
    },
    validationSchema: object({
      name: string()
        .max(22, 'El nombre del examen debe tener como máximo 22 caracteres.')
        .required('Introduce un nombre para tu examen'),
      questions: number()
        .min(1, 'Para comenzar el examen, se necesita al menos una pregunta.')
        .max(100, 'El examen debe tener un máximo 100 preguntas.')
        .required(
          'Para comenzar el examen, se necesita al menos una pregunta.'
        ),
      timeLimit: number()
        .min(
          1,
          'Para comenzar el examen, se necesita un tiempo mínimo de un minuto'
        )
        .max(120, 'El examen debe tener un tiempo máximo de 120 minutos.')
        .required(
          'Para comenzar el examen, se necesita un tiempo mínimo de un minuto.'
        ),
      isShowResults: boolean().required(),
      isRepeatFailures: boolean().required(),
      isTimerControllers: boolean().required(),
      isRealTimeValidation: boolean().required(),
    }),
    onSubmit: (data) => {
      setExamConfig(data);
      handleCreateExam();
    },
  });

  const handleCreateExam = async () => {
    setCreateExam(false);
    await questionQuery.refetch();
    setIsExamInProgress(true);
  };

  const handleCancelExam = () => {
    setIsExamInProgress(false);
    setCreateExam(false);
    setQuestionData(null);
    formik.resetForm();
  };

  const handleDeleteExam = (id) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('¡Examen borrado!');
      },
    });
  };

  const deleteMutation = useDeleteMutation('exams', deleteExam);
  const objLength = arrObjLength(!examsQuery.isLoading && examsQuery?.data);

  return (
    <Page
      title='Exámenes - Teodrive'
      metaDesc='Listado de todos tus exámenes realizados'
      canonical='examenes'
    >
      <div className={css.examenesContainer}>
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            {isExamInProgress && questionData && (
              <Exam
                onClose={handleCancelExam}
                questions={questionData}
                config={examConfig}
              />
            )}
          </AnimatePresence>
        </LazyMotion>
        <CreateExamModal
          onClose={handleCancelExam}
          onCreate={formik.handleSubmit}
          isVisible={createExam}
          formik={formik}
        />
        <PageNavigationBar
          breadcrumbs={breadcrumbs}
          title='Exámenes'
          caption='Listado de todos tus exámenes realizados'
          number={objLength}
        >
          {!objLength <= 0 && (
            <TeodriveButton
              onClick={() => setCreateExam(true)}
              title='Crear examen'
              size='small'
              icon={<Add01 size={20} />}
            >
              Crear examen
            </TeodriveButton>
          )}
        </PageNavigationBar>
        {examsQuery.isLoading ? (
          <LoadingState />
        ) : objLength <= 0 ? (
          <EmptyState
            icon={<Note size={32} color='#207FD6' />}
            title='Sin exámenes'
            caption='Empieza creando un examen nuevo'
            action={
              <TeodriveButton
                onClick={() => setCreateExam(true)}
                title='Crear examen'
                size='small'
                icon={<Add01 size={20} />}
              >
                Crear examen
              </TeodriveButton>
            }
          />
        ) : (
          <div className={css.examCardWrapper}>
            {examsQuery.data.map((exam, index) => (
              <ExamCard
                key={index}
                score={exam.score}
                status={exam.status}
                name={exam.name}
                correct={arrObjLength(exam.correctData)}
                incorrect={arrObjLength(exam.incorrectData)}
                path={`detalles/${exam.id}`}
                onDelete={() => handleDeleteExam(exam.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
export default Examenes;
