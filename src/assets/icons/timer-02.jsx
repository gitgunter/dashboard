/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const Timer02 = (props) => {
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
        d='M2 22h11a9 9 0 100-18c-4.633 0-8.503 3.5-9 8'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M18.5 5.5l1-1m-14 0l1 1'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.5 9l-2.94 2.94m0 0a1.5 1.5 0 10-2.121 2.121 1.5 1.5 0 002.122-2.122z'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M12.5 3.5V2M10.5 2h4M2 15h3M2 19h5'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
export default Timer02;
