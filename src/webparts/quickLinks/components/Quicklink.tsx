import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp/presets/all";
import styles from "./QuickLinks.module.scss";
import "./style.css";
import { IQuickLink } from "../../../Global/AtalayaInterface";
import SPServices from "../../../Global/SPServices";
import { Label } from "@fluentui/react";
import { TooltipHost } from "office-ui-fabric-react";

const Quicklink = (props) => {
  const [datas, setDatas] = useState<IQuickLink[]>([]);

  const getData = () => {
    SPServices.SPReadItems({
      Listname: "Intranet Quicklinks",
      Topcount: 12,
      Select: "*, AttachmentFiles",
      Expand: "AttachmentFiles",
    })
      .then(async (res: any) => {
        let arrDatas: IQuickLink[] = [];
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
            Title: val.Title ? val.Title : "",
            Id: val.Id,
            Url: val.Url ? val.Url : "",
            // imageUrl: JSON.parse(val.Image).serverRelativeUrl,
            Attach: arrGetAttach,
          });
        });

        await setDatas([...arrDatas]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openEmailClient = (val) => {
    const emailAddress = val;
    const subject = "Subject goes here";
    const body = "Email body goes here";

    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      // style={{
      //   width: "100%",
      //   margin: "auto",
      //   boxSizing: "border-box",
      // }}
      className={styles.container}
    >
      <div className={styles.maindiv}>
        {datas.length > 0 ? (
          datas.map((val: any) => (
            <div
              className={styles.box}
              key={val.Id}
              onClick={() => {
                val.Url.trim() !== "" ? window.open(val.Url, "_blank") : "";
              }}
            >
              <div className={styles.boximgdiv}>
                <img
                  src={val.Attach.length ? val.Attach[0].serverRelativeUrl : ""}
                  alt="img"
                  className={styles.img}
                />
              </div>

              <TooltipHost content={val.Title}>
                <div className={styles.Imgtitile}>{val.Title}</div>
              </TooltipHost>
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
