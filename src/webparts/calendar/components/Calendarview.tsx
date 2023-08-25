import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import SPServices from "../../../Global/SPServices";
import * as moment from "moment";
const Calendarview = (props) => {
  const getEvents = () => {
    SPServices.SPReadItems({
      Listname: "Calendarview",
    })
      .then((res) => {
        let arrDatas = [];
        res.forEach((val: any) => {
          arrDatas.push({
            title: val.Title,
            start: moment(val.Event).format("YYYY-MM-DD"),
          });
        });
        BindCalender(arrDatas);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dummyEvents = [
    {
      title: "Event 1",
      start: "2023-08-01",
      end: "2023-08-01",
    },
    {
      title: "Event 2",
      start: "2023-08-03",
      end: "2023-08-03",
    },
    // Add more dummy events...
  ];
  const BindCalender = (data: any) => {
    let calendarEl = document.getElementById("myCalendar");
    let _Calendar = new Calendar(calendarEl, {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        bootstrap5Plugin,
      ],
      selectable: true,
      buttonText: {
        today: "Today",
        dayGridMonth: "Month",
        dayGridWeek: "Week - ListGrid",
        timeGridWeek: "Week",
        dayGridDay: "Day - ListGrid",
        timeGridDay: "Day",
        listWeek: "List",
      },

      headerToolbar: {
        left: "prev next",
        center: "title",
        right:
          // "dayGridMonth dayGridWeek timeGridWeek dayGridDay timeGridDay listWeek",
          "",
      },
      initialDate: new Date(),
      //   validRange: {
      //     start: new Date(),
      //   },
      events: data,
      height: "auto",
      displayEventTime: true,
      weekends: true,
      dayMaxEventRows: true,
      views: {
        dayGrid: {
          dayMaxEventRows: 4,
        },
      },
      //   eventClick: function (info) {
      //     // alert("Event: " + info.event.title);
      //     let curData = gblData.filter((arr) => {
      //       return arr.ID == parseInt(info.event.id);
      //     })[0];
      //     props.EditPageNavigate(curData, "View", "CalenderView");
      //     info.el.style.borderColor = "red";
      //   },
      dateClick: function (arg) {
        console.log(arg);
      },
    });

    _Calendar.updateSize();
    _Calendar.render();
    // setLoader(false);
  };
  React.useEffect(() => {
    getEvents();
  }, []);
  return (
    <div>
      <div id="myCalendar"></div>
    </div>
  );
};
export default Calendarview;
