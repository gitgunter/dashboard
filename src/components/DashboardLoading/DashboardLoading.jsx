import css from './DashboardLoading.module.css'

export const DashboardLoading = () => {
  return (
    <div className={css.DashboardLoading}>
      <div className={css.TitleLoading} />
      <div className={css.CaptionLoading} />
    </div>
  )
}