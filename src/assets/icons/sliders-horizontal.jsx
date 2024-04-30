const SlidersHorizontal = (props) => {
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
        d='M4 5h6M13 5h7M16 9v6M10 2v6M12 16v6M16 12h4M4 12h9M12 19h8M4 19h5'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </svg>
  );
};
export default SlidersHorizontal;
