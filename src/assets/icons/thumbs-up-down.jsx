/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const ThumbsUpDown = (props) => {
  return (
    <svg
      {...props}
      width={props.size || 24}
      height={props.size || 24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.652 4.786l-.177.557c-.146.456-.218.684-.162.864a.639.639 0 00.28.354c.167.102.42.102.926.102h.27c1.713 0 2.57 0 2.974.492.047.057.088.116.123.18.312.548-.042 1.288-.75 2.767-.65 1.357-.974 2.036-1.577 2.435a2.752 2.752 0 01-.18.11C8.744 13 7.957 13 6.384 13h-.34c-1.907 0-2.86 0-3.452-.557C2 11.886 2 10.99 2 9.198v-.63c0-.942 0-1.413.172-1.844.172-.431.502-.786 1.162-1.494L6.06 2.298c.069-.074.103-.11.133-.136a.704.704 0 01.962.06c.027.028.055.07.113.15.09.128.135.191.175.254.351.564.458 1.234.297 1.87-.018.07-.042.144-.088.29zM16.348 19.214l.177-.557c.146-.456.218-.684.162-.864a.638.638 0 00-.28-.354c-.167-.102-.42-.102-.926-.102h-.27c-1.713 0-2.57 0-2.974-.492a1.264 1.264 0 01-.123-.18c-.312-.548.042-1.288.75-2.767.65-1.357.974-2.036 1.577-2.435.059-.04.119-.076.18-.11C15.256 11 16.043 11 17.616 11h.34c1.907 0 2.86 0 3.452.557.592.557.592 1.453.592 3.245v.63c0 .942 0 1.413-.172 1.844-.172.431-.502.786-1.162 1.494l-2.727 2.932c-.069.073-.103.11-.133.136a.704.704 0 01-.962-.06 1.786 1.786 0 01-.113-.15c-.09-.128-.135-.191-.175-.254a2.405 2.405 0 01-.297-1.87c.018-.07.042-.144.088-.29z'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
export default ThumbsUpDown;
