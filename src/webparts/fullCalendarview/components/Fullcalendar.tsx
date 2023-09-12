import { DatePicker, DefaultButton, Label } from "@fluentui/react";
import styles from "../components/FullCalendarview.module.scss";
import * as React from "react";
import SPServices from "../../../Global/SPServices";
import * as moment from "moment";
import "./style.css";
const dathandle = {
  Events: "",
  Date: moment().format(),
};
const Fullcalendar = (props) => {
  const [selectedvalue, setSelectedvalue] = React.useState(dathandle);
  const [selected, setSelected] = React.useState({
    Active: "today",
  });
  const [events, setEvents] = React.useState([]);
  const [masterevents, masterEvents] = React.useState([]);
  const Datestyle = {
    root: {
      width: "200px",
    },
  };
  const Datelabel = {
    root: {
      padding: "0px",
      textAlign: "center",
      fontSize: "22px",
      color: "#000",
    },
  };
  const monthLabel = {
    root: {
      fontSize: "22px",
      textAlign: "center",
      fontWeight: "600",
      color: "#a98644",
      padding: "0px",
    },
  };
  const getDates = () => {
    SPServices.SPReadItems({
      Listname: "Intranet Calendar",
    })
      .then((res) => {
        let arrDatas = [];
        res.forEach((val: any) => {
          arrDatas.push({
            title: val.Title,
            start: moment(val.Event).format("YYYY-MM-DD"),
          });
        });
        console.log(res, "res");
        console.log(arrDatas);
        setEvents([...arrDatas]);
        let FilterData = arrDatas.filter(
          (val) =>
            moment(val.start).format("YYYYMMDD") == moment().format("YYYYMMDD")
        );

        masterEvents([...FilterData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterHandler = (key: string, value: string) => {
    let localKeys = {
      Events: "",
      Date: moment().format(),
    };
    localKeys[key] = value;

    let today = moment().format("YYYYMMDD");
    console.log(today, moment(localKeys.Date).format("YYYYMMDD"));

    if (today === moment(localKeys.Date).format("YYYYMMDD")) {
      setSelected({ ...selected, Active: "today" });
    } else {
      setSelected({ ...selected, Active: "" });
    }
    setSelectedvalue({ ...localKeys });
    Filtervalues(localKeys);
  };
  const Filtervalues = (filterValue) => {
    let localMaster = events;
    if (filterValue.Date && !filterValue.Events) {
      localMaster = localMaster.filter((arr) => {
        return (
          moment(arr.start).format("YYYYMMDD") ===
          moment(filterValue.Date).format("YYYYMMDD")
        );
      });
    } else if (filterValue.Events === "today") {
      const today = moment().format("YYYYMMDD");
      localMaster = localMaster.filter((arr) => {
        return (
          moment(arr.start).format("YYYYMMDD") === moment().format("YYYYMMDD")
        );
      });
    } else if (filterValue.Events === "upcoming") {
      let today = moment().format("YYYYMMDD");
      localMaster = localMaster.filter((arr) => {
        return (
          moment(arr.start).format("YYYYMMDD") > moment().format("YYYYMMDD")
        );
      });
      // } else if (filterValue.Date) {
      //   localMaster = localMaster.filter((arr) => {
      //     return (
      //       moment(arr.start).format("YYYYMMDD") ===
      //       moment(filterValue.Date).format("YYYYMMDD")
      //     );
      //   })
    }
    masterEvents([...localMaster]);
  };
  React.useEffect(() => {
    getDates();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.labelHead}>
          <DefaultButton
            onClick={() => {
              filterHandler("Events", "today");
              setSelected({ ...selected, Active: "today" });
            }}
            className={
              selected.Active == "today" ? styles.activeBtn : styles.inActive
            }
          >
            Today
          </DefaultButton>
          <DefaultButton
            onClick={() => {
              filterHandler("Events", "upcoming");
              setSelected({ ...selected, Active: "upcoming" });
            }}
            className={
              selected.Active == "upcoming" ? styles.activeBtn : styles.inActive
            }
          >
            Upcoming Events
          </DefaultButton>
        </div>
        <DatePicker
          styles={Datestyle}
          placeholder="select date"
          value={new Date(selectedvalue.Date)}
          // value={selectedvalue.Date?selectedvalue.Date:null}
          // formatDate={(date) => filterValue.listDate}
          onSelectDate={(e: any) => {
            filterHandler("Date", moment(e).format());
          }}
          formatDate={(date) => moment(date).format("MM/DD/YYYY")}
        />
      </div>

      {/* events */}
      <div className={styles.calender_container_wraper}>
        {masterevents.length > 0 ? (
          masterevents.map((val) => {
            return (
              <div className={styles.calender_wraper}>
                <div className={styles.calender_wraper_inner}>
                  <div className={styles.date_wrap}>
                    {/* <Label styles={Datelabel}>
                      {moment(val.start).format("D")}
                    </Label> */}
                    <Label styles={Datelabel}>
                      {String(moment(val.start).format("D")).padStart(2, "0")}
                    </Label>
                    <Label styles={monthLabel}>
                      {moment(val.start).format("MMM")}
                    </Label>
                  </div>
                  <div className={styles.title_wrap}>
                    <p className={styles.title}>{val.title}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Label
            styles={{
              root: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "20vh",
                fontSize: "18px",
                fontWeight: "500",
                width: "100%",
                marginTop: "30px",
              },
            }}
          >
            No Events Found...
          </Label>
        )}
      </div>
    </div>
  );
};
export default Fullcalendar;
