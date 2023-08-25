import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp/presets/all";
import { Label } from "@fluentui/react";
import "./style.css";
import { IAnnouncementViews } from "../../../Global/AtalayaInterface";
import SPServices from "../../../Global/SPServices";
import { Config } from "../../../Global/Config";

const AnnounceMents = (props) => {
  const [data, setData] = useState<IAnnouncementViews[]>([]);

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
    //   .top(6)
    //   .get()
    SPServices.SPReadItems({
      Listname: Config.ListNames.Announcement,
      Select: "*,UserName/Id,UserName/Title,UserName/EMail,UserName/JobTitle",
      Topcount: 6,
      Expand: "UserName",
    })
      .then((res) => {
        let arrDatas: IAnnouncementViews[] = [];
        res.forEach((val: any) => {
          arrDatas.push({
            EMail: val.UserName.EMail,
            JobTitle: val.UserName.JobTitle,
            Title: val.UserName.Title,
            // Position: val.Position,
            // imageUrl: val.ImageUrl,
          });
        });
        console.log(res);
        console.log(arrDatas, "arr");
        setData([...arrDatas]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const NavigateSitePage = () => {
    const nextPageUrl =
      "https://chandrudemo.sharepoint.com/sites/Atalya/SitePages/Announcement.aspx";
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
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0px 0px 20px 0px",
          padding: "0px 12px",
        }}
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
          Announcements
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
          More
        </Label>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {data.map((val) => (
          <div
            style={{
              width: "33.33%",
              padding: "10px",
            }}
          >
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                // padding: "10px",
                minHeight: "150px",
              }}
            >
              <div style={{ width: "50px", height: "50px" }}>
                <img
                  src={`/_layouts/15/userphoto.aspx?size=S&username=${val.EMail}`}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  marginTop: "6px",
                  fontWeight: 500,
                }}
              >
                {val.Title}
              </p>
              <p style={{ color: "#A98044", margin: 0 }}>{val.JobTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AnnounceMents;
