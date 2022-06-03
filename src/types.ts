export interface article {
    id: number,
    name: string,
    description: string,
    image: string,
    date: Date
}

export interface post {
    titel: string,
    image: any,
    text: string,
    date: string,
}

export interface articles extends Array<article> { }

interface menu {
    name: string,
    link: string,
    titel: string
}
interface menuFoter {
    name: string,
    link: string,
}
// project_img: Array<{ name: string, link: string, image: string }>,
// project:Array<{name:string,link:string,number:number}>,
// "project_img": [
//     { "name": "الصفحة الرئيسية", "link": "/", "image": "/images/background-part-about.jpg" },
//     { "name": "الصفحة الرئيسية", "link": "/", "image": "/images/background-part-about.jpg" }
//   ],
//   "project": [
//     { "name": "الصفحة الرئيسية", "link": "/", "number": 0 },
//     { "name": "الصفحة الرئيسية", "link": "/", "number": 0 }
//   ],

export interface homePage {
    titel?: string,
    part_about?: {
        titelTop: string,
        titel: string,
        description: string,
        button: string
    },
    times?: Array<string>,
    projectPart?: {
        titel: string,
        description: string,
    },
    vicariousPart?: {
        titel: string,
        description: string,
        button: string,
        input: string,
        oninvalid:string
    }
    news?: {
        titel: string,
    }
}

export interface config {
    titelSite: string,
    menu: Array<menu>,
    footer: { name: Array<string>; one: Array<menuFoter>; two: Array<menuFoter>; three: Array<menuFoter> },
    homePage: {
        titel: string,
        part_about?: {
            titelTop: string,
            titel: string,
            description: string,
            button: string
        },
        times: Array<string>,
        projectPart: {
            titel: string,
            description: string,
        },
        vicariousPart: {
            titel: string,
            description: string,
            button: string,
            input: string,
            oninvalid:string
        }
        news: {
            titel: string,
        }
    },
    live: {
        titel: string
    },
    panorama: {
        titel: string
    }
    articles: {
        titel: string
    },
    textSearch: string,
}