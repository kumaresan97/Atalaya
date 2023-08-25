import * as React from "react";
import styles from "./ImageCarosuel.module.scss";
import { IImageCarosuelProps } from "./IImageCarosuelProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import Imgcarosuel from "./ImgCarosuel";

export default class ImageCarosuel extends React.Component<
  IImageCarosuelProps,
  {}
> {
  constructor(prop: IImageCarosuelProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IImageCarosuelProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Imgcarosuel context={this.props.context} />;
  }
}
