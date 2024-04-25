import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Emoji } from 'emoji-picker-react';

import { getAllNotes } from '../../services/noteService.js';

import { Note } from '../../components/Note/Note.jsx';
import { Page } from '../../components/Page/Page.jsx';
import { DashboardSectionHeader } from '../../components/DashboardSectionHeader/DashboardSectionHeader';

import css from './Notas.module.css';

function Notas() {
  const [isNote, setIsNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const queryClient = useQueryClient();

  const noteQuery = useQuery(['notes'], getAllNotes);

  // const handleDeleteNote = (noteId) => {
  //   if (selectedNote) {
  //     const updatedNotes = data.filter((note) => note.id !== noteId);
  //     queryClient.setQueryData(['notes'], updatedNotes);

  //     mutate(noteId, {
  //       onSuccess: () => {
  //         setIsNote(false);
  //         setSelectedNote(null);
  //       },
  //     });
  //     reset();
  //   }
  // };

  // const handleUpdateNote = (updatedNote) => {
  //   console.log(updatedNote);
  //   setIsNote(false); // Oculta el formulario después de guardar
  // };

  // const handleSaveNote = (newNote) => {
  //   console.log(newNote);
  //   setIsNote(false); // Oculta el formulario después de guardar
  // };

  const handleNoteCancel = () => {
    setIsNote(false);
    setSelectedNote(null);
  };

  return (
    <Page
      title='Notas - Teodrive'
      metaDesc='Tu espacio personal para apuntes rápidos e información importante'
      canonical='notas'
    >
      <div className={css.Notas}>
        {isNote || selectedNote ? (
          <Note
            onCancel={handleNoteCancel}
            // onSave={handleSaveNote}
            // onUpdate={handleUpdateNote}
            // onDelete={() => handleDeleteNote(selectedNote.id)}
            initialData={selectedNote}
          />
        ) : (
          <>
            <DashboardSectionHeader
              title='Notas'
              description='Tu espacio personal para apuntes rápidos e información importante'
              counter={
                noteQuery.isLoading
                  ? null
                  : noteQuery.data?.length === 0
                  ? null
                  : noteQuery.data.length
              }
            >
              <button
                type='button'
                className={css.createNoteBtn}
                onClick={() => setIsNote(true)}
              >
                Crear nota
              </button>
            </DashboardSectionHeader>
            <div className={css.notesWrapper}>
              {noteQuery.isLoading
                ? 'Cargando...'
                : noteQuery.data.map((note) => (
                    <NoteCard
                      key={note.id}
                      id={note.id}
                      emoji={note.emoji}
                      title={note.title}
                      desc={note.description}
                      date={note.createdAt
                        .split(',')
                        .slice(0, 2)
                        .join(',')
                        .replace(',', '')}
                      onNoteClick={() => {
                        console.log(note);
                        setSelectedNote(note);
                      }}
                    />
                  ))}
            </div>
          </>
        )}
      </div>
    </Page>
  );
}
export default Notas;

export const NoteCard = ({ emoji, title, desc, date, onNoteClick }) => {
  return (
    <div className={css.NoteCard} onClick={onNoteClick}>
      <div className={css.noteCardHeader}>
        <Emoji unified={emoji} size='24' />
        <h2 className={css.noteCardDate}>{date}</h2>
      </div>
      <div>
        <h1 className={css.noteCardTitle}>{title}</h1>
        <p className={css.noteCardDescription}>{desc}</p>
      </div>
    </div>
  );
};
