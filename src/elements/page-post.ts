import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import { property } from 'lit/decorators/property.js';

import { getJson } from "@alwatr/fetch";
import { articles,article } from "../types";

@customElement('page-post')
export class PagePost extends LitElement {

  static override styles = [
    css`
      :host {
      display: flex;
      justify-content:center;
      align-items:flex-start;
      position:relative;
    }
    *{
      box-sizing:border-box;
    }
    main{
      width:40%;
      background-color:#ffff;
      border-radius:10px;
      margin:8em 3em 4em 0;
      box-shadow: 0 0 25px rgb(227 229 230 / 50%);
      overflow:hidden;
    }
    .sidebar{
      width:16vw;
      border-radius:6px;
      background-color:transparent;
      margin:8em 0 4em 3em;
      position:relative;
      position: sticky;
      top: 7em;
    }
    .image-post{
      width:16vw;
      height:16vw;
      border:4px solid #e4e8eb;
      background-color:transparent;
      border-radius: 10px 103px 10px 10px;
      box-shadow: 0 0 25px rgb(227 229 230 / 50%);
    }
    main>p{
      text-align: justify;
      padding: 0 .2em;
    }
    .menu-sidebar{
      width:100%;
      height:fit-content;
      box-shadow: 0 0 25px rgb(227 229 230 / 50%);
      padding:1em .1em;
      margin:4em 0;
      border-radius:10px;
      background-color:#fff;
    }
    @media only screen and (max-width: 1440px) {
        main{
        width:50%;
        margin:5em 1em;
      }
    }
    @media only screen and (max-width: 1024px) {
      .sidebar{
        display:none;
      }
      main{
        width:90%;
        margin:5em 1em;
      }
    }
        `
  ];
  static post: any;

  override render() {
    return html`
        <div class="sidebar">
          <div class="image-post" title="${this.post.titel}"></div>
          <div class="menu-sidebar">
            <p>أحدث المقالات</p>
            <ul>
              <li>المقال الأول</li>
              <li>المقال الثانی</li>
              <li>المقال الثالث</li>
              <li>المقال الرابع</li>
            </ul>
          </div>
        </div>
        <main>
          <p class="text-post"></p>
        </main>
        `;
  }
  @query(".text-post")
  text_post!: HTMLParagraphElement;
  @query(".image-post")
  image!: HTMLParagraphElement;
  @property({ attribute: true })
  titelSite=""
  @property({ attribute: false })
  post: article = {
    titel: "",
    link: "",
    date: "",
    image: "",
    id: 0,
    description: ''
  };


  override async firstUpdated() {
    const path = location.pathname.split("/")[2];
    // get articles
    let json_articles:any = localStorage.getItem('articles');
    if (!json_articles) {
      const get: any = await getJson('/json/articles.json');
      localStorage.setItem('articles', JSON.stringify(get));
      json_articles = get;
    } else {
      json_articles = JSON.parse(json_articles);
    }
    const articles:articles = json_articles;

    const article:article|undefined = articles.filter((item:article)=>item.link===path)[0];

    if(article){
      const json: any = await getJson(`/json/post/post-${article.id}.json`);
      this.post = article;
      this.image.setAttribute("style", `background:url(${article.image}) no-repeat center center /cover;`);
      this.text_post.innerHTML = json.text;
      // set titel
      document.title=`${article.titel} | ${this.titelSite}`
      
    }else location.pathname="404";
  }
}
