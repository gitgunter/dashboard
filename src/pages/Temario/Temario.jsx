import { useEffect, useMemo, useState } from 'react';

import { Page } from '../../components/Page/Page';
import { ChapterCard } from '../../components/ChapterCard/ChapterCard';
import { PageNavigationBar } from '../../components/PageNavigationBar/PageNavigationBar';

import css from './Temario.module.css';
import { useClickAway } from '@uidotdev/usehooks';

function Temario() {
  const [filter, setFilter] = useState('Capítulo');
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favoriteChapters');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const breadcrumbs = ['General', 'Temario'];

  const selectOptions = [
    {
      id: 1,
      label: 'Capítulo',
      action: (data) => {
        setFilter(data);
      },
    },
    {
      id: 2,
      label: 'Favoritos',
      action: (data) => {
        setFilter(data);
      },
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const caps = [
    {
      number: 1,
      title: 'Aspectos generales del tránsito y la seguridad vial',
      articles: 23,
    },
    {
      number: 2,
      title: 'Legislación del Tránsito',
      articles: 23,
    },
    {
      number: 3,
      title: 'Factor vía y su entorno',
      articles: 23,
    },
    {
      number: 4,
      title: 'Factor vehículo',
      articles: 23,
    },
    {
      number: 5,
      title: 'Factor humano',
      articles: 23,
    },
    {
      number: 6,
      title: 'Normas de circulación',
      articles: 23,
    },
    {
      number: 7,
      title: 'Rotondas',
      articles: 23,
    },
    {
      number: 8,
      title: 'El conductor y la contaminación ambiental',
      articles: 23,
    },
    {
      number: 9,
      title: 'Conducción técnica, económica y eficiente',
      articles: 23,
    },
    {
      number: 10,
      title: 'La conducción en motocicleta',
      articles: 23,
    },
  ];

  const filteredData = useMemo(() => {
    if (filter === 'Capítulo') {
      return caps;
    } else if (filter === 'Favoritos') {
      return favorites.map((favoriteNumber) =>
        caps.find((item) => item.number === favoriteNumber)
      );
    }
  }, [filter, favorites, caps]);

  const handleToggleFavorites = (item) => {
    const itemNumber = item.number;
    const isFavorite = favorites.includes(itemNumber);

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (number) => number !== itemNumber
      );
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, itemNumber];
      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    localStorage.setItem('favoriteChapters', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Page
      title='Temario - Teodrive'
      metaDesc='Lista de temas del examen que abarca todos los capítulos'
      canonical='temario'
    >
      <div className={css.temarioContainer}>
        <PageNavigationBar
          breadcrumbs={breadcrumbs}
          title='Temario'
          caption='Lista de temas del examen que abarca todos los capítulos'
        >
          <FavoriteSelect options={selectOptions} selectedOption={filter} />
        </PageNavigationBar>
        {filteredData.length === 0 ? (
          <div className={css.emptyState}>
            <h1 className={css.emptyStateTitle}>No hay favoritos</h1>
            <h2 className={css.emptyStateCaption}>
              Agrega capítulos de importancia como favoritos.
            </h2>
          </div>
        ) : (
          <div className={css.chapterGridWrapper}>
            {filteredData.map((chapter) => (
              <ChapterCard
                key={chapter.number}
                chapter={chapter}
                favorites={favorites}
                handleToggleFavorites={handleToggleFavorites}
                path={`/capitulo?num=${chapter.number}`}
              />
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
export default Temario;

export const FavoriteSelect = ({ options, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  const handleOpenSelect = () => {
    setIsOpen(!isOpen)
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={css.FavoriteSelect}>
      <div className={`${css.selectedOption} ${isOpen ? css.focus : ''}`} onClick={handleOpenSelect}>
        {selectedOption}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width={20}
          height={20}
          color={'#ffffff'}
          fill={'none'}
        >
          <path
            d='M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>

      <div
        className={`${css.selectOptions} ${isOpen ? css.active : ''}`}
        onClick={handleClose}
      >
        {options.map((favorite) => (
          <div
            key={favorite.id}
            onClick={() => favorite.action(favorite.label)}
            className={css.option}
          >
            <div>{favorite.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
