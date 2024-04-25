import useClock from '../../utils/useClock';
import css from './WelcomeMessage.module.css';

const WelcomeMessage = ({ username }) => {
  const costaRicaTime = useClock('America/Costa_Rica');

  const GREETINGS = ['Buenos días', 'Buenas tardes', 'Buenas noches'];

  const handleGreetings = (hours, ampm) => {
    if (ampm === 'AM') {
      if (hours === 12 || (hours >= 1 && hours <= 11)) {
        return GREETINGS[0];
      }
    } else if (ampm === 'PM') {
      if (hours === 12 || (hours >= 1 && hours <= 5)) {
        return GREETINGS[1];
      } else if (hours >= 6 && hours <= 11) {
        return GREETINGS[2];
      }
    } else {
      return 'Hola'
    }
  };

  const hours = costaRicaTime.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const twelveHourFormat = hours % 12 || 12;

  return (
    <div className={css.WelcomeMessage}>
      <h1 className={css.greetings}>{`${handleGreetings(
        twelveHourFormat,
        ampm
      )},`}</h1>
      <h2 className={css.username}>{`${username}.`}</h2>
    </div>
  );
};
export default WelcomeMessage;
