/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const ViewOff = (props) => {
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
        d='M22 8s-4 6-10 6S2 8 2 8'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M15 13.5l1.5 2.5M20 11l2 2M2 13l2-2M9 13.5L7.5 16'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
export default ViewOff;
