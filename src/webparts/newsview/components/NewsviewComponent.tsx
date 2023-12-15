import * as React from "react";
import { useEffect, useState } from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { sp } from "@pnp/sp/presets/all";
import * as moment from "moment";
import { INews } from "../../../Global/AtalayaInterface";
import SPServices from "../../../Global/SPServices";
import { Config } from "../../../Global/Config";
import "../../news/components/style.css";
import styles from "../components/Newsview.module.scss";
import {
  DatePicker,
  Dropdown,
  Label,
  LabelBase,
  Spinner,
  TooltipHost,
} from "@fluentui/react";
import { Placeholder } from "@pnp/spfx-controls-react";

let masterData = [];

interface IFilterKeys {
  Date: string;
  Name: string;
}

let FilterKeys: IFilterKeys = {
  // Date: moment().format(),
  Date: null,
  Name: "All",
};

const Tagicon = require("../../../Global/Images/TagIcon.png");

const NewsviewComponent = (props) => {
  const [masternews, setMasternews] = useState([]);
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);
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
      Select: "*,Author/Title, Author/EMail, AttachmentFiles",
      Topcount: 5000,
      Expand: "Author, AttachmentFiles",
      Orderby: "ID",
      Orderbydecorasc: false,
    })
      .then(async (res: any) => {
        let arrDatas: INews[] = [];

        await res.forEach(async (val: any) => {
          let arrGetAttach = [];
          await val.AttachmentFiles.forEach(async (val: any) => {
            arrGetAttach.push({
              fileName: val.FileName,
              content: null,
              isNew: false,
              isDelete: false,
              serverRelativeUrl: val.ServerRelativeUrl,
            });
          });

          await arrDatas.push({
            Id: val.Id,
            Description: val?.Description,
            TagName: val?.TagName,
            Url: val?.Url,
            CreatedEmail: val.Author.EMail,
            DisplayName: val.Author.Title,
            Created: val.Created,
            Attach: arrGetAttach,
          });
        });

        // console.log(res);
        // masterData = arrDatas;
        // let filterbyDate = arrDatas.filter(
        //   (val) =>
        //     moment(val.Created).format("YYYYMMDD") ==
        //     moment().format("YYYYMMDD")
        // );

        await setMasternews([...arrDatas]);
        await setNews([...arrDatas]);
        await setLoading(false);
        // Filtervalues(arrDatas, null, selectedValue.datevalue);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <div style={{ padding: 20 }}>
      <div
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "space-between",
        // }}
        className={styles.nwviewcontainer}
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
          View all
        </Label> */}
        <div
          // style={{ display: "flex", gap: "20px", alignItems: "center" }}
          className={styles.nvdatewrapper}
        >
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
              setLoading(true);
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
            value={selectedValue.Date ? new Date(selectedValue.Date) : null}
            // formatDate={(date) => filterValue.listDate}
            onSelectDate={(e: any) => {
              setLoading(true);
              filterHandler("Date", moment(e).format());
              // setSelectedValues({ ...selectedValue });
              // Filtervalues(
              //   masterData,
              //   selectedValue.Dropvalues,
              //   moment(e).format("YYYYMMDD")
              // );
              // getSensorFaliure(onedaydata);
            }}
            placeholder="Select date"
            formatDate={(date) => moment(date).format("MM/DD/YYYY")}
          />
        </div>
      </div>
      {masternews.length > 0 ? (
        masternews.map((val) => (
          // <div
          //   style={{
          //     display: "flex",
          //     gap: "10px",
          //     margin: "30px 0px",
          //     padding: "10px 0px",
          //     boxShadow: "0px 4px 6px -2px rgba(0, 0, 0, 0.2)",
          //   }}
          // >
          //   <div style={{ width: "10%" }}>
          //     <img
          //       src={val.imageUrl}
          //       alt=""
          //       style={{ width: "100%", height: "100%" }}
          //     />
          //   </div>
          //   <div style={{ width: "90%", padding: "0px 30px 0px 5px" }}>
          //     <div></div>
          //     <p className={styles.newswrapper}>{val.Description}</p>
          //     <p style={{ color: "#089982", margin: 0, marginBottom: "10px" }}>
          //       <Icon
          //         iconName="TagUnknown12"
          //         styles={{
          //           root: {
          //             color: "#089982",
          //             padding: 0,
          //             margin: 0,
          //             paddingRight: "6px",
          //           },
          //         }}
          //       />
          //       {val.TagName}
          //     </p>
          //     <div
          //       style={{
          //         display: "flex",
          //         justifyContent: "space-between",
          //         alignItems: "center",
          //         paddingTop: "15px",
          //       }}
          //     >
          //       <p style={{ margin: 0, color: "#D72F54", fontSize: "15px" }}>
          //         {moment(val.Created).format("DD/MM/YYYY")}
          //       </p>
          //       <div style={{ display: "flex", gap: "10px" }}>
          //         <img
          //           src={`/_layouts/15/userphoto.aspx?size=S&accountname=${val.CreatedEmail}`}
          //           style={{
          //             width: "20px",
          //             height: "20px",
          //             borderRadius: "50%",
          //           }}
          //         />
          //         <p style={{ margin: 0 }}>{val.DisplayName}</p>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <div
            className={styles.newsSection}
            onClick={() => {
              val.Url ? window.open(val.Url, "_blank") : "";
            }}
          >
            <div className={styles.newsImage}>
              <img
                src={val.Attach.length ? val.Attach[0].serverRelativeUrl : ""}
                alt=""
              />
            </div>
            <div className={styles.newsContent}>
              <TooltipHost content={val.Description}>
                <p style={{ margin: 0 }} className={styles.paratext}>
                  {val.Description}
                </p>
              </TooltipHost>

              <div className={styles.newsFooter}>
                <p className={styles.newsTag}>
                  {/* <Icon
                    iconName="TagUnknown12"
                    styles={{
                      root: {
                        paddingRight: "6px",
                        color: "#089982",
                        fontWeight: 500,
                      },
                    }}
                  /> */}
                  <img src={`${Tagicon}`} />
                  <p> {val.TagName}</p>
                </p>
                <div
                  // style={{
                  //   display: "flex",
                  //   justifyContent: "space-between",
                  //   alignItems: "center",
                  // }}
                  className={styles.footwrapper}
                >
                  <p
                    className={styles.paraDate}
                    // style={{ margin: 0, color: "#D72F54", fontSize: "15px" }}
                  >
                    {moment(val.Created).format("MM/DD/YYYY")}
                  </p>
                  {/* hide create by */}
                  {/* <div className={styles.newsCreator}>
                    <img
                      src={`/_layouts/15/userphoto.aspx?size=S&accountname=${val.CreatedEmail}`}
                    />
                    <p
                    // style={{ margin: "0 0 0 3px" }}
                    >
                      {val.DisplayName}
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        ))
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
            },
          }}
        >
          No News Found...
        </Label>
      )}
    </div>
  );
};
export default NewsviewComponent;
