import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp/presets/all";
import {
  // Carousel,
  CCarousel,
  CCarouselItem,
  CImage,
  CContainer,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { ICarosuel } from "../../../Global/AtalayaInterface";
import SPServices from "../../../Global/SPServices";
import styles from "./Carosuel.module.scss";
import { Label, Spinner, SpinnerSize, TooltipHost } from "@fluentui/react";

const MainComponent = (props) => {
  const [datas, setDatas] = useState<ICarosuel[]>([]);

  const getDatas = () => {
    // let siteName = props.context.pageContext.web.title;
    // let listID =
    //   siteName.toLowerCase() == "watchtower"
    //     ? "b4dddb42-af84-42cb-8d7e-c10121d3a894"
    //     : "4528f3e3-62ea-43e6-92ce-afd8aa2aec97";

    SPServices.SPReadItems({
      Listname: "Intranet Carousel at the top",
      Select: "*, AttachmentFiles",
      Expand: "AttachmentFiles",
    })
      .then(async (res: any) => {
        let arrDatas: ICarosuel[] = [];
        let slider = [];

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
            ID: val.ID,
            Title: val.Title ? val.Title : "",
            Description: val.Description ? val.Description : "",
            Url: val.Url ? val.Url : "",
            // imageUrl: JSON.parse(val.Image).serverRelativeUrl,
            // imageUrl: `/sites/${siteName}/SiteAssets/Lists/${listID}/${
            //   JSON.parse(val.Image).fileName
            // }`,
            Sequence: val.Sequence ? val.Sequence : null,
            Active: val.Active,
            Attach: arrGetAttach,
          });
        });

        await arrDatas.sort((a, b) => {
          const sequenceComparison = a.Sequence - b.Sequence;

          if (sequenceComparison === 0) {
            return a.ID - b.ID;
          }

          return sequenceComparison;
        });

        const ActiveData: ICarosuel[] = arrDatas.filter(
          (item) => item.Active == true
        );

        await setDatas([...ActiveData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div className="headcarosuel">
      <CCarousel
        controls={datas.length > 1}
        // wrap={false}
        indicators={datas.length > 1}
        // interval={datas.length >= 1 ? 100 : 200000000}
        interval={datas.length >= 1 ? 3000 : 8.64e7}

        // interval={datas.length <= 1 ? 8.64e7 : 3000}
      >
        {datas.length > 0 ? (
          datas.map((arr: any) => (
            <CCarouselItem key={arr.id}>
              <CContainer>
                <div
                  // classNameNameName={`${styles.container} ${
                  //   datas.length === 1 ? styles.centeredImage : ""
                  // }`}
                  className={styles.container}
                  style={
                    datas.length === 1
                      ? {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }
                      : null
                  }
                  onClick={() => {
                    arr.Url.trim() !== "" ? window.open(arr.Url, "_blank") : "";
                  }}
                >
                  <div className={styles.innerdivimage}>
                    <CImage
                      className={styles.img}
                      src={
                        arr.Attach.length ? arr.Attach[0].serverRelativeUrl : ""
                      }
                      alt="slide 1"
                    />
                  </div>

                  {arr.Title || arr.Description ? (
                    <div className={styles.titlediv}>
                      <p className={styles.title}>{arr.Title}</p>
                      <TooltipHost content={arr.Description}>
                        <p className={styles.description}>{arr.Description}</p>
                      </TooltipHost>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </CContainer>
            </CCarouselItem>
          ))
        ) : (
          <div>
            {" "}
            <Label>No Data Found...</Label>
          </div>
        )}
      </CCarousel>
    </div>
  );
};
export default MainComponent;
