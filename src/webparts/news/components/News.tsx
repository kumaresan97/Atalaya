import * as React from "react";
import styles from "./News.module.scss";
import { INewsProps } from "./INewsProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";

import NewsComponent from "./NewsComponent";

export default class News extends React.Component<INewsProps, {}> {
  constructor(prop: INewsProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<INewsProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <NewsComponent context={this.props.context} />;
  }
}
