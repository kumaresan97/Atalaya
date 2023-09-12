import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp/presets/all";
import styles from "./QuickLinks.module.scss";
import "./style.css";
import { IQuickLink } from "../../../Global/AtalayaInterface";
import SPServices from "../../../Global/SPServices";
import { Label } from "@fluentui/react";

const Quicklink = (props) => {
  const [datas, setDatas] = useState<IQuickLink[]>([]);

  const getData = () => {
    // sp.web.lists
    //   .getByTitle("QuickLinks")
    //   .items.get()
    SPServices.SPReadItems({
      Listname: "Intranet Quicklinks",
      Topcount: 8,
    })
      .then((res) => {
        let arrDatas: IQuickLink[] = [];
        res.forEach((val: any) => {
          arrDatas.push({
            Title: val.Title ? val.Title : "",
            Id: val.Id,

            Url: val.Url ? val.Url : "",
            imageUrl: JSON.parse(val.Image).serverRelativeUrl,
          });
        });
        console.log(res);
        console.log(arrDatas, "arr");
        setDatas([...arrDatas]);
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
      style={{
        width: "100%",
        margin: "auto",
        boxSizing: "border-box",
      }}
    >
      <div
        // style={{
        //   display: "flex",
        //   flexWrap: "wrap",
        //   width: "100%",
        //   gap: "10px",
        // }}
        className={styles.maindiv}
      >
        {datas.length > 0 ? (
          datas.map((val: any) => (
            <div
              className={styles.box}
              key={val.Id}
              onClick={() => {
                val.Url.trim() !== "" ? window.open(val.Url, "_blank") : "";
              }}
            >
              <div
                // style={{ width: "50px", height: "50px" }}
                className={styles.boximgdiv}
              >
                <img
                  src={val.imageUrl}
                  alt="img"
                  // style={{ width: "100", height: "100%" }}
                  className={styles.img}
                />
              </div>

              <div
                // style={{
                //   textAlign: "center",
                //   fontSize: 14,
                //   fontWeight: 500,
                //   marginTop: 16,
                // }}
                className={styles.Imgtitile}
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
                marginTop: "30px",
              },
            }}
          >
            No Data Found...
          </Label>
        )}
      </div>
    </div>
  );
};
export default Quicklink;
