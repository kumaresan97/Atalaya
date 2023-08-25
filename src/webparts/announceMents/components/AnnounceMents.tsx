import * as React from "react";
import styles from "./AnnounceMents.module.scss";
import { IAnnounceMentsProps } from "./IAnnounceMentsProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import AnnounceMent from "./Announcement";

export default class AnnounceMents extends React.Component<
  IAnnounceMentsProps,
  {}
> {
  constructor(prop: IAnnounceMentsProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IAnnounceMentsProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <AnnounceMent context={this.props.context} />;
  }
}
