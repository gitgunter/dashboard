import { useEffect, useMemo, useRef, useState } from 'react';

import css from './Note.module.css';
import EmojiPicker, { Emoji } from 'emoji-picker-react';

export const Note = ({
  onCancel,
  onSave,
  onDelete,
  onUpdate,
  initialData,
}) => {
  const [emoji, setEmoji] = useState('270d-fe0f');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialData) {
      setEmoji(initialData.emoji);
      setTitle(initialData.title);
      setDescription(initialData.description);
      setIsEditing(true);
    }
  }, [initialData]);

  const handleSave = () => {
    if (isEditing) {
      const id = initialData.id;
      onUpdate({ id, emoji, title, description });
    } else {
      onSave({ title, description, emoji });
    }
  };

  return (
    <div className={css.Note}>
      <div className={css.noteActions}>
          <button
            type='button'
            className={css.actionBtn}
            onClick={onCancel}
          >
            Cancelar
          </button>
        <button type='button' className={css.actionBtn} onClick={handleSave}>
          Guardar
        </button>
        {initialData && (
          <button
            type='button'
            className={css.actionBtn}
            onClick={onDelete}
          >
            Borrar
          </button>
        )}
      </div>
      <div className={css.notaHeader}>
        <NoteEmoji onEmojiChange={setEmoji} initialEmoji={initialData?.emoji} />
        <NoteTitle
          onTitleChange={setTitle}
          initialTitle={initialData?.title}
          saveShortcut={handleSave}
        />
      </div>
      <NoteDescription
        onDescriptionChange={setDescription}
        initialDescription={initialData?.description}
        saveShortcut={handleSave}
      />
    </div>
  );
};

export const NoteEmoji = ({ onEmojiChange, initialEmoji }) => {
  const [emoji, setEmoji] = useState(initialEmoji || '270d-fe0f');
  const [toggleEmojiMenu, setToggleEmojiMenu] = useState(false);

  const selectEmoji = (e) => {
    onEmojiChange(e.unified);
    setEmoji(e.unified);
    setToggleEmojiMenu(false);
  };

  const emojiPicker = useMemo(() => (
    <EmojiPicker
      onEmojiClick={selectEmoji}
      theme='dark'
      className={css.emojiMenu}
      lazyLoadEmojis={true}
      skinTonesDisabled
      searchDisabled={true}
      autoFocusSearch={false}
      height={400}
      width={400}
    />
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), []);

  return (
    <div className={css.NoteEmoji}>
      <button
        type='button'
        onClick={() => setToggleEmojiMenu(!toggleEmojiMenu)}
        className={css.noteEmojiPickerBtn}
      >
        <Emoji unified={emoji} size='32' />
      </button>
      {toggleEmojiMenu && emojiPicker}
    </div>
  );
};

export const NoteTitle = ({ onTitleChange, initialTitle, saveShortcut }) => {
  const [hasText, setHasText] = useState(
    initialTitle && initialTitle.trim() !== ''
  );
  const containerRef = useRef(null);

  useEffect(() => {
    if (initialTitle) {
      containerRef.current.innerText = initialTitle;
    }
  }, [initialTitle]);

  const handleInput = () => {
    const container = containerRef.current;
    const content = container.innerText;

    onTitleChange(content);
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
      saveShortcut();
    }
  };

  return (
    <h1
      ref={containerRef}
      contentEditable={true}
      className={`${css.NoteTitle} ${hasText ? css.hasText : ''}`}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      spellCheck={false}
    />
  );
};

export const NoteDescription = ({
  onDescriptionChange,
  initialDescription,
  saveShortcut,
}) => {
  const [hasText, setHasText] = useState(
    initialDescription && initialDescription.trim() !== ''
  );
  const containerRef = useRef(null);

  useEffect(() => {
    if (initialDescription) {
      containerRef.current.innerText = initialDescription;
    }
  }, [initialDescription]);

  const handleInput = () => {
    const container = containerRef.current;
    const content = container.innerText;

    onDescriptionChange(content);
    setHasText(content.trim() !== '');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      containerRef.current.blur();
    } else if (
      (event.ctrlKey && event.key === 'g') ||
      (event.ctrlKey && event.key === 's')
    ) {
      event.preventDefault();
      saveShortcut();
    }
  };

  return (
    <p
      ref={containerRef}
      contentEditable={true}
      className={`${css.NoteDescription} ${hasText ? css.hasText : ''}`}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      spellCheck={false}
    />
  );
};
