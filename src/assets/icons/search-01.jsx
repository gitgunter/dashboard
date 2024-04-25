/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const Search01 = (props) => {
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
        d='M17.5 17.5L22 22'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20 11a9 9 0 10-18 0 9 9 0 0018 0z'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinejoin='round'
      />
    </svg>
  );
};
export default Search01;
