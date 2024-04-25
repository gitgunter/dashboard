/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const ArrowDataTransferHorizontal = (props) => {
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
        d='M19 9H6.659c-1.006 0-1.51 0-1.634-.309-.125-.308.23-.672.941-1.398L8.211 5M5 15h12.341c1.006 0 1.51 0 1.634.309.125.308-.23.672-.941 1.398L15.789 19'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
export default ArrowDataTransferHorizontal;
