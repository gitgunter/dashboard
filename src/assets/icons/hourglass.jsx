/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const Hourglass = (props) => {
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
        d='M19 2v3a7 7 0 01-7 7M5 2v3a7 7 0 007 7m0 0a7 7 0 017 7v3m-7-10a7 7 0 00-7 7v3'
        stroke='currentColor'
        strokeWidth={1.5}
      />
      <path
        d='M4 2h16m0 20H4'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </svg>
  );
};
export default Hourglass;
