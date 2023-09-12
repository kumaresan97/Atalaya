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
import styles from "../components/Calendar.module.scss";
import "../../../Global/Style.css";
import { Label, Spinner, SpinnerSize } from "@fluentui/react";
const Calendarview = (props) => {
  const [datas, setDatas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const Labelstyle = {
    root: {
      fontSize: "20px",
      color: "#A98640",
      padding: 0,
    },
  };
  const Labelstyle1 = {
    root: {
      fontSize: "15px",
      color: "#A98640",
      borderBottom: "1px solid #A98640",
      padding: 0,
      cursor: "pointer",
    },
  };
  const getEvents = () => {
    SPServices.SPReadItems({
      Listname: "Intranet Calendar",
    })
      .then(async (res) => {
        let arrDatas = [];
        res.forEach((val: any) => {
          arrDatas.push({
            title: val.Title,
            start: moment(val.Event).format("YYYY-MM-DD"),
            color: val.Color,
          });
        });
        console.log(res, "res");
        console.log(arrDatas);

        // await setDatas([...arrDatas]);
        let filterbyToday = arrDatas.filter(
          (val) =>
            moment(val.start).format("YYYYMMDD") == moment().format("YYYYMMDD")
        );
        setDatas([...filterbyToday]);
        setLoading(false);
        BindCalender(arrDatas);
      })
      .then(() => {
        // hideRowsWithSameClass();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const dummyEvents = [
  //     {
  //       title: "Event 1",
  //       start: "2023-08-01",
  //       end: "2023-08-01",
  //     },
  //     {
  //       title: "Event 2",
  //       start: "2023-08-03",
  //       end: "2023-08-03",
  //     },
  //     // Add more dummy events...
  //   ];
  const BindCalender = (data: any) => {
    console.log(data);

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

      // initialDate: moment().startOf("month").toDate(), // Set the initial date to the beginning of the current month
      // validRange: {
      //   start: moment().startOf("month").toDate(), // Set the start of the valid date range
      //   end: moment().endOf("month").toDate(), // Set the end of the valid date range
      // },

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
      showNonCurrentDates: false,
      fixedWeekCount: false,
      eventDidMount: (event) => {
        console.log("eventcolor", event);

        const eventTitle = event.event._def.title.toLowerCase();
        console.log(eventTitle);
        if (eventTitle.includes("birthday")) {
          event.el.setAttribute("data-bs-target", "birth");
          // event.el.style.backgroundColor = event.backgroundColor;
        } else if (eventTitle.includes("marriage")) {
          event.el.setAttribute("data-bs-target", "testmrg");
        } else if (eventTitle.includes("vacation")) {
          event.el.setAttribute("data-bs-target", "testvacation");
        } else if (eventTitle.includes("deepavali")) {
          event.el.setAttribute("data-bs-target", "deepavali");
        } else {
          event.el.setAttribute("data-bs-target", "event");
        }
        // event.el.setAttribute("data-id", event.event.id);
      },
      //filter conditions

      //   eventClick: function (info) {
      //     // alert("Event: " + info.event.title);
      //     let curData = gblData.filter((arr) => {
      //       return arr.ID == parseInt(info.event.id);
      //     })[0];
      //     props.EditPageNavigate(curData, "View", "CalenderView");
      //     info.el.style.borderColor = "red";
      //   },

      // dayCellDidMount: function (info) {
      //   const dayCellEl = info.el;
      //   const currentMonth = info.view.currentStart.getMonth();
      //   const cellMonth = info.date.getMonth();

      //   if (cellMonth !== currentMonth) {
      //     dayCellEl.style.display = "none"; // Hide cells for days of the next month
      //   }
      // },

      dateClick: function (arg) {
        console.log(arg);
      },
    });

    _Calendar.updateSize();
    _Calendar.render();
    // setLoader(false);
  };

  console.log(datas.length > 0 && datas[0].start, "datass");

  const NavigateSitePage = () => {
    console.log(props.context.pageContext.web.absoluteUrl);

    const nextPageUrl = `${props.context.pageContext.web.absoluteUrl}/SitePages/Calendar.aspx`;
    window.open(nextPageUrl, "_blank");
  };
  React.useEffect(() => {
    setLoading(true);
    getEvents();
    console.log(datas, "datas");
  }, []);
  return (
    <div style={{ background: "#fff", padding: "12px" }}>
      <div className={styles.Calender}>
        <Label styles={Labelstyle}>Firm Calendar</Label>
        <Label styles={Labelstyle1} onClick={() => NavigateSitePage()}>
          View all
        </Label>
      </div>
      <div id="myCalendar"></div>
      {datas.length > 0 ? (
        <div
          // style={{ display: "flex", gap: "20px" }}
          className={styles.showEvent}
        >
          <div
            // style={{ borderRight: "1px solid #A98644", paddingRight: "10px" }}
            className={styles.events}
          >
            {/* <Label>{moment(datas[0].start).format("D")}</Label> */}
            {/* //new */}
            <Label>
              {String(moment(datas[0].start).format("D")).padStart(2, "0")}
            </Label>

            <Label className={styles.month}>
              {moment(datas[0].start).format("MMM")}
            </Label>
          </div>
          <p style={{ color: "#000" }}>{datas[0].title}</p>
        </div>
      ) : (
        <div className={styles.nodatafound}>
          <Label>No Event Today</Label>
        </div>
      )}
    </div>
  );
};
export default Calendarview;
