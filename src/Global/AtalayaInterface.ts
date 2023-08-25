export interface IAnnouncementViews {
  EMail: string;
  JobTitle: string;
  Title: string;
}
export interface INews {
  Id: number;

  Description: string;
  imageUrl: string;
  CreatedEmail: string;
  DisplayName: string;
  Created: any;
  TagName: string;
}
export interface IImgcarosuel {
  Title: string;
  ImageUrl: string;
}
export interface ICarosuel {
  imageUrl: string;
  Title: String;
  Description: string;
  Url: string;
}
export interface IQuickLink {
  imageUrl: string;
  Title: String;
  Id: number;
  Url: string;
}
