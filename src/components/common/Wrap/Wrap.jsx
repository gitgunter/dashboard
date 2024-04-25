const Wrap = ({
  className,
  display,
  direction,
  align,
  justify,
  rowGap,
  columnGap,
  width,
  height,
  children,
}) => {
  return (
    <div
      className={className}
      style={{
        display: display || 'flex',
        flexDirection: direction || 'row',
        alignItems: align || 'flex-start',
        justifyContent: justify || 'flex-start',
        rowGap: rowGap || 'auto',
        columnGap: columnGap || 'auto',
        width: width || 'auto',
        height: height || 'auto',
      }}
    >
      {children}
    </div>
  );
};
export default Wrap;
