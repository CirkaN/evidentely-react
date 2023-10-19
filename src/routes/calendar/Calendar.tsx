import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridWeek from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { useEffect, useState } from 'react';
import CreateAppointmentModal from '../../modals/create_appointment/create_appointment';
import axios_instance from '../../config/api_defaults';
import { Toaster, toast } from 'react-hot-toast';
import SweetAlert2 from 'react-sweetalert2';
import { EventChangeArg } from '@fullcalendar/core/index.js';
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
  const [swalProps, setSwalProps] = useState({});

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

    const dataCopied = JSON.parse(JSON.stringify(createAppointmentData));
    dataCopied.title = title;

    setCreateAppointmentData(dataCopied)
    sendFormData(dataCopied);

    closeAppointmentCreateModal();

  };

  const sendFormData = (dataCopied: AppointmentInterface) => {

    const myHardcodedData = dataCopied
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
      <div><Toaster /></div>
      <SweetAlert2 {...swalProps} />
      <CreateAppointmentModal appointment_data={createAppointmentData} cancelFunction={cancelAction} saveFunction={saveAppointment} isOpen={isCreateAppointmentModalOpen} />
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
          eventContent={(e) => renderEventContent(e.timeText, e.event.title)}
          eventDrop={(e) => { handleDrop(e.event.startStr, e.event.endStr, e.event.id) }}
          select={(e) => handleSelect(e.startStr, e.endStr)}
          eventClick={(e) => handleClick(e.event.id)}
          eventResize={(e) => handleEventResizeStop(e.event.startStr, e.event.endStr, e.event.id, e.revert as unknown as EventChangeArg)}
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

  function setSwalOff() {
    const dataCopied = JSON.parse(JSON.stringify(swalProps));
    dataCopied.show = false;
    setSwalProps(dataCopied);
  }

  function handleClick(id: string) {
    //todo open edit modal
    setSwalProps({
      show: true,
      title: 'Basic Usage',
      text: 'Hello World',
      onConfirm: setSwalOff,
    });
    console.log('ovo klikcem' + id);
  }

  function handleSelect(start: string, end: string) {

    const preparedJson: AppointmentInterface = {
      start: start,
      end: end,
      title: "",
      price: null,
      remind_client: false
    };

    setAppointmentData(preparedJson);
    openAppointmentCreateModal();
  }

  function handleDrop(start: string, end: string, id: string) {
    const jsonPrepared = {
      start: start,
      end: end,
      update_via: 'drop',
    }

    axios_instance.put('appointments/' + id, jsonPrepared).then(response => {
      if (response.status === 200) {
        toast.success('Event Successfully Updated!')
      }
    })

  }

  

  function handleEventResizeStop(startStr: string, endStr: string, id: string, revert: EventChangeArg) {
    if (!confirm("Are you sure you want to update the event?")) {
      revert.revert();
    } else {
      const json = {
        start: startStr,
        update_via: 'drop',
        end: endStr,
      }

      axios_instance.put('appointments/' + id, json).then(response => {
        console.log(response);
        if (response.status === 200) {
          toast.success('Event Successfully Updated!')
        }
      })
    }

  }

  function renderEventContent(timeText: string, title: string) {
    return (
      <>
        <b>{timeText}</b>
        <i>{title}</i>
      </>
    )
  }
}



export default MyCalendar
