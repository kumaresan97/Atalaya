import * as React from "react";
import "./style.css";
// import "../../quickLinks/components/style.css";
const FooterComponent = () => {
  return (
    <div
      style={{
        backgroundColor: "#A98044",
        padding: "20px",
        color: "#FFFFFF",
        // height: "180px",
        width: "100%",
      }}
    >
      <div
        style={{ textAlign: "center", padding: "10px", margin: "20px 100px" }}
        className="footer_wrap"
      >
        <p style={{ fontSize: "1.125rem", margin: 0, fontWeight: "400" }}>
          Copyright © 2023. Atalaya Capital Management LP. All Rights Reserved.{" "}
          <a href="#" style={{ color: "#FFFFFF" }}>
            Privacy Policy.
          </a>{" "}
          <a href="#" style={{ color: "#FFFFFF" }}>
            CA Privacy Policy
          </a>
        </p>

        <p
          style={{
            fontSize: "1.125rem",
            fontWeight: "400",
            margin: "10px 0px",
          }}
        >
          From time to time in this and other documents, Atalaya may refer to
          itself as a "registered investment adviser" by virtue of its
          registration with the SEC. This status does not imply any level of
          training or skill, or any endorsement by (or on behalf of) the SEC or
          any state securities authority.
        </p>
      </div>
    </div>
  );
};
export default FooterComponent;
