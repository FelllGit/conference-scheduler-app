// components/calendar/Calendar.tsx
import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useUpdateSheduledMeet } from "@/hooks/useUpdateSheduledMeet";
import "@/components/calendar/calendar.scss";
import { useGetSheduledMeet } from "@/hooks/useGetSheduledMeets.ts";
import CalendarHeader from "@/components/calendar/calendarHeader.tsx";
import { EventContentArg, EventDropArg } from "@fullcalendar/core";
import { Meeting } from "@/interfaces/meetings.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import DeleteMeetDialog from "@/pages/SharedLayout/deleteMeetDialog.tsx";

const Calendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);

  const selectedUser = useSelector(
    (state: RootState) => state.userFilter.selectedUser
  );

  // Отримуємо мітинги з сервера
  const { data: meetings, isLoading, isError, error } = useGetSheduledMeet();

  // Хук для оновлення мітингів
  const { mutate: updateMeet } = useUpdateSheduledMeet();

  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.prev();
    }
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.next();
    }
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.today();
    }
  };

  const handleEventDrop = (eventDropInfo: EventDropArg) => {
    const { event } = eventDropInfo;

    if (!event.start) {
      return;
    }

    const payload = {
      id: parseInt(event.id),
      sheduledDate: event.start.toISOString(),
    };

    console.log("Payload being sent:", payload);

    updateMeet(payload);
  };

  const eventContent = ({ event }: EventContentArg): JSX.Element => (
    <div>
      <strong>{event.title}</strong>
      <div>Created by: {event.extendedProps.createdBy}</div>
      <div className="truncate">
        Invited: {event.extendedProps.invitedUsers.join(", ")}
        <span className="text-ellipsis">..</span>
      </div>
      <DeleteMeetDialog meetId={+event.id} />
    </div>
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const filteredMeetings = selectedUser
    ? meetings?.filter((meeting: Meeting) =>
        meeting.usersInMeets.some(
          (usersInMeet) => usersInMeet.user.id === selectedUser.id
        )
      )
    : meetings;

  const calendarEvents = filteredMeetings?.map((meeting: Meeting) => {
    const startDate = new Date(meeting.sheduledDate);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration
    const eventObject = {
      id: meeting.id.toString(),
      title: meeting.name,
      start: startDate,
      end: endDate,
      extendedProps: {
        createdBy: meeting.creatorUser.name,
        invitedUsers: meeting.usersInMeets.map(
          (usersInMeet) => usersInMeet.user.name
        ),
      },
    };
    console.log("Calendar event:", eventObject);
    return eventObject;
  });

  return (
    <div className="h-full flex flex-col">
      <CalendarHeader
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
      />
      <div className="flex-grow">
        <FullCalendar
          timeZone="UTC"
          ref={calendarRef}
          height="100%"
          handleWindowResize={true}
          plugins={[timeGridPlugin, interactionPlugin]}
          events={calendarEvents}
          eventContent={eventContent}
          editable={true}
          eventDrop={handleEventDrop}
          headerToolbar={{
            left: "",
            center: "",
            right: "",
          }}
          firstDay={1}
          initialView="timeGridWeek"
          views={{
            timeGridWeek: {
              slotDuration: "01:00:00",
              slotLabelFormat: {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              },
              hiddenDays: [0, 7],
              slotMinTime: "10:00:00",
              slotMaxTime: "18:00:00",
              allDaySlot: false,
              slotLabelInterval: "01:00:00",
              expandRows: true,
            },
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
