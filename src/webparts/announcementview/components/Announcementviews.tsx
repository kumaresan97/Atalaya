import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp/presets/all";
import { Label, SearchBox, TooltipHost } from "@fluentui/react";
import "../../announceMents/components/style.css";
import SPServices from "../../../Global/SPServices";
import { IAnnouncementViews } from "../../../Global/AtalayaInterface";
import { Config } from "../../../Global/Config";
import styles from "../components/Announcementview.module.scss";
const Announcementviews = (props) => {
  const [masterData, setMasterData] = useState<IAnnouncementViews[]>([]);
  const [data, setData] = useState<IAnnouncementViews[]>([]);
  const searchstyle = {
    root: {
      width: 300,
    },
  };

  const getDatas = () => {
    // sp.web.lists
    //   .getByTitle("AnnounceMents")
    //   .items.get()
    // sp.web.lists
    //   .getByTitle("Announcements")
    //   .items.select(
    //     "UserName/Id,UserName/Title,UserName/EMail,UserName/JobTitle"
    //   )
    //   .expand("UserName")
    //   .get()
    SPServices.SPReadItems({
      Listname: Config.ListNames.Announcement,
      Select: "*,UserName/Id,UserName/Title,UserName/EMail,UserName/JobTitle",
      Topcount: 5000,
      Expand: "UserName",
      Orderby: "ID",
      Orderbydecorasc: false,
    })
      .then((res) => {
        let arrDatas: IAnnouncementViews[] = [];
        res.forEach((val: any) => {
          arrDatas.push({
            EMail: val.UserName?.EMail,
            JobTitle: val.UserName?.JobTitle,
            Title: val.UserName?.Title,
            // Position: val.Position,
            // imageUrl: val.ImageUrl,
            ID: val.ID ? val.ID : null,
          });
        });

        setMasterData([...arrDatas]);
        setData([...arrDatas]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (val) => {
    const filteredResults = data.filter((item) =>
      item.Title.toLowerCase().includes(val.toLowerCase())
    );
    setMasterData([...filteredResults]);
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div
      // style={{
      //   background: "#ffffff",
      //   padding: "10px",
      // }}
      className={styles.avcontainer}
    >
      <div
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   alignItems: "center",
        //   margin: "0px 0px 20px 0px",
        //   padding: "0px 24px",
        // }}
        className={styles.avHeader}
      >
        <Label
          styles={{
            root: {
              color: " #A98044",
              fontSize: "22px",
              fontWeight: "500",
              padding: 0,
            },
          }}
        >
          New Hires{" "}
        </Label>
        {/* <Label
          styles={{
            root: {
              color: " #A98044",
              padding: 0,
              borderBottom: "1px solid #A98044",
            },
          }}
          onClick={() => NavigateSitePage()}
        >
          More
        </Label> */}
        <SearchBox
          placeholder="Search for Title"
          styles={searchstyle}
          onChange={(_, newValue) => {
            handleSearch(newValue);
            //   setSearchValue(newValue);
          }}
          // onSearch={(val) => {}}
        />
      </div>

      <div
        // style={{
        //   display: "flex",
        //   width: "100%",
        //   flexWrap: "wrap",
        // }}
        className={styles.avboxContainer}
      >
        {masterData.length > 0 ? (
          masterData.map((val) => (
            <div
              // style={{
              //   width: "16.666%",
              //   padding: "10px",
              // }}
              className={styles.avboxwrapper}
            >
              <div
                // style={{
                //   boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                //   width: "100%",
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   flexDirection: "column",
                //   // padding: "10px",
                //   minHeight: "150px",
                // }}
                className={styles.avboxContent}
              >
                <div
                  // style={{ width: "50px", height: "50px" }}
                  className={styles.imgwrapper}
                >
                  <img
                    src={`/_layouts/15/userphoto.aspx?size=S&username=${val.EMail}`}
                    alt=""
                    // style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <p
                  // style={{
                  //   margin: 0,
                  //   fontSize: "16px",
                  //   marginTop: "6px",
                  //   fontWeight: 500,
                  //   textAlign: "center",
                  // }}
                  className={styles.title}
                >
                  {val.Title}
                </p>
                <TooltipHost content={val.JobTitle}>
                  <p
                    // style={{ color: "#A98044", margin: 0, textAlign: "center" }}
                    className={styles.jobtitle}
                  >
                    {val.JobTitle}
                  </p>
                </TooltipHost>
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
                marginTop: "30px",
                width: "100%",
              },
            }}
          >
            No Data Found...
          </Label>
        )}
      </div>
    </div>
  );
};
export default Announcementviews;
