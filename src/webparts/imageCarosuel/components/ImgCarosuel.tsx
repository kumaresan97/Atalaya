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
const Imgcarosuel = (props) => {
  const [datas, setDatas] = useState<IImgcarosuel[]>([]);

  const getDatas = () => {
    // sp.web.lists
    //   .getByTitle("ImageCarosuel")
    //   .items.get()
    SPServices.SPReadItems({
      Listname: "ImageCarosuel",
    })
      .then((res) => {
        let arrDatas: IImgcarosuel[] = [];
        res.forEach((val: any) => {
          arrDatas.push({
            Title: val.Title,
            ImageUrl: val.ImageUrl,
          });
        });
        const chunkedDatas = [];
        for (let i = 0; i < arrDatas.length; i += 4) {
          chunkedDatas.push(arrDatas.slice(i, i + 4));
        }
        console.log(arrDatas, "arr");
        console.log(chunkedDatas, "chunk");
        // console.log(res);
        // console.log(arrDatas, "arr");
        setDatas([...chunkedDatas]);
        console.log(datas, "datas");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(datas);

  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div>
      {/* <CCarousel controls indicators data-interval="500">
        {datas.map((arr) => {
          return (
            <CCarouselItem>
              <CContainer>
                <div>
                  <div
                    style={{
                      background: "#000",
                      position: "relative",
                      width: "100%",
                      height: "350px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      //   onClick={() => {
                      //     arr.Url.trim() !== ""
                      //       ? window.open(arr.Url, "_blank")
                      //       : "";
                      //   }}
                      //   className="w-100"
                      style={{
                        // objectFit: "cover",
                        width: "25%",
                        // height: "100%",
                        // backgroundSize: "cover",
                      }}
                    >
                      <CImage
                        // className="w-100"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          backgroundSize: "cover",
                        }}
                        src={arr.ImageUrl ? arr.ImageUrl : ""}
                        alt="slide 1"
                      />
                      <h4>{arr.Title}</h4>
                    </div>
                  </div>
                </div>
              </CContainer>
            </CCarouselItem>
          );
        })}
      </CCarousel> */}

      <CCarousel controls indicators data-interval="500">
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
                  <div
                    key={i}
                    // className="carousel-item"
                    style={{
                      width: "25%",
                      padding: "10px",
                    }}
                  >
                    <div
                      //   className="image-container"
                      style={{
                        background: "#000",
                        width: "100%",
                        height: "90%",
                      }}
                    >
                      <CImage
                        src={data.ImageUrl}
                        // alt={data.Title}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "15px",
                          fontWeight: "bold",
                          padding: "10px 5px",
                          background: "red",
                          margin: 0,
                        }}
                      >
                        {data.Title}
                      </p>
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
