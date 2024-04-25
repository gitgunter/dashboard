import { Emoji } from 'emoji-picker-react';
import css from './ProfileAvatar.module.css';

const ProfileAvatar = ({ emoji, color }) => {
  const COLOR = [
    'pink',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'white',
  ];

  return (
    <div
      className={`${css.ProfileAvatar} ${
        COLOR.includes(color) ? css[color] : css[COLOR[7]]
      }`}
    >
      <Emoji size={24} unified={emoji} />
    </div>
  );
};
export default ProfileAvatar;
