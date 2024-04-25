const Folder01 = (props) => {
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
        d='M7 7h9.75c2.107 0 3.16 0 3.917.506a3 3 0 01.827.827C22 9.09 22 10.143 22 12.25c0 3.511 0 5.267-.843 6.528a4.998 4.998 0 01-1.38 1.38C18.518 21 16.762 21 13.25 21H12c-4.714 0-7.071 0-8.536-1.465C2 18.072 2 15.714 2 11V7.944c0-1.816 0-2.724.38-3.406A3 3 0 013.538 3.38C4.22 3 5.128 3 6.944 3 8.108 3 8.69 3 9.2 3.191c1.163.436 1.643 1.493 2.168 2.542L12 7'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </svg>
  );
};
export default Folder01;
