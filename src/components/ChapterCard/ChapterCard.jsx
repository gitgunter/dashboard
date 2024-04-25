import { Link } from 'react-router-dom';

import { Star, StarSolid } from '@icons/index';

import css from './ChapterCard.module.css';

export const ChapterCard = ({
  chapter,
  favorites,
  handleToggleFavorites,
  path,
}) => {
  return (
    <Link to={path}>
      <div className={css.ChapterCard}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 className={css.chapterNumber}>
            Capítulo
            <span>{chapter.number}</span>
          </h1>
          <button
            className={`${css.addFavoriteButton} ${
              favorites.includes(chapter.number) ? css.active : ''
            }`}
            type='button'
            onClick={(e) => {
              e.preventDefault();
              handleToggleFavorites(chapter);
            }}
          >
            {favorites.includes(chapter.number) ? <StarSolid className={css.favoriteIcon} /> : <Star className={css.favoriteIcon} />}
          </button>
        </div>
        <p className={css.chapterTitle}>{chapter.title}</p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            columnGap: '0.5rem',
          }}
        >
          {favorites.includes(chapter.number) && (
            <span className={css.favoriteTag}>Favorito</span>
          )}
          <span className={css.articlesTag}>
            Artículos · <h2>{chapter.articles}</h2>
          </span>
        </div>
      </div>
    </Link>
  );
};
