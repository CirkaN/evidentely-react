import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridWeek from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { useEffect, useState } from 'react';
import CreateAppointmentModal from './modals/create_appointment';
import axios_instance from './config/api_defaults';


interface AppointmentInterface {
  title: string | null,
  start: number,
  end: number,
}

const MyCalendar = () => {
  const [dates, setDates] = useState([]);
  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] = useState(false);
  const [createAppointmentData, setCreateAppointmentData] = useState<AppointmentInterface>({ title: "", start: 0, end: 0 });

  const setAppointmentData = (data: AppointmentInterface) => {
    setCreateAppointmentData(data);
  };

  const openAppointmentCreateModal = () => {
    setIsCreateAppointmentModalOpen(true);
  };

  const closeAppointmentCreateModal = () => {
    setIsCreateAppointmentModalOpen(false);
  };

  const fetchDates = () => {
    fetch("http://localhost:8070/api/dates")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setDates(data)
      })
  }
  const updateAppointmentData = (title: string) => {

    setCreateAppointmentData((oldData) => ({ ...oldData, title }));

    closeAppointmentCreateModal();

    console.log(setCreateAppointmentData);
  };

  const sendFormData = () => {
    axios_instance.get('test').then(response => {
      console.log(response);
    })
  }

  useEffect(() => {
    fetchDates();
  }, []);

  useEffect(() => {
    //console.log(createAppointmentData);
  }, [createAppointmentData]);

  return (
    <>
      <CreateAppointmentModal cancelFunction={cancelAction} saveFunction={saveAppointment} isOpen={isCreateAppointmentModalOpen} />
      <div>
        <h1>Demo App wtf </h1>
        <h2>is this ju kela</h2>
        <h2>ttt{import.meta.env.VITE_API_URL}</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridWeek]}
          initialView='timeGridWeek'
          weekends={false}
          events={dates}
          editable={true}
          nowIndicator={true}
          selectable={true}
          eventContent={renderEventContent}
          eventDrop={handleDrop}
          select={handleSelect}
          eventClick={handleClick}
          eventResize={handleEventResizeStop}
          //eventChange = {handleSad}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed

        />
      </div>
    </>
  )


  function saveAppointment(title: string) {


    updateAppointmentData(title);
    sendFormData();

    console.log(createAppointmentData);
  }
  function cancelAction() {
    closeAppointmentCreateModal();
  }
  function handleSad(event) {
    console.log(event);
  }

  function handleClick(clickEvent) {
    console.log('ovo klikcem');
    console.log(clickEvent);
  }

  function handleSelect(selectEvent) {
    openAppointmentCreateModal();
    let start = selectEvent.start.toJSON();
    let end = selectEvent.end.toJSON();

    let preparedJson: AppointmentInterface = {
      start: start,
      end: end,
      title: null
    };
    setAppointmentData(preparedJson);

  }

  function handleDrop(eventDragged) {
    if (eventDragged.event.start && eventDragged.event.end) {

      let json = {
        start: eventDragged.event._instance.range.start.toJSON(),
        end: eventDragged.event._instance.range.end.toJSON(),
        id: eventDragged.event.id
      }

      console.log(json);
      //handle update to DB..
    }
  }

  function handleEventResizeStop(info) {
    if (!confirm("Are you sure you want to update the event?")) {
      info.revert();
    } else {
      let json = {
        id: info.event.id,
        end: info.event.end.getTime(),
      }
      console.log(json);

    }



  }
  function handleEvents(events) {
    //  console.log(events);
  }

  // a custom render function
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
}



export default MyCalendar
