import css from './Switch.module.css';
// import { useState } from 'react';


// export const Switch = ({ initialState, onChange }) => {
//   const [checked, setChecked] = useState(initialState);

//   const handleToggle = () => {
//     const newState = !checked;
//     setChecked(newState);
//     if (onChange) {
//       onChange(newState);
//     }
//   };

//   return (
//     <label className={`${css.Switch} ${checked ? css.active : ''}`}>
//       <input
//         type='checkbox'
//         checked={checked}
//         onChange={handleToggle}
//         style={{
//           display: 'none',
//           visibility: 'hidden',
//           pointerEvents: 'none',
//           userSelect: 'none',
//           width: 0,
//           height: 0,
//         }}
//       />
//       <span className={css.slider}></span>
//     </label>
//   );
// };

export const Switch = ({ name, value, onChange }) => {
  return (
    <label className={`${css.Switch} ${value ? css.active : ''}`}>
      <input
        type='checkbox'
        name={name}
        checked={value}
        onChange={onChange}
        style={{
          display: 'none',
          visibility: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
          width: 0,
          height: 0,
        }}
      />
      <span className={css.slider}></span>
    </label>
  );
};
