import * as React from "react";
import { useState, useEffect } from "react";
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
import { IImgcarosuel } from "../../../Global/AtalayaInterface";
import SPServices from "../../../Global/SPServices";
import styles from "./ImageCarosuel.module.scss";
import { TooltipHost } from "@fluentui/react";

const Imgcarosuel = (props) => {
  const [datas, setDatas] = useState<IImgcarosuel[]>([]);

  const getDatas = () => {
    SPServices.SPReadItems({
      Listname: "Intranet 4 image carousel",
      Select: "*, AttachmentFiles",
      Expand: "AttachmentFiles",
    })
      .then(async (res: any) => {
        let arrDatas: IImgcarosuel[] = [];
        const chunkedDatas = [];

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
            Title: val.Title,
            // ImageUrl: JSON.parse(val.Image).serverRelativeUrl,
            Url: val.Links ? val.Links : "",
            Attach: arrGetAttach,
          });
        });

        for (let i = 0; i < arrDatas.length; i += 4) {
          chunkedDatas.push(arrDatas.slice(i, i + 4));

          if (arrDatas.length <= i + 4) {
            setDatas([...chunkedDatas]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleItemClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div className="imgCarosuel">
      <CCarousel controls={datas.length > 1} indicators={datas.length > 1}>
        {datas.length > 0 &&
          datas.map((chunk: any, index) => (
            <CCarouselItem key={index}>
              <CContainer
                // className="carousel-row"
                style={{
                  display: "flex",
                  //   justifyContent: "space-between",
                  height: "350px",
                  width: "100%",
                }}
              >
                {chunk.map((data, i) => (
                  <div className={styles.caroContainer} key={i}>
                    <div
                      className={styles.caroContainerSection}
                      onClick={() => handleItemClick(data.Url)}
                    >
                      <CImage
                        src={
                          data.Attach.length
                            ? data.Attach[0].serverRelativeUrl
                            : ""
                        }
                        // alt={data.Title}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <TooltipHost content={data.Title}>
                        <p className={styles.caroContainerTitle}>
                          {data.Title}
                        </p>
                      </TooltipHost>
                    </div>
                  </div>
                ))}
              </CContainer>
            </CCarouselItem>
          ))}
      </CCarousel>
    </div>
  );
};
export default Imgcarosuel;
