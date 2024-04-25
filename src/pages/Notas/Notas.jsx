import { useState } from 'react';
import { useQuery } from 'react-query';
import { Emoji } from 'emoji-picker-react';

import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from '@services/noteService.js';
import usePostMutation from '@utils/usePostMutation';
import useDeleteMutation from '@hooks/useDeleteMutation';
import usePutMutation from '@hooks/usePutMutation';

import { Note } from '@components/Note/Note.jsx';
import { Page } from '@components/Page/Page.jsx';
import { PageNavigationBar } from '@components/PageNavigationBar/PageNavigationBar';
import { Add01, StickyNote02 } from '@icons/index';
import TeodriveButton from '@components/TeodriveButton/TeodriveButton.jsx';
import arrObjLength from '@utils/arrayObjectLength.js';

import css from './Notas.module.css';
import LoadingState from '@components/LoadingState/LoadingState';
import EmptyState from '@components/EmptyState/EmptyState';
import { useToast } from '@context/ToastContext';

function Notas() {
  const [isNote, setIsNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const { toast } = useToast();

  const breadcrumbs = ['General', 'Notas'];

  const noteQuery = useQuery(['notes'], getAllNotes);

  const handleNoteCancel = () => {
    setIsNote(false);
    setSelectedNote(null);
  };

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsNote(true);
  };

  const notePostMutation = usePostMutation('notes', createNote);
  const notePutMutation = usePutMutation('notes', updateNote);
  const noteDeleteMutation = useDeleteMutation('notes', deleteNote);

  function slateFormat(data) {
    const texts = JSON.parse(data)
      .map((item) => item.children.map((child) => child.text))
      .flat();

    const paragraph = texts.join(' ');

    return paragraph;
  }

  const handleSaveNote = (newNote) => {
    notePostMutation.mutate(newNote, {
      onSuccess: () => {
        toast.success('¡Nota creada!');
      },
    });
    setSelectedNote(null);
    setIsNote(false);
  };

  const handleUpdateNote = (updatedNote) => {
    notePutMutation.mutate(updatedNote, {
      onSuccess: () => {
        toast.success('¡Nota actualizada!');
      },
    });
    setSelectedNote(null);
    setIsNote(false);
  };

  const handleDeleteNote = (noteId) => {
    noteDeleteMutation.mutate(noteId, {
      onSuccess: () => {
        toast.success('¡Nota borrada!');
      },
    });
    setSelectedNote(null);
    setIsNote(false);
  };

  const objLength = arrObjLength(!noteQuery.isLoading && noteQuery?.data);

  return (
    <Page
      title='Notas - Teodrive'
      metaDesc='Tu espacio personal para apuntes rápidos e información importante'
      canonical='notas'
    >
      {isNote || selectedNote ? (
        <Note
          noteData={selectedNote}
          onSave={handleSaveNote}
          onCancel={handleNoteCancel}
          onUpdate={handleUpdateNote}
          onDelete={() => handleDeleteNote(selectedNote.id)}
        />
      ) : (
        <div className={css.notasContainer}>
          <PageNavigationBar
            breadcrumbs={breadcrumbs}
            title='Notas'
            caption='Tu espacio personal para apuntes rápidos e información importante'
            number={objLength}
          >
            {!objLength <= 0 && (
              <TeodriveButton
                onClick={handleCreateNote}
                title='Crear nota'
                size='small'
                icon={<Add01 size={20} />}
              >
                Crear nota
              </TeodriveButton>
            )}
          </PageNavigationBar>
          {noteQuery.isLoading ? (
            <LoadingState />
          ) : objLength <= 0 ? (
            <EmptyState
              icon={<StickyNote02 size={32} color='#207FD6' />}
              title='Sin notas'
              caption='Empieza creando una nota nueva'
              action={
                <TeodriveButton
                  onClick={handleCreateNote}
                  title='Crear nota'
                  size='small'
                  icon={<Add01 size={20} />}
                >
                  Crear nota
                </TeodriveButton>
              }
            />
          ) : (
            <div className={css.notesWrapper}>
              {noteQuery.data.map((note, index) => (
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
                  onNoteClick={() => setSelectedNote(note)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Page>
  );
}
export default Notas;

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
