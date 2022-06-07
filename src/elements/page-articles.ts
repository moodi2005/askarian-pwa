import {getJson} from '@alwatr/fetch';
import {LitElement, html, css, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {repeat} from 'lit/directives/repeat.js';

import {Glod, ColorDescription} from '../color';
import {article, articles} from '../types';

@customElement('page-articles')
export class PageArticles extends LitElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      h1 {
        font-size: 30px;
        margin: 2em 0;
      }
      .articles {
        width: 60.9em;
        max-width: 80%;
        min-height: 80vh;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
      }
      .article {
        width: 16.9em;
        height: 27em;
        margin: 2em 1em;
        border-radius: 10px;
        box-shadow: 0 0 25px #e3e5e6;
        background: linear-gradient(180deg, #d8dfe9 0%, rgb(209 19 19 / 1%) 80%);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }
      .article:hover {
        background: linear-gradient(180deg, ${Glod} 10%, rgb(209 19 19 / 1%) 62%);
      }
      .article:hover > a > h2 {
        color: ${Glod};
      }
      .article:hover > a > span {
        background-color: ${Glod};
      }
      .article > a {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        border-radius: 10px;
      }
      .article > a > img {
        width: 97%;
        border-radius: 10px;
        margin-top: 0.25em;
        height: 16.3em;
      }
      .article > a > span {
        width: 8em;
        height: 0.2em;
        border-radius: 0 0 40% 40%;
        background-color: #929292;
        transition: 300ms linear background-color;
      }
      .article > a > h2 {
        font-size: 16px;
        font-weight: 500;
        color: black;
        transition: 200ms linear color;
      }
      .article > p {
        color: ${ColorDescription};
        text-align: justify;
        margin: 0.8em;
        font-size: 14px;
      }
      @media only screen and (max-width: 425px) {
        .articles {
          max-width: 100%;
          justify-content: center;
        }
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <h1>${this.config.titel}</h1>
      <div class="articles">
        ${this.articles ?
          repeat(
              this.articles,
              (item: article) => html`
                <div class="article">
                  <a href="/post/${item.link}/">
                    <img src=${item.image} alt="image-${item.titel}" loading="lazy" />
                    <span></span>
                    <h2>${item.titel}</h2>
                  </a>
                  <p>${item.description}...</p>
                </div>
              `,
          ) :
          ''}
      </div>
    `;
  }
  @property({attribute: true, type: Object})
    config: Record<string, never> = {};
  @property({attribute: true, type: Array})
    articles: articles | null = null;

  override async firstUpdated(): Promise<void> {
    // get list articles
    const json: string | null = localStorage.getItem(`articles-${this.lang}`);
    if (!json) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const get: any = await getJson(`/json/articles-${this.lang}.json`);
      localStorage.setItem(`articles-${this.lang}`, JSON.stringify(get));
      this.articles = get;
    } else {
      this.articles = JSON.parse(json);
    }
    this.requestUpdate();
  }
}
