import * as React from "react";
import styles from "./Carosuel.module.scss";
import { ICarosuelProps } from "./ICarosuelProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import MainComponent from "./MainComponent";

export default class Carosuel extends React.Component<ICarosuelProps, {}> {
  constructor(prop: ICarosuelProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<ICarosuelProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <MainComponent context={this.props.context} />;
  }
}
