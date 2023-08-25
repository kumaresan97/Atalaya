import * as React from "react";
import styles from "./Announcementview.module.scss";
import { IAnnouncementviewProps } from "./IAnnouncementviewProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import Announcementviews from "./Announcementviews";

export default class Announcementview extends React.Component<
  IAnnouncementviewProps,
  {}
> {
  constructor(prop: IAnnouncementviewProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IAnnouncementviewProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Announcementviews context={this.props.context} />;
  }
}
