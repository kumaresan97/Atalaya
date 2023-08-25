import * as React from "react";
import styles from "./Header.module.scss";
import { IHeaderProps } from "./IHeaderProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Navbar from "./Navbar";

export default class Header extends React.Component<IHeaderProps, {}> {
  public render(): React.ReactElement<IHeaderProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Navbar />;
  }
}
