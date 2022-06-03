import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js'
import { repeat } from 'lit/directives/repeat.js';
import { property } from 'lit/decorators/property.js';


import { getJson } from '@alwatr/fetch';

import { article,articles } from "../types"
import {glod} from "../color"


// get posts
let json: any = localStorage.getItem('articles');
if (!json) {
  const get: any = await getJson('/json/articles.json');
  localStorage.setItem('articles', JSON.stringify(get));
  json = get;
} else {
  json = JSON.parse(json);
}
const articles:articles = json;



@customElement('page-articles')
export class PageArticles extends LitElement {
    static override styles = [
        css`
            :host {
                display: flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                width:100%:
            }
            h1{
                font-size:30px;
                margin:2em 0;
            }
            .articles{
                width:60.9em;
                max-width:80%;
                min-height:80vh;
                display:flex;
                justify-content:flex-start;
                align-items:flex-start;
                flex-wrap:wrap;
            }
            .article{
                width:16.9em;
                height:27em;
                margin:2em 1em;
                border-radius:10px;
                box-shadow: 0 0 25px #e3e5e6;
                background: linear-gradient(180deg,#d8dfe9 0%,rgb(209 19 19 / 1%) 80%);
                overflow: hidden;
                display:flex;
                flex-direction:column;
                justify-content:flex-start;
                align-items:center;
            }
            .article:hover{
                background: linear-gradient(180deg,${glod} 10%,rgb(209 19 19 / 1%) 62%);
            }
            .article:hover>a>h2{
                color:${glod};
            }
            .article:hover>a>span{
                background-color:${glod};
            }
            .article>a{
                display:flex;
                flex-direction:column;
                justify-content:flex-start;
                align-items:center;
                text-decoration:none;
                border-radius:10px;

            }
            .article>a>img{
                width:97%;
                border-radius:10px;
                margin-top:.25em;
                height:16.3em;
            }
            .article>a>span{
                width:8em;
                height:.2em;
                border-radius:0 0 40% 40%;
                background-color:#929292;
                transition:300ms linear background-color;
            }
            .article>a>h2{
                font-size:16px;
                font-weight:500;
                color:black;
                transition:200ms linear color;
            }
            .article>p{
                color:#a1abb3;
                text-align:justify;
                margin:.8em;
                font-size:14px;
            }
            @media only screen and (max-width: 425px) {
                .articles{
                    max-width:100%;
                    justify-content:center;
                }
            }
        `
    ];

    override render() {
        return html`
        <h1>${this.config.titel}</h1>
        <div class="articles">
            ${repeat(articles, (item: article) => html`
            <div class="article">
                <a href="/post/${item.link}/">
                    <img src=${item.image} alt="image-${item.titel}" loding="lazy"/>
                    <span></span>
                    <h2>${item.titel}</h2>
                </a>
                <p>${item.description}...</p>
            </div>
            `)}
        </div>
        `;
    }
    @property({ attribute: true, type: Object })
    config: any = {};
}
