import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridWeek from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { useEffect, useState } from 'react';
import CreateAppointmentModal from './modals/create_appointment/create_appointment';
import axios_instance from './config/api_defaults';


const abortController = new AbortController;

interface AppointmentInterface {
  title: string | undefined,
  start: string,
  end: string,
  price: number | null,
  remind_client: boolean
}
interface BackendResponse {
  data: dataFromBackend[];
}

interface dataFromBackend {
  id: string,
  title: string | undefined,
  start: string,
  end: string,
  price: number | null,
  remind_client: boolean,
}


const MyCalendar = () => {
  const [dates, setDates] = useState<dataFromBackend[]>([]);
  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] = useState(false);
  const [createAppointmentData, setCreateAppointmentData] = useState<AppointmentInterface>({ title: "", start: new Date().toISOString(), end: new Date().toISOString(), price: 100, remind_client: false });

  const setAppointmentData = (data: AppointmentInterface) => {
    setCreateAppointmentData(data);
  };

  const openAppointmentCreateModal = () => {
    setIsCreateAppointmentModalOpen(true);
  };

  const closeAppointmentCreateModal = () => {
    setIsCreateAppointmentModalOpen(false);
  };

  const mutateDates = (dataFromBackend: BackendResponse) => {

    dataFromBackend.data.map(item => ({
      start: new Date(item.start),
      end: new Date(item.end),
      title: item.title,
      id: item.id
    }));

    setDates(dataFromBackend.data);

  }

  const fetchDates = () => {

    axios_instance.get('appointments', { signal: abortController.signal })

      .then(response => {
        mutateDates(response.data);
      })

  }
  const updateAppointmentData = (title: string) => {
    let dataCopied = JSON.parse(JSON.stringify(createAppointmentData));
    dataCopied.title = title;

    setCreateAppointmentData(dataCopied)
    sendFormData(dataCopied);

    closeAppointmentCreateModal();

  };

  const sendFormData = (dataCopied: AppointmentInterface) => {

    let myHardcodedData = dataCopied
    myHardcodedData.price = 100
    myHardcodedData.remind_client = false;

    //client_id
    //todo remind_settings

    console.log(createAppointmentData);

    axios_instance.post('appointments', myHardcodedData)
      .then(() => {
        fetchDates();
      })
  }

  useEffect(() => {
    fetchDates();
    return () => {
      abortController.abort;
    }
  }, []);

  return (
    <>
      <CreateAppointmentModal cancelFunction={cancelAction} saveFunction={saveAppointment} isOpen={isCreateAppointmentModalOpen} />
      <div>
        <h1>My Calendar</h1>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridWeek]}
          initialView='timeGridWeek'
          weekends={true}
          events={dates}
          editable={true}
          nowIndicator={true}
          selectable={true}
          eventContent={renderEventContent}
          eventDrop={handleDrop}
          select={(e) => handleSelect(e.startStr, e.endStr)}
          eventClick={(e) => handleClick(e.event.id)}
          eventResize={(e) => handleEventResizeStop(e.event.startStr, e.event.endStr, e.event.id, e.revert)}
        //  eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        />
      </div>
    </>
  )

  function saveAppointment(title: string) {
    updateAppointmentData(title);
  }

  function cancelAction() {
    closeAppointmentCreateModal();
  }

  function handleClick(id: string) {
    console.log('ovo klikcem' + id);
  }

  function handleSelect(start: string, end: string) {

    openAppointmentCreateModal();

    let preparedJson: AppointmentInterface = {
      start: start,
      end: end,
      title: "",
      price: null,
      remind_client: false
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

  function handleEventResizeStop(startStr: string, endStr: string, id: string, revert: { (): void; revert?: any; }) {
    if (!confirm("Are you sure you want to update the event?")) {
      revert.revert();
    } else {
      let json = {
        id: id,
        start:startStr,
        end: endStr,
      }

      //update event
      console.log(json);
    }

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
