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

const MainComponent = (props) => {
  const [datas, setDatas] = useState<ICarosuel[]>([]);

  const getDatas = () => {
    // sp.web.lists
    //   .getByTitle("Carousel")
    //   .items.get()
    //   .then((res) => {
    SPServices.SPReadItems({
      Listname: "Carousel",
    })
      .then((res) => {
        let arrDatas: ICarosuel[] = [];
        let slider = [];
        res.forEach((val: any) => {
          arrDatas.push({
            Title: val.Title,
            Description: val.Description,
            Url: val.Url.Url,
            imageUrl: JSON.parse(val.Image).serverRelativeUrl,
          });
        });

        setDatas([...arrDatas]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div>
      <CCarousel controls indicators data-interval="500">
        {datas.map((arr: any) => {
          return (
            <CCarouselItem>
              <CContainer>
                <div>
                  <div
                    style={{
                      //   background: "#000",
                      position: "relative",
                      width: "100%",
                      height: "350px",
                    }}
                  >
                    <div
                      onClick={() => {
                        arr.Url.trim() !== ""
                          ? window.open(arr.Url, "_blank")
                          : "";
                      }}
                      //   className="w-100"
                      style={{
                        // objectFit: "cover",
                        width: "100%",
                        height: "100%",
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
                        src={arr.imageUrl ? arr.imageUrl : ""}
                        alt="slide 1"
                      />
                    </div>

                    {/* <div
                      style={{
                        position: "absolute",
                        bottom: "100px",
                        width: "80%",
                        padding: "20px 30px",
                        // border: "1px solid #fff",
                        marginLeft: "40px",
                        // WebkitBackdropFilter: "blur(10px)",
                        // backdropFilter: "blur(10px)",

                        // boxShadow: "0 0 5px 0",
                        backgroundColor: "#32323245",
                        backdropFilter: "blur(1px)",
                        boxShadow:
                          "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
                        borderRadius: "10px",
                      }}
                    >
                      <h3
                        style={{
                          color: "#ffffff",
                          fontSize: "17px",
                          fontWeight: "600",
                          marginBottom: "16px",
                        }}
                      >
                        {arr.Title}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          color: "#ffffff",
                          fontSize: "14px",
                          //   width: "70%",
                        }}
                      >
                        {arr.Description}
                      </p>
                    </div> */}
                  </div>
                </div>
              </CContainer>
            </CCarouselItem>
          );
        })}
      </CCarousel>
    </div>
  );
};
export default MainComponent;
