import * as React from "react";
import { useEffect, useState } from "react";

import { Icon } from "@fluentui/react/lib/Icon";
import { sp } from "@pnp/sp/presets/all";
import * as moment from "moment";
import "./style.css";
import { Label } from "office-ui-fabric-react";
import { FontWeights } from "@fluentui/react";

const NewsComponent = (props) => {
  const [news, setNews] = useState([]);

  const getData = () => {
    sp.web.lists
      .getByTitle("News")
      .items.select("*", "Author/Title", "Author/EMail")
      .expand("Author")
      .top(4)

      .get()
      .then((res) => {
        let arrDatas = [];
        res.forEach((val) => {
          arrDatas.push({
            Id: val.Id,

            Description: val.Description,
            imageUrl: val.Image,
            CreatedEmail: val.Author.EMail,
            DisplayName: val.Author.Title,
            Created: moment(val.Created).format("MMMM YYYY"),
          });
        });
        console.log(res);
        console.log(arrDatas, "arr");
        setNews([...arrDatas]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const NavigateSitePage = () => {
    const nextPageUrl =
      "https://chandrudemo.sharepoint.com/sites/Atalya/SitePages/News.aspx";
    window.open(nextPageUrl, "_blank");
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
          //  style={{ margin: 0, color: "#A98044" }}
          styles={{
            root: {
              padding: 0,
              color: "#A98044",
              fontSize: "19px",
              FontWeights: 500,
            },
          }}
        >
          Latest News
        </Label>
        <Label
          // style={{ margin: 0, color: "#A98044", }}
          styles={{
            root: {
              color: "#A98044",
              padding: 0,
              cursor: "pointer",
              transition: "color 0.3s ease",
              borderBottom: "1px solid #A98044",
            },
          }}
          onClick={() => NavigateSitePage()}
        >
          View All
        </Label>
      </div>
      {news.map((val) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "30px 0px",
            padding: "10px 0px",
            boxShadow: "0px 4px 6px -2px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ width: "20%" }}>
            <img
              src={val.imageUrl}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div style={{ width: "80%" }}>
            <p style={{ margin: 0 }}>{val.Description}</p>
            <h5 style={{ color: "#089982", margin: "20px 0px 20px 0px" }}>
              <Icon
                iconName="TagUnknown12"
                styles={{
                  root: {
                    paddingRight: "10px",
                    color: "#089982",
                  },
                }}
              />
              Microsoft
            </h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0, color: "#D72F54", fontSize: "15px" }}>
                {val.Created}
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
export default NewsComponent;
