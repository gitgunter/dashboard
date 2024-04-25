import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import EmojiPicker, { Emoji } from 'emoji-picker-react';

import TeodriveButton from '../TeodriveButton/TeodriveButton';
import getCurrentDate from '../../utils/getCurrentDate.js';

import css from './Note.module.css';
import { useClickAway } from '@uidotdev/usehooks';
import { useToast } from '@context/ToastContext';

export const Note = ({ noteData, onCancel, onUpdate, onDelete, onSave }) => {
  const titleEditor = useMemo(() => withReact(createEditor()), []);
  const contentEditor = useMemo(() => withReact(createEditor()), []);

  const [noteEmoji, setNoteEmoji] = useState(noteData?.emoji || '270d-fe0f');

  const { toast } = useToast();

  const parseData = (data, type) => {
    try {
      return JSON.parse(data);
    } catch (e) {
      return [
        {
          type: type,
          children: [{ text: data || '' }],
        },
      ];
    }
  };

  const [noteTitle, setNoteTitle] = useState(
    parseData(noteData?.title, 'title')
  );
  const [noteContent, setNoteContent] = useState(
    parseData(noteData?.content, 'paragraph')
  );

  function isEditorEmpty(data) {
    return data.every((item) =>
      item.children.every((child) => child.text.trim() === '')
    );
  }

  const newNoteData = {
    emoji: noteEmoji,
    title: JSON.stringify(noteTitle),
    content: JSON.stringify(noteContent),
    createdAt: getCurrentDate(),
  };

  const updatedNoteData = {
    id: noteData?.id,
    emoji: noteEmoji,
    title: JSON.stringify(noteTitle),
    content: JSON.stringify(noteContent),
    createdAt: getCurrentDate(),
  };

  const handleSaveNote = () => {
    const titleEmpty = isEditorEmpty(noteTitle);
    const contentEmpty = isEditorEmpty(noteContent);

    if (titleEmpty || contentEmpty) {
      toast.warn(
        'Título o contenido vacío',
        'Necesitas rellenar todos los campos'
      );
      return;
    }

    onSave(newNoteData);
  };

  const handleUpdateNote = () => {
    const titleEmpty = isEditorEmpty(noteTitle);
    const contentEmpty = isEditorEmpty(noteContent);

    if (titleEmpty || contentEmpty) {
      toast.warn('Título o contenido vacío');
      return;
    }

    onUpdate(updatedNoteData);
  };

  return (
    <div className={css.Note}>
      <div className={css.noteActions}>
        <TeodriveButton size='small' variant='ghost' onClick={onCancel}>
          Cancelar
        </TeodriveButton>
        <TeodriveButton
          size='small'
          variant='ghost'
          onClick={noteData ? handleUpdateNote : handleSaveNote}
        >
          Guardar
        </TeodriveButton>
        {noteData && (
          <TeodriveButton size='small' variant='ghost' onClick={onDelete}>
            Borrar
          </TeodriveButton>
        )}
      </div>
      <NoteEmoji
        initialValue={noteEmoji}
        onEmojiChange={(e) => setNoteEmoji(e)}
      />
      <NoteTitle
        editor={titleEditor}
        initialValue={noteTitle}
        onChange={(newValue) => setNoteTitle(newValue)}
      />
      <NoteContent
        editor={contentEditor}
        initialValue={noteContent}
        onChange={(newValue) => setNoteContent(newValue)}
      />
    </div>
  );
};

Note.propTypes = {
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
};

export const NoteTitle = ({ editor, initialValue, onChange }) => {
  return (
    <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
      <Editable
        className={css.titleEditor}
        spellCheck={false}
        renderElement={({ attributes, children }) => (
          <h1 className={css.noteTitle} {...attributes}>
            {children}
          </h1>
        )}
        renderPlaceholder={({ children, attributes }) => (
          <h1 {...attributes} style={{}} className={css.titlePlaceholder}>
            {children}
          </h1>
        )}
        placeholder='Título'
      />
    </Slate>
  );
};

export const NoteContent = ({ editor, initialValue, onChange }) => {
  return (
    <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
      <Editable
        className={css.contentEditor}
        spellCheck={false}
        renderElement={({ attributes, children }) => (
          <h1 className={css.noteContent} {...attributes}>
            {children}
          </h1>
        )}
        renderPlaceholder={({ children, attributes }) => (
          <h1 {...attributes} style={{}} className={css.contentPlaceholder}>
            {children}
          </h1>
        )}
        placeholder='Escribe aquí...'
      />
    </Slate>
  );
};

export const NoteEmoji = ({ onEmojiChange, initialValue }) => {
  const [emoji, setEmoji] = useState(initialValue);
  const [toggleEmojiMenu, setToggleEmojiMenu] = useState(false);

  const emojiMenuRef = useClickAway(() => setToggleEmojiMenu(false));

  const selectEmoji = (e) => {
    onEmojiChange(e.unified);
    setEmoji(e.unified);
    setToggleEmojiMenu(false);
  };

  const emojiPicker = useMemo(
    () => (
      <div ref={emojiMenuRef}>
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
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={css.NoteEmoji}>
      <button
        type='button'
        title='Cambiar emoji'
        className={css.changeEmojiBtn}
        onClick={() => setToggleEmojiMenu(!toggleEmojiMenu)}
      >
        <Emoji unified={emoji} size={68} />
      </button>
      {toggleEmojiMenu && emojiPicker}
    </div>
  );
};
