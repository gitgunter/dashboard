/**
 * SVG Icon component.
 *
 * @param {React.SVGProps<SVGSVGElement>} props React SVG Props.
 */
const Settings01 = (props) => {
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
        d='M21.317 7.141l-.493-.856c-.373-.648-.56-.972-.878-1.101-.317-.13-.676-.027-1.395.176l-1.22.344c-.459.106-.94.046-1.358-.17l-.337-.194a2 2 0 01-.788-.967l-.334-.998c-.22-.66-.33-.99-.591-1.178-.261-.19-.609-.19-1.303-.19h-1.115c-.694 0-1.041 0-1.303.19-.261.188-.37.518-.59 1.178l-.334.998a2 2 0 01-.789.967l-.337.195c-.418.215-.9.275-1.358.17l-1.22-.345c-.719-.203-1.078-.305-1.395-.176-.318.129-.505.453-.878 1.1l-.493.857c-.35.608-.525.911-.491 1.234.034.324.268.584.736 1.105l1.031 1.153c.252.319.431.875.431 1.375s-.179 1.056-.43 1.375l-1.032 1.152c-.468.521-.702.782-.736 1.105-.034.323.14.627.49 1.234l.494.857c.373.647.56.971.878 1.1.317.13.676.028 1.395-.176l1.22-.344c.459-.105.94-.045 1.359.17l.336.194c.36.23.636.57.788.968l.334.997c.22.66.33.99.591 1.18.262.188.609.188 1.303.188h1.115c.694 0 1.042 0 1.303-.189.261-.189.371-.519.59-1.179l.335-.997c.152-.399.428-.738.788-.968l.336-.194c.42-.215.9-.276 1.36-.17l1.22.344c.718.204 1.077.306 1.394.177.318-.13.505-.454.878-1.101l.493-.857c.35-.607.525-.91.491-1.234-.034-.323-.268-.584-.736-1.105l-1.031-1.152c-.252-.32-.431-.875-.431-1.375s.179-1.056.43-1.375l1.032-1.153c.468-.52.702-.781.736-1.105.034-.323-.14-.626-.49-1.234z'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M15.52 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z'
        stroke='currentColor'
        strokeWidth={1.5}
      />
    </svg>
  );
};
export default Settings01;