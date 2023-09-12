import * as React from "react";
import { useEffect, useState } from "react";

import { Icon } from "@fluentui/react/lib/Icon";
import { sp } from "@pnp/sp/presets/all";
import * as moment from "moment";
import "./style.css";
import { Label, Spinner, SpinnerSize } from "@fluentui/react";
import styles from "./News.module.scss";
import { FontWeights } from "@fluentui/react";
import SPServices from "../../../Global/SPServices";
import { INews } from "../../../Global/AtalayaInterface";
const Tagicon = require("../../../Global/Images/TagIcon.png");

const NewsComponent = (props) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    // sp.web.lists
    //   .getByTitle("News")
    //   .items.select("*", "Author/Title", "Author/EMail")
    //   .expand("Author")
    //   .top(100)
    SPServices.SPReadItems({
      Listname: "Intranet Latest News",
      Select: "*, Author/Title,Author/EMail",
      Topcount: 4,
      Expand: "Author",
      Orderby: "ID",
      Orderbydecorasc: false,
    })

      .then((res: any) => {
        let arrDatas: INews[] = [];
        res.forEach((val) => {
          arrDatas.push({
            Id: val.Id,

            Description: val.Description,
            TagName: val.TagName,
            imageUrl: JSON.parse(val.Image).serverRelativeUrl,
            CreatedEmail: val.Author.EMail,
            DisplayName: val.Author.Title,
            Created: val.Created,
          });
        });
        console.log(res);
        console.log(arrDatas, "arr");

        // let filterbyDate = arrDatas.filter((val) => {
        //   return (
        //     moment(val.Created).format("YYYYMMDD") ==
        //     moment().format("YYYYMMDD")
        //   );
        //   console.log("Created Date:", val.Created);
        //   console.log(
        //     "Formatted Created Date:",
        //     moment(val.Created).format("YYYYMMDD")
        //   );
        //   console.log("Current Date:", moment().format("YYYYMMDD"));
        // });
        // console.log(filterbyDate, "filter");

        setNews([...arrDatas]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const NavigateSitePage = () => {
    const nextPageUrl = `${props.context.pageContext.web.absoluteUrl}/SitePages/News.aspx`;
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
          View all
        </Label>
      </div>
      {news.length > 0 ? (
        news.map((val) => (
          <div className={styles.newsSection}>
            <div className={styles.newsImage}>
              <img src={val.imageUrl} alt="" />
            </div>
            <div className={styles.newsContent}>
              <p
                style={{ margin: 0 }}
                className={styles.paratext}
                title={val.Description}
              >
                {val.Description}
              </p>
              <div className={styles.newsFooter}>
                {/* <p className={styles.newsTag}>
                   <Icon
                    iconName="TagUnknown12"
                    styles={{
                      root: {
                        paddingRight: "6px",
                        color: "#089982",
                        fontWeight: 500,
                      },
                    }}
                  /> 
                  <img src={`${Tagicon}`} />
                  {val.TagName}
                 </p>  */}
                <div className={styles.newsTag}>
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
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p style={{ margin: 0, color: "#D72F54", fontSize: "15px" }}>
                    {moment(val.Created).format("DD/MM/YYYY")}
                  </p>
                  <div className={styles.newsCreator}>
                    <img
                      src={`/_layouts/15/userphoto.aspx?size=S&accountname=${val.CreatedEmail}`}
                    />
                    <p style={{ margin: "0 0 0 3px" }}>{val.DisplayName}</p>
                  </div>
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
              marginTop: "30px",
            },
          }}
        >
          No News Found ...
        </Label>
      )}
    </div>
  );
};
export default NewsComponent;
