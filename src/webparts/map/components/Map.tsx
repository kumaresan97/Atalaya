import * as React from "react";
import styles from "./Map.module.scss";
import { IMapProps } from "./IMapProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class Map extends React.Component<IMapProps, {}> {
  public render(): React.ReactElement<IMapProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return (
      <div
        style={{ display: "flex", gap: "50px", height: "300px", width: "100%" }}
      >
        <div
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
          ></iframe>

          <div
            style={{
              padding: "10px 20px",
              background: "#ffffff",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              fontSize: "17px",
              fontWeight: 400,
            }}
          >
            300 cresent court suite 1810, Dellas,TX 75201
          </div>
        </div>
        <div
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
        </div>
      </div>
    );
  }
}
