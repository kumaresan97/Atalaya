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
import {
  DefaultButton,
  IButtonStyles,
  IconButton,
  Label,
  Spinner,
  SpinnerSize,
  TooltipHost,
} from "@fluentui/react";
const Calendarview = (props) => {
  const [datas, setDatas] = React.useState([]);
  const [upcomingEvents, setUpcomingEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentEventIndex, setCurrentEventIndex] = React.useState(0);
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
  const btnStyle: Partial<IButtonStyles> = {
    rootHovered: {
      backgroundColor: "#fff",
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

        // await setDatas([...arrDatas]);
        // let filterbyToday = arrDatas.filter(
        //   (val) =>
        //     moment(val.start).format("YYYYMMDD") == moment().format("YYYYMMDD")
        // );

        //new
        const now = moment();
        const todaysEvents = arrDatas.filter(
          (val) =>
            moment(val.start).format("YYYYMMDD") == now.format("YYYYMMDD")
        );

        if (todaysEvents.length > 0) {
          setDatas([...todaysEvents]);
        } else {
          const upcomingEvents = arrDatas.filter(
            (val) => moment(val.start) > now
          );

          if (upcomingEvents.length > 0) {
            upcomingEvents.sort(
              (a: any, b: any) =>
                moment(a.start).valueOf() - moment(b.start).valueOf()
            );
            setDatas([...upcomingEvents]);
          }
        }

        // setDatas([...filterbyToday]);
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
        const eventTitle = event.event._def.title.toLowerCase();
        event.el.setAttribute("data-bs-target", "event");
        // console.log(eventTitle);
        // if (eventTitle.includes("birthday")) {
        //   event.el.setAttribute("data-bs-target", "birth");
        //   // event.el.style.backgroundColor = event.backgroundColor;
        // } else if (eventTitle.includes("marriage")) {
        //   event.el.setAttribute("data-bs-target", "testmrg");
        // } else if (eventTitle.includes("vacation")) {
        //   event.el.setAttribute("data-bs-target", "testvacation");
        // } else if (eventTitle.includes("deepavali")) {
        //   event.el.setAttribute("data-bs-target", "deepavali");
        // } else {
        //   event.el.setAttribute("data-bs-target", "event");
        // }
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
        const allDayNumberElements = document.querySelectorAll(
          ".fc-daygrid-day-number"
        );
        allDayNumberElements.forEach((dayNumber) => {
          (dayNumber as HTMLElement).style.color = "";
        });

        const dayNumber = arg.dayEl.querySelector(".fc-daygrid-day-number");
        if (dayNumber) {
          console.log(dayNumber, "daynumber");
          (dayNumber as HTMLElement).style.color = "#a98644";
        }
        const selectedDateString = moment(arg.dateStr).format("YYYYMMDD");

        const filterEvents = data.filter(
          (event) =>
            moment(event.start).format("YYYYMMDD") === selectedDateString
        );
        const allDateElements = document.querySelectorAll(".fc-day");
        // allDateElements.forEach((dateElement) => {
        //   (dateElement as HTMLElement).style.backgroundColor = "";
        // });

        // // Set background color for the clicked date
        // arg.dayEl.style.backgroundColor = "red";

        setDatas([...filterEvents]);
        setCurrentEventIndex(0);
      },
    });

    _Calendar.updateSize();
    _Calendar.render();
    // setLoader(false);
  };

  const NavigateSitePage = () => {
    const nextPageUrl = `${props.context.pageContext.web.absoluteUrl}/SitePages/Calendar.aspx`;
    window.open(nextPageUrl, "_blank");
  };
  const navigateNextEvent = () => {
    if (currentEventIndex < datas.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    }
  };
  const navigatePreviousEvent = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - 1);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    getEvents();
  }, []);
  return (
    <div
      className={styles.calendercontainer}
      // style={{ background: "#fff", padding: "12px" }}
    >
      <div className={styles.Calender}>
        <Label styles={Labelstyle}>Firm Calendar</Label>
        <Label styles={Labelstyle1} onClick={() => NavigateSitePage()}>
          View all
        </Label>
      </div>
      <div id="myCalendar"></div>
      {/* {datas.length > 0 ? (
        <div
          
          className={styles.showEvent}
        >
          <div
            
            className={styles.events}
          >
           
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
        upcomingEvents.length > 0 && (
          
          <div
            
            className={styles.showEvent}
          >
            <div
             
              className={styles.events}
            >
             
              <Label>
                {String(moment(upcomingEvents[0].start).format("D")).padStart(
                  2,
                  "0"
                )}
              </Label>

              <Label className={styles.month}>
                {moment(upcomingEvents[0].start).format("MMM")}
              </Label>
            </div>
            <p style={{ color: "#000" }}>{upcomingEvents[0].title}</p>
          </div>
        )
      )} */}
      {/* //new */}
      {datas.length > 0 && datas[currentEventIndex] ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className={styles.showEvent}>
            <div className={styles.events}>
              <Label>
                {String(
                  moment(datas[currentEventIndex].start).format("D")
                ).padStart(2, "0")}
              </Label>
              <Label className={styles.month}>
                {moment(datas[currentEventIndex].start).format("MMM")}
              </Label>
            </div>
            <TooltipHost
              styles={{ root: { width: "calc(100% - 76px)" } }}
              content={datas[currentEventIndex].title}
            >
              {" "}
              <p style={{ color: "#000" }}>{datas[currentEventIndex].title}</p>
            </TooltipHost>
          </div>
          {datas.length > 1 && (
            <div className={styles.prevnextcontainer}>
              <IconButton
                iconProps={{ iconName: "ChevronLeftMed" }}
                title="Previous"
                styles={btnStyle}
                onClick={navigatePreviousEvent}
                disabled={currentEventIndex === 0}
              />
              <IconButton
                title="Next"
                styles={btnStyle}
                iconProps={{ iconName: "ChevronRightMed" }}
                onClick={navigateNextEvent}
                disabled={currentEventIndex === datas.length - 1}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.nodatafound}>
          <Label>No events scheduled ...</Label>
        </div>
      )}
    </div>
  );
};
export default Calendarview;
