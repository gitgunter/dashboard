import { useEffect, useState } from 'react';
import { m } from 'framer-motion';

import useFullScreen from '../../utils/useFullScreen';
import { ExamTimer } from '../ExamTimer/ExamTimer';

import ArrowLeft from '../../assets/images/arrow-left-02.svg';
import ArrowAllDirection from '../../assets/images/arrow-all-direction.svg';
import ArrowShrink from '../../assets/images/arrow-shrink.svg';

import css from './QuickTestExam.module.css';
import { useMutation, useQueryClient } from 'react-query';
import { createQuickTest } from '../../services/quickTestService';

export const QuickTestExam = ({ questions, onClose, config }) => {
  const { isFullScreen, toggleFullScreen } = useFullScreen();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleExamClose = () => {
    setUserAnswers({});
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setCurrentQuestion(0);
    onClose();
  };

  const answerA = { letter: 'A', answer: questions[currentQuestion].answerA };
  const answerB = { letter: 'B', answer: questions[currentQuestion].answerB };
  const answerC = { letter: 'C', answer: questions[currentQuestion].answerC };

  // Animation
  const text = {
    initial: {
      opacity: 0,
      y: 100,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      opacity: 0,
      y: '-40%',
      transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] },
    },
  };

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    const letter = e.target.id;
    setUserAnswers((prevUserAnswers) => ({
      ...prevUserAnswers,
      [currentQuestion]: { letter, text: value },
    }));

    setErrorMessage('');
  };

  useEffect(() => {
    if (userAnswers[currentQuestion]) {
      const selectedAnswer = userAnswers[currentQuestion];
      const correctAnswer = questions[currentQuestion].correctAnswer;
      const isAnswerCorrect = selectedAnswer.letter === correctAnswer;

      const answerObject = {
        question: questions[currentQuestion].question,
        userAnswerLetter: selectedAnswer.letter,
        userAnswerText: selectedAnswer.text,
        correctAnswerLetter: correctAnswer,
        correctAnswerText: questions[currentQuestion]['answer' + correctAnswer],
        questionId: currentQuestion, // Identificador único de la pregunta
      };

      // Función para actualizar las respuestas correctas e incorrectas
      const updateAnswers = (newAnswer, isCorrect) => {
        setCorrectAnswers((prev) =>
          isCorrect
            ? [
                ...prev.filter((a) => a.questionId !== newAnswer.questionId),
                newAnswer,
              ]
            : prev.filter((a) => a.questionId !== newAnswer.questionId)
        );
        setIncorrectAnswers((prev) =>
          !isCorrect
            ? [
                ...prev.filter((a) => a.questionId !== newAnswer.questionId),
                newAnswer,
              ]
            : prev.filter((a) => a.questionId !== newAnswer.questionId)
        );
      };

      // Actualizar las listas de respuestas
      updateAnswers(answerObject, isAnswerCorrect);
    }
  }, [userAnswers, currentQuestion, questions]);

  const handleNextQuestion = (e) => {
    e.preventDefault();
    if (!userAnswers[currentQuestion]) {
      setErrorMessage(
        'Por favor, selecciona una respuesta antes de continuar.'
      );
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleExamData();
      onClose();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const queryClient = useQueryClient();

  const quickTestMutation = useMutation(createQuickTest, {
    onMutate: async (newExam) => {
      // Cancelar cualquier fetch en proceso para esta query para que no sobrescriba nuestro optimistic update
      await queryClient.cancelQueries(['quicktest']);

      // Guardar el estado anterior
      const previousExams = queryClient.getQueryData(['quicktest']);

      // Actualizar optimistamente la caché con el nuevo examen
      queryClient.setQueryData(['quicktest'], (old) => [...old, newExam]);

      // Devolver el contexto con el estado anterior
      return { previousExams };
    },
    onError: (err, newExam, context) => {
      // Revertir a los datos anteriores en caso de error
      queryClient.setQueryData(['quicktest'], context.previousExams);
    },
    onSuccess: () => {
      // Invalidar queries para asegurar que los datos estén frescos
      queryClient.invalidateQueries(['quicktest']);
    },
  });

  const handleExamData = () => {
    const score = calcScore(correctAnswers.length, questions.length);

    const examDataObj = {
      name: config.name,
      status: score < 69 ? 'Reprobado' : 'Aprobado',
      questions: questions,
      correctData: correctAnswers,
      incorrectData: incorrectAnswers,
      score: score,
    };

    console.log(examDataObj);
    quickTestMutation.mutate(examDataObj);
    return examDataObj;
  };

  const calcScore = (numCorrect, questions) => {
    const score = Math.round(numCorrect * (100 / questions));
    return score;
  };

  return (
    <m.div
      className={css.QuickTestExam}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <div
        className={css.examHeader}
        style={{
          alignItems: 'center',
        }}
      >
        <button type='button' className={css.backBtn} onClick={handleExamClose}>
          <img src={ArrowLeft} />
        </button>
        <ExamTimer
          minutes={config.timeLimit}
          onTimerEnd={handleExamClose}
        />
        <button
          type='button'
          className={css.fullScreenBtn}
          onClick={toggleFullScreen}
        >
          {isFullScreen ? (
            <img src={ArrowShrink} />
          ) : (
            <img src={ArrowAllDirection} />
          )}
        </button>
      </div>
      <m.div
        initial='initial'
        animate='enter'
        exit='exit'
        variants={text}
        className={css.examWrapper}
      >
        <p className={css.question}>
          {questions[currentQuestion].question}
          <span className={css.questionNumberOverlay}>
            {currentQuestion + 1} / {questions.length}
          </span>
        </p>
        <div className={css.examAnswerWrapper}>
          <Answer
            id={answerA.letter}
            letter={answerA.letter}
            answer={answerA.answer}
            value={answerA.answer}
            onChange={handleAnswerChange}
            checked={userAnswers[currentQuestion]?.text === answerA.answer}
          />
          <Answer
            id={answerB.letter}
            letter={answerB.letter}
            answer={answerB.answer}
            value={answerB.answer}
            onChange={handleAnswerChange}
            checked={userAnswers[currentQuestion]?.text === answerB.answer}
          />
          <Answer
            id={answerC.letter}
            letter={answerC.letter}
            answer={answerC.answer}
            value={answerC.answer}
            onChange={handleAnswerChange}
            checked={userAnswers[currentQuestion]?.text === answerC.answer}
          />
        </div>
        {errorMessage && (
          <span className={css.errorMessage}>{errorMessage}</span>
        )}
        <div className={css.examButtonWrapper}>
          <button
            className={css.prevBtn}
            type='button'
            onClick={handlePreviousQuestion}
          >
            Volver
          </button>
          <button
            className={css.nextBtn}
            type='button'
            onClick={handleNextQuestion}
          >
            {currentQuestion < questions.length - 1 ? 'Siguiente' : 'Finalizar'}
          </button>
        </div>
      </m.div>
    </m.div>
  );
};

export const Answer = ({
  value,
  checked,
  onClick,
  onChange,
  answer,
  letter,
  id,
  isCorrect,
  validation,
}) => {
  return (
    <label
      htmlFor={id}
      className={`${css.Answer} ${checked ? css.checked : ''}`}
      onClick={onClick}
    >
      <h1
        className={css.answerLetter}
        style={{
          color: validation
            ? checked
              ? isCorrect
                ? '#00F9B3'
                : '#ED4E4F'
              : ''
            : '',
        }}
      >
        {letter}
      </h1>
      <h2
        className={css.answerText}
        style={{
          color: validation
            ? checked
              ? isCorrect
                ? '#00F9B3'
                : '#ED4E4F'
              : ''
            : '',
        }}
      >
        {answer}
      </h2>
      <input
        style={{
          display: 'none',
          visibility: 'hidden',
          pointerEvents: 'none',
          opacity: 0,
        }}
        type='radio'
        name='answer'
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};
