/* eslint-disable no-case-declarations */
import {getJson} from '@alwatr/fetch';
import {LitElement, html, css, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {query} from 'lit/decorators/query.js';

import {article} from '../types';

@customElement('page-post')
export class PagePost extends LitElement {
  static override styles = [
    css`
      :host {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: relative;
      }
      * {
        box-sizing: border-box;
      }
      main {
        width: 40%;
        background-color: #ffff;
        border-radius: 10px;
        margin: 8em 3em 4em 3em;
        box-shadow: 0 0 25px rgb(227 229 230 / 50%);
        overflow: hidden;
      }
      .sidebar {
        width: 16vw;
        border-radius: 6px;
        background-color: transparent;
        margin: 8em 0 4em 3em;
        position: relative;
        position: sticky;
        top: 7em;
      }
      .image-post {
        width: 16vw;
        height: 16vw;
        border: 4px solid #e4e8eb;
        background-color: transparent;
        border-radius: 10px 50% 10px 10px;
        box-shadow: 0 0 25px rgb(227 229 230 / 50%);
      }
      .ltr_border_redius {
        border-radius: 50% 10px 10px 10px;
      }
      main > p {
        text-align: justify;
        padding: 0 0.2em;
      }
      .menu-sidebar {
        width: 100%;
        height: fit-content;
        box-shadow: 0 0 25px rgb(227 229 230 / 50%);
        padding: 1em 0.1em;
        margin: 4em 0;
        border-radius: 10px;
        background-color: #fff;
      }
      @media only screen and (max-width: 1440px) {
        main {
          width: 50%;
          margin: 5em 1em;
        }
      }
      @media only screen and (max-width: 1024px) {
        .sidebar {
          display: none;
        }
        main {
          width: 90%;
          margin: 5em 1em;
        }
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <div class="sidebar">
        <div class="image-post ${this.lang === 'en' ? 'ltr_border_redius' : ''}" title="${this.post.titel}"></div>
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
  @query('.text-post')
    text_post!: HTMLParagraphElement;
  @query('.image-post')
    image!: HTMLParagraphElement;
  @property({attribute: true})
    titelSite = '';
  @property({attribute: false})
    post: article = {
      titel: '',
      link: '',
      date: '',
      image: '',
      id: 0,
      description: '',
    };

  override async firstUpdated(): Promise<void> {
    // Function Set Cookie
    function setCookie(key: string, value: string, expDays: number): void {
      const date = new Date();
      date.setTime(date.getTime() + expDays * 60 * 60 * 1000);
      const expires = 'expires=' + date.toUTCString();
      document.cookie = key + '=' + value + '; ' + expires + '; path=/';
    }
    function getCookie(cName: string): string {
      const name = cName + '=';
      const cDecoded = decodeURIComponent(document.cookie); // to be careful
      const cArr = cDecoded.split('; ');
      let res = '';
      cArr.forEach((val) => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
      });
      return res;
    }

    // get path
    const path = location.pathname.split('/')[2];
    const TypePost = location.pathname.split('/')[1];
    let articles: Array<article> = [];

    switch (TypePost) {
      case 'post':
        // get articles
        const JsonArticles: string | null = localStorage.getItem(`articles-${this.lang}`);
        if (!JsonArticles) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const get: any = await getJson(`/json/articles-${this.lang}.json`);
          localStorage.setItem(`articles-${this.lang}`, JSON.stringify(get));
          articles = get;
        } else {
          articles = JSON.parse(JsonArticles);
        }
        break;
      case 'news': {
        // get news
        const NewsJson: string = getCookie(`news-projects-${this.lang}`);
        if (!NewsJson) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const get: any = await getJson(`/json/news-projects-${this.lang}.json`);
          setCookie(`news-projects-${this.lang}`, JSON.stringify(get), 1);
          articles = get.news;
        } else {
          articles = JSON.parse(getCookie(`news-projects-${this.lang}`)).news;
        }
        break;
      }
      case 'project': {
        // get news
        const TextProject: string = getCookie(`news-projects-${this.lang}`);
        if (!TextProject) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const get: any = await getJson(`/json/news-projects-${this.lang}.json`);
          setCookie(`news-projects-${this.lang}`, JSON.stringify(get), 1);
          articles = get.project;
        } else {
          articles = JSON.parse(getCookie(`news-projects-${this.lang}`)).project;
        }
        break;
      }
      default:
        location.pathname = '404';
        break;
    }
    const article: article | undefined = articles.filter((item: article) => item.link === path)[0];

    if (article) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const json: any = await getJson(`/json/${TypePost}/${TypePost}-${article.id}.json`);
      this.post = article;
      this.image.setAttribute('style', `background:url(${article.image}) no-repeat center center /cover;`);
      this.text_post.innerHTML = json[this.lang];
      // set titel
      document.title = `${article.titel} | ${this.titelSite}`;
    } else location.pathname = '404';
  }
}
