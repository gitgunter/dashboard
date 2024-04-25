import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Editable, Slate, withReact } from 'slate-react';
import { Editor, Range, createEditor } from 'slate';

import css from './Capitulos.module.css';

function Capitulos() {
  const [highlightColor, setHightLightColor] = useState(
    'rgba(255, 237, 71, 0.4)'
  );
  const [highlightSelector, setHighlightSelector] = useState(false);

  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'title',
      children: [
        { text: 'Aspectos generales del tránsito y la seguridad vial' },
      ],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Something here...' }],
    },
  ]);

  // Función para renderizar elementos basados en su tipo
  const renderElement = ({ attributes, children, element }) => {
    switch (element.type) {
      case 'title':
        return (
          <h1 className={css.display1} {...attributes}>
            {children}
          </h1>
        );
      case 'paragraph':
        return <p {...attributes}>{children}</p>;
      default:
        return <p {...attributes}>{children}</p>;
    }
  };

  // Función para aplicar/quitar el color rojo solo al texto seleccionado
  const applyRedColorToSelectedText = () => {
    const { selection } = editor;
    if (!selection || Range.isCollapsed(selection)) return; // No hacer nada si no hay selección o la selección es un cursor sin rango

    const isActive = Editor.marks(editor)?.color === 'red';
    Editor.addMark(editor, 'color', isActive ? null : 'red'); // Alternar el color rojo
  };

  // Función para aplicar/quitar el resaltado de fondo al texto seleccionado
  const toggleHighlight = () => {
    const { selection } = editor;
    if (!selection || Range.isCollapsed(selection)) return;

    const isActive = Editor.marks(editor)?.highlight === true;
    Editor.addMark(editor, 'highlight', !isActive);
  };

  // Función para aplicar/quitar negrita al texto seleccionado
  const toggleBold = () => {
    const { selection } = editor;
    if (!selection || Range.isCollapsed(selection)) return;

    const isActive = Editor.marks(editor)?.bold === true;
    Editor.addMark(editor, 'bold', !isActive);
  };

  // Función para aplicar/quitar el estilo cursiva al texto seleccionado
  const toggleItalic = () => {
    const { selection } = editor;
    if (!selection || Range.isCollapsed(selection)) return;

    const isActive = Editor.marks(editor)?.italic === true;
    Editor.addMark(editor, 'italic', !isActive);
  };

  // Función para aplicar/quitar subrayado al texto seleccionado
  const toggleUnderline = () => {
    const { selection } = editor;
    if (!selection || Range.isCollapsed(selection)) return;

    const isActive = Editor.marks(editor)?.underline === true;
    Editor.addMark(editor, 'underline', !isActive);
  };

  return (
    <div className={css.Capitulos}>
      <div>Sidebar</div>
      <Page
        title='Capitulo 1 - Teodrive'
        metaDesc='Informe detallado de los resultados de tu examen'
        canonical='quick-test'
        onColor={(event) => {
          event.preventDefault();
          applyRedColorToSelectedText();
        }}
        onBold={(event) => {
          event.preventDefault(); // Prevenir desenfoque
          toggleBold();
        }}
        onItalic={(event) => {
          event.preventDefault(); // Prevenir desenfoque
          toggleItalic();
        }}
        onUnderline={(event) => {
          event.preventDefault(); // Prevenir desenfoque
          toggleUnderline();
        }}
        onHighlight={(event) => {
          event.preventDefault(); // Prevenir desenfoque
          toggleHighlight();
        }}
      >
        <div className={css.capitulosContainer}>
          <RichTextEditor
            editor={editor}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            renderElement={renderElement}
          />
        </div>
      </Page>
    </div>
  );
}
export default Capitulos;

export const Page = ({
  title,
  metaDesc = 'Aspira a ser un conductor profesional.',
  canonical = '',
  id,
  children,
  onBold,
  onItalic,
  onUnderline,
  onColor,
  onHighlight,
}) => {
  return (
    <section className={css.Page} id={id}>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={metaDesc} />
        <link rel='canonical' href={`https://app.teodrive.com/${canonical}`} />
      </Helmet>
      <div className={css.toolbar}>
        <button
          type='button'
          className={css.toolbarAction}
          onMouseDown={onColor}
        >
          <span className={css.buttonLabel}>Texto</span>
          <div className={css.selectedTextColor} />
        </button>
        <button
          type='button'
          className={css.toolbarAction}
          onMouseDown={onHighlight}
        >
          <span className={css.buttonLabel}>Subrayar</span>
          <div className={css.selectedHighlight} />
        </button>
        <button
          type='button'
          className={css.toolbarAction}
          onMouseDown={onBold}
        >
          <svg
            width={20}
            height={20}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              clipRule='evenodd'
              d='M5 6c0-1.414 0-2.121.44-2.56C5.878 3 6.585 3 8 3h4.579C15.02 3 17 5.015 17 7.5S15.02 12 12.579 12H5V6z'
              stroke='#fff'
              strokeWidth={1.5}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12.429 12h1.238C16.06 12 18 14.015 18 16.5S16.06 21 13.667 21H8c-1.414 0-2.121 0-2.56-.44C5 20.122 5 19.415 5 18v-6'
              stroke='#fff'
              strokeWidth={1.5}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <button
          type='button'
          className={css.toolbarAction}
          onMouseDown={onItalic}
        >
          <svg
            width={20}
            height={20}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 4h7M8 20l8-16M5 20h7'
              stroke='#fff'
              strokeWidth={1.5}
              strokeLinecap='round'
            />
          </svg>
        </button>
        <button
          type='button'
          className={css.toolbarAction}
          onMouseDown={onUnderline}
        >
          <svg
            width={20}
            height={20}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5.5 3v8.5a6.5 6.5 0 1013 0V3'
              stroke='#fff'
              strokeWidth={1.5}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M3 21h18'
              stroke='#fff'
              strokeWidth={1.5}
              strokeLinecap='round'
            />
          </svg>
        </button>
      </div>
      <div className={css.pageContent}>{children}</div>
    </section>
  );
};

export const RichTextEditor = ({ editor, value, onChange, renderElement }) => {
  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <Editable
        className={css.Editor}
        spellCheck={false}
        onKeyDown={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
        renderElement={renderElement}
        renderLeaf={({ attributes, children, leaf }) => (
          <span
            {...attributes}
            className={`${css.default} ${
              leaf.underline && css.underlineCustom
            } ${leaf.italic && css.italicCustom}`}
            style={{
              backgroundColor: leaf.highlight
                ? 'rgba(255, 237, 71, 0.4)'
                : 'transparent',
              color: leaf.color ? leaf.color : 'inherit',
              fontWeight: leaf.bold ? 'bold' : 'inherit',
              fontStyle: leaf.italic ? 'italic' : 'inherit',
            }}
          >
            {children}
          </span>
        )}
      />
    </Slate>
  );
};
