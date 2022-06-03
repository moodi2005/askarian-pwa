export interface article {
    id:number,
    name:string,
    description:string,
    image:string,
    date:Date
}

export interface articles extends Array<article>{}