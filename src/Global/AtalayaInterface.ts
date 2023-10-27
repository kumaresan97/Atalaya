export interface IAnnouncementViews {
  EMail: string;
  JobTitle: string;
  Title: string;
  ID: number;
  Sequence: number;
  image: string;
}
export interface INews {
  Id: number;

  Description: string;
  imageUrl: string;
  CreatedEmail: string;
  DisplayName: string;
  Created: any;
  TagName: string;
  AttachmentFiles?: string;
}
export interface IImgcarosuel {
  Title: string;
  ImageUrl: string;
  Url: string;
}
export interface ICarosuel {
  imageUrl: string;
  Title: String;
  Description: string;
  Url: string;
  Active: boolean;
}
export interface IQuickLink {
  imageUrl: string;
  Title: String;
  Id: number;
  Url: string;
}
