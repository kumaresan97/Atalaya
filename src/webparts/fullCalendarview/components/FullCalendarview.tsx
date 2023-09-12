import * as React from "react";
import styles from "./FullCalendarview.module.scss";
import { IFullCalendarviewProps } from "./IFullCalendarviewProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import Fullcalendar from "./Fullcalendar";
import "../../../Global/Style.css";

export default class FullCalendarview extends React.Component<
  IFullCalendarviewProps,
  {}
> {
  constructor(prop: IFullCalendarviewProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IFullCalendarviewProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Fullcalendar context={this.props.context} />;
  }
}
