import * as React from "react";
import styles from "./Map.module.scss";
import { IMapProps } from "./IMapProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Mapview from "./Mapview";
import { sp } from "@pnp/sp/presets/all";
import "../../../Global/Style.css";
export default class Map extends React.Component<IMapProps, {}> {
  constructor(prop: IMapProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IMapProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Mapview context={this.props.context} />;
  }
}
