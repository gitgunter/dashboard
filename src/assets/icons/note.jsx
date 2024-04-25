/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const Note = (props) => {
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
        d='M12.88 7.017l4.774 1.271m-5.796 2.525l2.386.636m-2.268 6.517l.955.255c2.7.72 4.05 1.079 5.114.468 1.063-.61 1.425-1.953 2.148-4.637l1.023-3.797c.724-2.685 1.085-4.027.471-5.085-.614-1.057-1.963-1.417-4.664-2.136l-.954-.255c-2.7-.72-4.05-1.079-5.113-.468-1.064.61-1.426 1.953-2.15 4.637l-1.022 3.797c-.724 2.685-1.086 4.027-.471 5.085.614 1.057 1.964 1.417 4.663 2.136z'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M12 20.946l-.952.26c-2.694.733-4.04 1.1-5.102.477-1.06-.622-1.422-1.99-2.143-4.728l-1.021-3.872c-.722-2.737-1.083-4.106-.47-5.184C2.842 6.966 4 7 5.5 7'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </svg>
  );
};
export default Note;
