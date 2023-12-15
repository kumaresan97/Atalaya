export interface IAnnouncementViews {
  EMail: string;
  JobTitle: string;
  Title: string;
  ID: number;
  Sequence: number;
  // image: string;
  Attach: any;
}

export interface INews {
  Id: number;
  Description: string;
  Url?: string;
  CreatedEmail: string;
  DisplayName: string;
  Created: any;
  TagName: string;
  Attach: any;
}

export interface IImgcarosuel {
  Title: string;
  // ImageUrl: string;
  Url: string;
  Attach: any;
}

export interface ICarosuel {
  imageUrl?: string;
  Title: String;
  Description: string;
  Url: string;
  Active: boolean;
  // image: string;
  ID: number;
  Sequence: number;
  Attach: any;
}

export interface IQuickLink {
  // imageUrl: string;
  Title: String;
  Id: number;
  Url: string;
  Attach: any;
}
