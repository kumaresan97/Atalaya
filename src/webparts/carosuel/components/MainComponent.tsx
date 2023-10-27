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
    SPServices.SPReadItems({
      Listname: "Intranet Carousel at the top",
    })
      .then((res) => {
        let arrDatas: ICarosuel[] = [];
        let slider = [];
        res.forEach((val: any) => {
          arrDatas.push({
            Title: val.Title ? val.Title : "",
            Description: val.Description ? val.Description : "",
            Url: val.Url ? val.Url : "",
            imageUrl: JSON.parse(val.Image).serverRelativeUrl,
            Active: val.Active,
          });
        });
        const ActiveData: ICarosuel[] = arrDatas.filter(
          (item) => item.Active == true
        );

        setDatas([...ActiveData]);
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
                      src={arr.imageUrl ? arr.imageUrl : ""}
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
