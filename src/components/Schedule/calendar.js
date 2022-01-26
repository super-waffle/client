import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Dailydetails from './dailydetails';

export default function Calendar() {
  return (
    <div style={{ padding: '3rem 3rem' }}>
      <FullCalendar
        selectable="true"
        height="20rem"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        headerToolbar={{
          start: 'title',
          center: '',
          end: 'prev,today,next',
        }}
      />
      <Dailydetails />
    </div>
  );
}
