import { useCallback, useEffect, useState } from 'react';
import { m } from 'framer-motion';

import useFullScreen from '../../utils/useFullScreen';
import { ExamTimer } from '../ExamTimer/ExamTimer';

import ArrowLeft from '../../assets/images/arrow-left-02.svg';
import ArrowAllDirection from '../../assets/images/arrow-all-direction.svg';
import ArrowShrink from '../../assets/images/arrow-shrink.svg';

import css from './VerdadFalsoExam.module.css';

export const VerdadFalsoExam = ({ questions, onClose, config }) => {
  const { isFullScreen, toggleFullScreen } = useFullScreen();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [answerLocked, setAnswerLocked] = useState(false);

  const [isTrue, setIsTrue] = useState(false);
  const [isFalse, setIsFalse] = useState(false);

  const handleExamClose = useCallback(() => {
    setUserAnswers({});
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setCurrentQuestion(0);
    setAnswerLocked(false);
    onClose();
  }, [onClose]);

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
    if (answerLocked) {
      return;
    } else if (userAnswers[currentQuestion]) {
      setAnswerLocked(true);
      return;
    }

    const { value } = e.target;
    setUserAnswers((prevUserAnswers) => ({
      ...prevUserAnswers,
      [currentQuestion]: { answer: value },
    }));

    setAnswerLocked(true);
    setErrorMessage('');
  };

  useEffect(() => {
    if (userAnswers[currentQuestion]) {
      const selectedAnswer = userAnswers[currentQuestion];
      const correctAnswer = questions[currentQuestion].answer;
      const isAnswerCorrect = selectedAnswer.answer === correctAnswer;

      const answerObject = {
        question: questions[currentQuestion].question,
        userAnswer: selectedAnswer.answer,
        correctAnswer: correctAnswer,
        questionId: currentQuestion, // Identificador único de la pregunta
      };

      if (isAnswerCorrect) {
        setIsTrue(true);
      } else {
        setIsFalse(true);
      }

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
      setAnswerLocked(false);
      setIsTrue(false);
      setIsFalse(false);
    } else {
      handleExamData();
      onClose();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setIsTrue(false);
      setIsFalse(false);
    }
  };

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
    return examDataObj;
  };

  const calcScore = (numCorrect, questions) => {
    const score = Math.round(numCorrect * (100 / questions));
    return score;
  };

  return (
    <m.div
      className={css.VerdadFalsoExam}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <div
        className={`${css.answerOverlayWrapper} ${
          isTrue ? css.isTrue : css.isFalse
        }`}
      >
        <h1
          className={`${css.answerOverlay} ${isTrue ? css.active : ''}`}
          id={css.trueAnswer}
        >
          Verdad
        </h1>
        <h1
          className={`${css.answerOverlay} ${isFalse ? css.active : ''}`}
          id={css.falseAnswer}
        >
          Falso
        </h1>
      </div>
      <div
        className={css.examHeader}
        style={{
          alignItems: 'center',
        }}
      >
        <button type='button' className={css.backBtn} onClick={handleExamClose}>
          <img src={ArrowLeft} />
        </button>
        <ExamTimer minutes={config.timeLimit} onTimerEnd={handleExamClose} />
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
            id='true'
            boolean='Verdad'
            value='true'
            onChange={handleAnswerChange}
            checked={userAnswers[currentQuestion]?.answer === 'true'}
            className={css.trueLabel}
            isCorrect={
              userAnswers[currentQuestion]?.answer ===
              questions[currentQuestion].answer
            }
            validation={true}
          />
          <Answer
            id='false'
            boolean='Falso'
            value='false'
            onChange={handleAnswerChange}
            checked={userAnswers[currentQuestion]?.answer === 'false'}
            className={css.falseLabel}
            isCorrect={
              userAnswers[currentQuestion]?.answer ===
              questions[currentQuestion].answer
            }
            validation={true}
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
  boolean,
  id,
  isCorrect,
  validation,
  className,
}) => {
  return (
    <label
      htmlFor={id}
      className={`${css.Answer} ${className} ${checked ? css.checked : ''}`}
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
        {boolean}
      </h1>
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
