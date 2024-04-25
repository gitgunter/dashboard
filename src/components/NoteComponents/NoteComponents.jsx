import { useState, useEffect, useRef } from 'react';

export const NoteTitle = ({
  onChange,
  initialData,
  onSave,
  className,
  hasTextClass,
}) => {
  const [hasText, setHasText] = useState(
    initialData && initialData.trim() !== ''
  );
  const containerRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      containerRef.current.innerText = initialData;
    }
  }, [initialData]);

  const handleInput = () => {
    const container = containerRef.current;
    const content = container.innerText;

    onChange(content);
    setHasText(content.trim() !== '');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    } else if (event.key === 'Escape') {
      containerRef.current.blur();
    } else if (
      (event.ctrlKey && event.key === 'g') ||
      (event.ctrlKey && event.key === 's')
    ) {
      event.preventDefault();
      onSave();
    }
  };

  return (
    <h1
      ref={containerRef}
      contentEditable={true}
      className={`${className} ${hasText ? hasTextClass : ''}`}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      spellCheck={false}
    />
  );
};

export const NoteContent = ({
  onChange,
  initialData,
  onSave,
  className,
  hasTextClass,
}) => {
  const [hasText, setHasText] = useState(
    initialData && initialData.trim() !== ''
  );
  const containerRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      containerRef.current.innerText = initialData;
    }
  }, [initialData]);

  const handleInput = () => {
    const container = containerRef.current;
    const content = container.innerText;

    onChange(content);
    setHasText(content.trim() !== '');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    } else if (event.key === 'Escape') {
      containerRef.current.blur();
    } else if (
      (event.ctrlKey && event.key === 'g') ||
      (event.ctrlKey && event.key === 's')
    ) {
      event.preventDefault();
      onSave();
    }
  };

  return (
    <p
      ref={containerRef}
      contentEditable={true}
      className={`${className} ${hasText ? hasTextClass : ''}`}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      spellCheck={false}
    />
  );
};

