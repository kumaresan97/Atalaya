import * as React from "react";
import styles from "./Newsview.module.scss";
import { INewsviewProps } from "./INewsviewProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import NewsviewComponent from "./NewsviewComponent";

export default class Newsview extends React.Component<INewsviewProps, {}> {
  constructor(prop: INewsviewProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<INewsviewProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <NewsviewComponent context={this.props.context} />;
  }
}
