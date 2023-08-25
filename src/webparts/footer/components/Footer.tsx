import * as React from "react";
import styles from "./Footer.module.scss";
import { IFooterProps } from "./IFooterProps";
import { escape } from "@microsoft/sp-lodash-subset";
import FooterComponent from "./FooterComponent";

export default class Footer extends React.Component<IFooterProps, {}> {
  public render(): React.ReactElement<IFooterProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <FooterComponent />;
  }
}
