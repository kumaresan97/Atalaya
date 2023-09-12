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
import { Log } from "@microsoft/sp-core-library";
import { ICarosuel } from "../../../Global/AtalayaInterface";
import SPServices from "../../../Global/SPServices";
import styles from "./Carosuel.module.scss";
import { Label, Spinner, SpinnerSize } from "@fluentui/react";

const MainComponent = (props) => {
  const [datas, setDatas] = useState<ICarosuel[]>([]);
  const [loading, setLoading] = useState(false);

  const getDatas = () => {
    // sp.web.lists
    //   .getByTitle("Carousel")
    //   .items.get()
    //   .then((res) => {
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
        console.log(res);
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
      {/* <CCarousel
      // data-interval="500"
      controls={datas.length > 1}
      indicators={datas.length > 1}
    >
      {datas.length > 0 ? (
        datas.map((arr: any) => {
          return (
            <CCarouselItem>
              <CContainer>
                <div>
                  <div
                    // style={{
                    //   //   background: "#000",
                    //   position: "relative",
                    //   width: "100%",
                    //   height: "542px",
                    // }}
                    className={styles.container}
                  >
                    <div
                      onClick={() => {
                        arr.Url.trim() !== ""
                          ? window.open(arr.Url, "_blank")
                          : "";
                      }}
                      //   className="w-100"
                      // style={{
                      //   // objectFit: "cover",
                      //   width: "100%",
                      //   height: "100%",
                      //   // backgroundSize: "cover",
                      // }}
                      className={styles.innerdivimage}
                    >
                      <CImage
                        // className="w-100"
                        // style={{
                        //   objectFit: "cover",
                        //   width: "100%",
                        //   height: "100%",
                        //   backgroundSize: "cover",
                        // }}
                        className={styles.img}
                        src={arr.imageUrl ? arr.imageUrl : ""}
                        alt="slide 1"
                      />
                    </div>

                    <div
                      // style={{
                      //   position: "absolute",
                      //   bottom: "100px",
                      //   width: "80%",
                      //   padding: "20px 30px",
                      //   // border: "1px solid #fff",
                      //   marginLeft: "40px",
                      //   // WebkitBackdropFilter: "blur(10px)",
                      //   // backdropFilter: "blur(10px)",

                      //   // boxShadow: "0 0 5px 0",
                      //   backgroundColor: "#32323245",
                      //   backdropFilter: "blur(1px)",
                      //   boxShadow:
                      //     "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
                      //   borderRadius: "10px",
                      // }}
                      className={styles.titlediv}
                    >
                      <p
                        // style={{
                        //   color: "#ffffff",
                        //   fontSize: "17px",
                        //   fontWeight: "600",
                        //   marginBottom: "16px",
                        //   margin: 0,
                        // }}
                        className={styles.title}
                      >
                        {arr.Title}
                      </p>
                      <p
                        // style={{
                        //   margin: 0,
                        //   color: "#ffffff",
                        //   fontSize: "14px",
                        //   //   width: "70%",
                        // }}
                        className={styles.description}
                        title={arr.Description}
                      >
                        {arr.Description}
                      </p>
                    </div>
                  </div>
                </div>
              </CContainer>
            </CCarouselItem>
          );
        })
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
          No Images Found...
        </Label>
      )}
    </CCarousel> */}

      <CCarousel controls={datas.length > 1} indicators={datas.length > 1}>
        {datas.length > 0 ? (
          datas.map((arr: any) => (
            <CCarouselItem key={arr.id}>
              <CContainer>
                <div
                  // className={`${styles.container} ${
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
                  <div className={styles.titlediv}>
                    <p className={styles.title}>{arr.Title}</p>
                    <p className={styles.description} title={arr.Description}>
                      {arr.Description}
                    </p>
                  </div>
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
