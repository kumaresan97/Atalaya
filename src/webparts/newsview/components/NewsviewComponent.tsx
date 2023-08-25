import * as React from "react";
import { useEffect, useState } from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { sp } from "@pnp/sp/presets/all";
import * as moment from "moment";
import { INews } from "../../../Global/AtalayaInterface";
import SPServices from "../../../Global/SPServices";
import { Config } from "../../../Global/Config";
import "../../news/components/style.css";
import { DatePicker, Dropdown, Label } from "@fluentui/react";
let masterData = [];
interface IFilterKeys {
  Date: string;
  Name: string;
}
let FilterKeys: IFilterKeys = {
  Date: moment().format(),
  Name: "All",
};
const NewsviewComponent = (props) => {
  const [masternews, setMasternews] = useState([]);
  const [news, setNews] = useState<INews[]>([]);
  // const [selectedValue, setSelectedValues] = useState({
  //   Dropvalues: "All",
  //   datevalue: moment().format("MM/DD/YYYY"),
  // });
  const [selectedValue, setSelctedValue] = useState<IFilterKeys>(FilterKeys);

  const dropdownStyles = {
    root: {
      // Add your custom styles for the root element here
      // border: "1px solid #ccc",
      // borderRadius: "4px",

      width: "200px",
    },
  };

  const getData = () => {
    // sp.web.lists
    //   .getByTitle("News")
    //   .items.select("*", "Author/Title", "Author/EMail")
    //   .expand("Author").top(4)

    //   .get()
    SPServices.SPReadItems({
      Listname: Config.ListNames.News,
      Select: "*,Author/Title, Author/EMail",
      Topcount: 5000,
      Expand: "Author",
    })
      .then((res) => {
        let arrDatas: INews[] = [];
        res.forEach((val: any) => {
          arrDatas.push({
            Id: val.Id,

            Description: val.Description,
            imageUrl: val.Image,
            CreatedEmail: val.Author.EMail,
            DisplayName: val.Author.Title,
            Created: val.Created,
            TagName: val.TagName,
          });
        });
        // console.log(res);
        masterData = arrDatas;
        let filterbyDate = arrDatas.filter(
          (val) =>
            moment(val.Created).format("YYYYMMDD") ==
            moment().format("YYYYMMDD")
        );
        setMasternews([...filterbyDate]);
        setNews([...arrDatas]);
        // Filtervalues(arrDatas, null, selectedValue.datevalue);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filterHandler = (key: string, value: string) => {
    let localKeys = { ...selectedValue };
    localKeys[key] = value;
    setSelctedValue({ ...localKeys });
    Filtervalues(localKeys);
  };
  const Filtervalues = (filterValue: IFilterKeys) => {
    let localMaster = news;
    if (filterValue.Name != "All") {
      localMaster = localMaster.filter((arr) => {
        return arr.TagName == filterValue.Name;
      });
    }
    if (filterValue.Date != null) {
      localMaster = localMaster.filter((arr) => {
        console.log(arr.Created, filterValue.Date);

        return (
          moment(arr.Created).format("YYYYMMDD") ==
          moment(filterValue.Date).format("YYYYMMDD")
        );
      });
    }
    // else if()
    // console.log("dropValue", dropValue);
    // console.log("date", datas);
    // let data = datas.filter((value) => {
    //   console.log("select value", value.TagName, "dropValue", dropValue);
    //   if (!dropValue && !date) {
    //     return value;
    //   } else if (dropValue && !date) {
    //     return value.TagName === dropValue;
    //   } else if (!dropValue && date) {
    //     return moment(value.Created).format("YYYYMMDD") === date;
    //   } else {
    //     return (
    //       value.TagName === dropValue &&
    //       moment(value.Created).format("YYYYMMDD") === date
    //     );
    //   }
    // });

    // console.log("data", data);
    setMasternews([...localMaster]);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Label
          //   style={{ margin: 0, color: "#A98044" }}
          styles={{
            root: {
              padding: 0,
              color: "#A98044",
              fontWeight: 500,
              fontSize: "19px",
            },
          }}
        >
          Latest News
        </Label>
        {/* <Label
          //   style={{ margin: 0, color: "#A98044", textDecoration: "underline" }}
          styles={{
            root: {
              padding: 0,
              color: "#A98044",
              fontWeight: 500,
              fontSize: "15px",
              cursor: "pointer",
            },
          }}
        >
          View All
        </Label> */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Dropdown
            placeholder="Select an option"
            options={[
              { key: "All", text: "All" },
              { key: "Microsoft", text: "Microsoft" },
              { key: "Apple", text: "Apple" },
              { key: "Google", text: "Google" },
            ]}
            selectedKey={selectedValue.Name}
            onChange={(e, val: any) => {
              filterHandler("Name", val.key);
              // setSelectedSortingOption(val.key as string);
              // setSelectedValues({
              //   ...selectedValue,
              //   Dropvalues: val.key,
              // });
              // selectedValue.Dropvalues = val.key;
              // setSelectedValues({ ...selectedValue });
              // Filtervalues(
              //   masterData,
              //   val.key,
              //   moment(selectedValue.datevalue).format("YYYYMMDD")
              // );
            }}
            styles={dropdownStyles}
          />

          {/* datepicker */}

          <DatePicker
            // showWeekNumbers={true}
            // firstWeekOfYear={1}
            // showMonthPickerAsOverlay={true}
            styles={dropdownStyles}
            value={new Date(selectedValue.Date)}
            // formatDate={(date) => filterValue.listDate}
            onSelectDate={(e: any) => {
              filterHandler("Date", moment(e).format());
              // setSelectedValues({ ...selectedValue });
              // Filtervalues(
              //   masterData,
              //   selectedValue.Dropvalues,
              //   moment(e).format("YYYYMMDD")
              // );
              // getSensorFaliure(onedaydata);
            }}
            formatDate={(date) => moment(date).format("MM/DD/YYYY")}
          />
        </div>
      </div>
      {masternews.map((val) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "30px 0px",
            padding: "10px 0px",
            boxShadow: "0px 4px 6px -2px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ width: "10%" }}>
            <img
              src={val.imageUrl}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div style={{ width: "90%", padding: "0px 30px 0px 5px" }}>
            <div></div>
            <p style={{ margin: 0, marginBottom: "10px" }}>{val.Description}</p>
            <p style={{ color: "#089982", margin: 0, marginBottom: "10px" }}>
              <Icon
                iconName="TagUnknown12"
                styles={{
                  root: {
                    color: "#089982",
                    padding: 0,
                    margin: 0,
                    paddingRight: "6px",
                  },
                }}
              />
              {val.TagName}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "15px",
              }}
            >
              <p style={{ margin: 0, color: "#D72F54", fontSize: "15px" }}>
                {moment(val.Created).format("MMMM YYYY")}
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <img
                  src={`/_layouts/15/userphoto.aspx?size=S&accountname=${val.CreatedEmail}`}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                  }}
                />
                <p style={{ margin: 0 }}>{val.DisplayName}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default NewsviewComponent;
