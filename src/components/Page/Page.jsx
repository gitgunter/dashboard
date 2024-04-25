import { Helmet } from 'react-helmet-async';

import css from './Page.module.css';

export const Page = ({
  title,
  metaDesc = 'Aspira a ser un conductor profesional.',
  canonical = '',
  id,
  children,
  pageRef,
}) => {
  return (
    <section ref={pageRef} className={css.Page} id={id}>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={metaDesc} />
        <link rel='canonical' href={`https://app.teodrive.com/${canonical}`} />
      </Helmet>
      <div className={css.pageContent}>{children}</div>
    </section>
  );
};
