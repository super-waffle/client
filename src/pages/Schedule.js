import Calendar from '../components/Schedule/calendar/calendar';
import '../statics/scss/Schedule.scss';

export default function Schedule() {
  return (
    <main
      className="justify-content-center"
      style={{ padding: '1rem' }}
    >
      <Calendar />
    </main>
  );
}
