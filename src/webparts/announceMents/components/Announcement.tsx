import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp/presets/all";
import { Label, TooltipHost } from "@fluentui/react";
import styles from "./AnnounceMents.module.scss";
import "./style.css";
import { IAnnouncementViews } from "../../../Global/AtalayaInterface";
import SPServices from "../../../Global/SPServices";
import { Config } from "../../../Global/Config";
const AnnounceMents = (props) => {
  const [data, setData] = useState<IAnnouncementViews[]>([]);

  const getDatas = () => {
    SPServices.SPReadItems({
      Listname: Config.ListNames.Announcement,
      Select: "*,UserName/Id,UserName/Title,UserName/EMail,UserName/JobTitle",
      Topcount: 6,
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
            ID: val.ID,
            // Position: val.Position,
            // imageUrl: val.ImageUrl,
          });
        });

        setData([...arrDatas]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const NavigateSitePage = () => {
    const nextPageUrl = `${props.context.pageContext.web.absoluteUrl}/SitePages/Announcement.aspx`;
    window.open(nextPageUrl, "_blank");
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "10px",
      }}
      className={styles.AnnounceContainer}
    >
      <div
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   alignItems: "center",
        //   margin: "0px 0px 20px 0px",
        //   padding: "0px 12px",
        // }}
        className={styles.titlecontainer}
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
          New Hires
        </Label>
        <Label
          styles={{
            root: {
              // color: " #A98044",
              // padding: 0,
              // // borderBottom: "1px solid #A98044",
              // textDecoration: "none",
              // cursor: "pointer",
              // transition: "color 0.3s ease, textDecoration 0.3s ease",
              color: "#A98044",
              padding: 0,
              cursor: "pointer",
              transition: "color 0.3s ease",
              borderBottom: "1px solid #A98044",
            },
          }}
          onClick={() => NavigateSitePage()}
        >
          View all
        </Label>
      </div>

      <div
        // style={{
        //   display: "flex",
        //   width: "100%",
        //   flexWrap: "wrap",
        // }}
        className={styles.boxcontainer}
      >
        {data.length > 0 ? (
          data.map((val) => (
            <div
              // style={{
              //   width: "33.33%",
              //   padding: "10px",
              // }}
              className={styles.boxdiv}
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
                className={styles.innerbox}
              >
                <div
                  // style={{ width: "50px", height: "50px" }}
                  className={styles.imgWraper}
                >
                  <img
                    width="100%"
                    height="100%"
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
                  className={styles.titleWraper}
                >
                  {val.Title ? val.Title : ""}
                </p>
                <TooltipHost content={val.JobTitle}>
                  {val.Title !== "" ? (
                    <p
                      className={styles.jobTitle}
                      // style={{ color: "#A98044", margin: 0, textAlign: "center" }}
                    >
                      {val.JobTitle ? val.JobTitle : ""}
                    </p>
                  ) : (
                    <div></div>
                  )}
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
export default AnnounceMents;
