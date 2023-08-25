import * as React from "react";
import "./style.css";
import { Icon } from "@fluentui/react";
const imageUrl1 = require("../assets/getsitelogo.png");

const Navbar = () => {
  const [active, setActive] = React.useState(false);
  const [activelinks, setActivelinks] = React.useState("About Us");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "40px",
        padding: "10px 50px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "100px",
      }}
    >
      <div>
        <img src={`${imageUrl1}`} alt="kkk" width={"80px"} />
      </div>
      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <li className="dropdown">
          <a
            href="https://chandrudemo.sharepoint.com/sites/Atalya"
            target="_blank"
            className={activelinks === "About Us" ? "active" : ""}
            onClick={() => setActivelinks("About Us")}
          >
            About Us{" "}
          </a>
          <Icon
            styles={{
              root: {
                cursor: "pointer",
                color: "#a98644",
                marginLeft: "10px",
                verticalAlign: "middle",
              },
            }}
            iconName={active ? "ChevronUp" : "ChevronDown"}
            onClick={() => setActive(!active)}
          ></Icon>
          <ul
            className={`${
              active ? "dropdown-content-active" : "dropdown-content"
            }`}
          >
            <li>
              <a href="#">About Us 1</a>
            </li>
            <li>
              <a href="#">About Us 2</a>
            </li>
            <li>
              <a href="#">About Us 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a
            href="https://chandrudemo.sharepoint.com/sites/Atalya/Lists/QuickLinks/AllItems.aspx"
            target="_blank"
            className={activelinks === "DE&I" ? "active" : ""}
            onClick={() => setActivelinks("DE&I")}
          >
            DE&I
          </a>
        </li>
        <li>
          <a href="#">Social Committee</a>
        </li>
        <li>
          <a href="#">Talent</a>
        </li>
        <li>
          <a href="#">Payroll & Benefits</a>
        </li>
        <li>
          <a href="#">Policies</a>
        </li>
        <li>
          <a href="#">Learning and Development</a>
        </li>
        <li>
          <a href="#">Travel and Entertainment</a>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
