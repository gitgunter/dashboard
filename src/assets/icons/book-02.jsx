/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const Book02 = (props) => {
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
        d='M20.5 16.929V10c0-3.771 0-5.657-1.172-6.828C18.157 2 16.271 2 12.5 2h-1C7.729 2 5.843 2 4.672 3.172 3.5 4.343 3.5 6.229 3.5 10v9.5'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M20.5 17H6a2.5 2.5 0 000 5h14.5M20.5 22a2.5 2.5 0 010-5'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M15 7H9M12 11H9'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
export default Book02;
