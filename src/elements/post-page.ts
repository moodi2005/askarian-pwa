import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import { property } from 'lit/decorators/property.js';

import { getJson } from "@alwatr/fetch";
import { post } from "../types";

@customElement('post-page')
export class PostPage extends LitElement {

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
    @property({ attribute: false })
    post: post = {
        titel: "",
        date: "",
        image: "",
        text: ""
    };


    override async firstUpdated() {
        const json: any = await getJson("/json/post/post-1.json");
        this.post = json;
        this.image.setAttribute("style", `background:url(${this.post.image}) no-repeat center center /cover;`)
        this.text_post.innerHTML = this.post.text;
    }
}
