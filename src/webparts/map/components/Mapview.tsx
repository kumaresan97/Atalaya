import * as React from "react";
import { useState, useEffect } from "react";
import SPServices from "../../../Global/SPServices";
import { Label, Spinner } from "@fluentui/react";
// import "../../../Global/Style.css";
import styles from "./Map.module.scss";
const Mapview = (props) => {
  const [mapview, setMapview] = useState([]);

  const iframeString = `
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31528.698635610894!2d77.29387874353851!3d8.964100521828483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0429c15ac547f7%3A0x9a707276cd8ae327!2sTenkasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1692876290911!5m2!1sen!2sin"
  
  style="width: 100%; height: 250px; border: 0;"></iframe>
`;
  const getData = () => {
    SPServices.SPReadItems({
      Listname: "Intranet Map",
      Topcount: 2,
    })
      .then((res) => {
        let mapData = [];
        res.forEach((val: any) => {
          mapData.push({
            Title: val.Title,
            Source: val.Source,
          });
        });
        setMapview([...mapData]);
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      // style={{ display: "flex", gap: "50px", width: "100%", height: "350px" }}
      className={styles.mapcontainer}
    >
      {mapview.length > 0 ? (
        mapview.map((val, i) => (
          <div
            // style={{
            //   width: "50%",
            //   // height: "300px",
            //   boxShadow:
            //     "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            // }}
            className={styles.mapbox}
          >
            {/* <iframe
              src={val.Source}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              // allowFullScreen
            ></iframe> */}
            <div
              className={styles.iframecontainer}
              // className="iframe_container"
              // style={{ width: "100%", height: "100%" }}
              dangerouslySetInnerHTML={{ __html: val.Source }}
            />
            <div
              // style={{
              //   padding: "10px 20px",
              //   background: "#ffffff",
              //   boxShadow:
              //     "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              //   fontSize: "17px",
              //   fontWeight: 400,
              // }}
              className={styles.iframtitle}
            >
              {val.Title}
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
            },
          }}
        >
          No Data found....
        </Label>
      )}

      {/* <div
        style={{
          width: "50%",
          height: "250px",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31528.698635610894!2d77.29387874353851!3d8.964100521828483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0429c15ac547f7%3A0x9a707276cd8ae327!2sTenkasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1692876290911!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div
          style={{
            padding: "10px 20px",
            background: "#ffffff",
            fontSize: "17px",
            fontWeight: 400,
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            // boxShadow: "0px 1px 2px 0px rgba(60, 64, 67, 0.15)",
          }}
        >
          300 cresent court suite 1810, Dellas,TX 75201
        </div>
      </div> */}
    </div>
  );
};
export default Mapview;
