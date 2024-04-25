/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const DragDropVerticalSolid = (props) => {
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
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6 6a2 2 0 012-2h.006a2 2 0 010 4H8a2 2 0 01-2-2zm7.994 0a2 2 0 012-2H16a2 2 0 110 4h-.006a2 2 0 01-2-2zM6 12a2 2 0 012-2h.006a2 2 0 110 4H8a2 2 0 01-2-2zm7.994 0a2 2 0 012-2H16a2 2 0 110 4h-.006a2 2 0 01-2-2zM6 18a2 2 0 012-2h.006a2 2 0 110 4H8a2 2 0 01-2-2zm7.994 0a2 2 0 012-2H16a2 2 0 110 4h-.006a2 2 0 01-2-2z'
        fill='currentColor'
      />
    </svg>
  );
};
export default DragDropVerticalSolid;
