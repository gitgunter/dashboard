/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const ArrowRight02 = (props) => {
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
        d='M20 12H4M15 17s5-3.682 5-5-5-5-5-5'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
export default ArrowRight02;
