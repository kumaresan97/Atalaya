import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp/presets/all";
import { Label, SearchBox } from "@fluentui/react";
import "../../announceMents/components/style.css";
import SPServices from "../../../Global/SPServices";
import { IAnnouncementViews } from "../../../Global/AtalayaInterface";
import { Config } from "../../../Global/Config";
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
          padding: "0px 24px",
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
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {masterData.map((val) => (
          <div
            style={{
              width: "16.666%",
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
export default Announcementviews;
