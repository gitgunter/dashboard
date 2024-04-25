const Crown = (props) => {
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
        d='M3.518 10.306c-.388-1.074-.582-1.611-.5-1.955.091-.377.359-.67.701-.768.313-.09.8.127 1.773.56.86.382 1.29.573 1.695.563.446-.012.874-.19 1.215-.507.31-.287.517-.744.932-1.658l.915-2.016C11.013 2.842 11.395 2 12 2s.987.842 1.751 2.525l.915 2.016c.415.914.623 1.371.932 1.658.341.316.77.495 1.215.507.404.01.835-.181 1.695-.564.974-.432 1.46-.649 1.773-.559.342.098.61.391.7.768.083.344-.111.88-.5 1.955l-1.667 4.616c-.714 1.975-1.07 2.962-1.817 3.52-.747.558-1.712.558-3.641.558h-2.712c-1.93 0-2.894 0-3.64-.558-.747-.558-1.104-1.545-1.818-3.52l-1.668-4.616z'
        stroke='currentColor'
        strokeWidth={1.5}
      />
      <path
        d='M12 14h.009'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7 22h10'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </svg>
  );
};
export default Crown;
