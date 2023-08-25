import * as React from "react";
import styles from "./QuickLinks.module.scss";
import { IQuickLinksProps } from "./IQuickLinksProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import Quicklink from "./Quicklink";

export default class QuickLinks extends React.Component<IQuickLinksProps, {}> {
  constructor(prop: IQuickLinksProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IQuickLinksProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Quicklink context={this.props.context} />;
  }
}
