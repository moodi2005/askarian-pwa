export interface article {
  id: number;
  titel: string;
  description: string;
  image: string;
  link: string;
  date: string;
}

export interface post {
  titel: string;
  image: any;
  text: string;
  link: string;
  date: string;
}

export interface times {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface articles extends Array<article> {}

export interface menu {
  name: string;
  link: string;
  titel: string;
}
interface menuFoter {
  name: string;
  link: string;
}
export interface project {
  titel: string;
  link: string;
  image: string;
}
export interface project_list {
  name: string;
  number: number;
}

export interface news_projects {
  news: Array<article>;
  project: Array<project>;
  project_list: Array<project>;
}

export interface homePage {
  titel?: string;
  text_scroll:string;
  menu: [menu];
  part_about?: {
    titelTop: string;
    titel: string;
    description: string;
    button: string;
  };
  times?: Array<string>;
  projectPart?: {
    titel: string;
    description: string;
  };
  vicariousPart?: {
    titel: string;
    description: string;
    button: string;
    input: string;
    oninvalid: string;
  };
  news?: {
    titel: string;
  };
}

export interface config {
  titelSite: string;
  menu: Array<menu>;
  footer: {name: Array<string>; one: Array<menuFoter>; two: Array<menuFoter>; three: Array<menuFoter>};
  homePage: {
    titel: string;
    text_scroll:string;
    part_about?: {
      titelTop: string;
      titel: string;
      description: string;
      button: string;
    };
    times: Array<string>;
    projectPart: {
      titel: string;
      description: string;
    };
    vicariousPart: {
      titel: string;
      description: string;
      button: string;
      input: string;
      oninvalid: string;
    };
    news: {
      titel: string;
    };
  };
  live: {
    titel: string;
  };
  panorama: {
    titel: string;
  };
  articles: {
    titel: string;
  };
  textSearch: string;
}
