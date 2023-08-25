import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IImageCarosuelProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
}
