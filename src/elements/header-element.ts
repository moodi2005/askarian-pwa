import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js'
import { query } from 'lit/decorators/query.js'
import { property } from 'lit/decorators/property.js'
import { getJson } from '@alwatr/fetch';

import { repeat } from 'lit/directives/repeat.js';
import { background, OrangeHover, color_header, color_header_mobile, color_header_text, color_header_text_mobile, glod, color_description } from "../color"
import { config, menu, articles, article } from '../types';
import "../askarian-pwa";


@customElement('header-element')
export class HeaderElement extends LitElement {

    static override styles = [
        css`
            :host {
                width:100%;
                position:relative;
                display:flex;
                justify-content:center;
                  }
            .box-desktop{
                width:100%;
                height:5em;
                background-color:${color_header};
                display:flex;
                align-items:center;
                justify-content:center;
                padding:0 2em;
                box-sizing:border-box;
                transition:300ms linear transform;
                border-bottom:3px solid #b8c3cc;
                box-shadow: 0 2px 13px 1px #174c6b5e;
                position:relative;
            }
            .box-menu{
                display:flex;
                align-items:center;
                justify-content:flex-start;
                position:absolute;
                right:2em;
            }
            .logo{
                width:7em;
            }
            .box-logo{
                position:relative;
                display:flex;
                justify-content:center;
                align-items:center;
            }
            .menu{
                list-style:none;
                display:flex;
            }
            .menu>li>a{
                text-decoration:none;
                margin:0 .5em;
                color:${color_header_text};
                transition:300ms linear color
            }
            .menu>li>a:hover,.icons>ion-icon:hover,#active{
                color: ${OrangeHover};
            }
            .icons{
                position:absolute;
                left:2em;
            }
            .icons>ion-icon{
                font-size:25px;
                cursor:pointer;
                color:${color_header_text};
                margin:0 .5em;
                transition:300ms linear color
            }
            .border-menu{
                display:none;
            }
            .close{
                display:none;
            }
            .box-mobile{
                display:none;
            }
            #open-box,#close-box{
                width:100%;
            }
            .language,.search{
                width:0;
                height:0;
                position:absolute;
                top:0;
                margin:0 auto;
                border-radius:50% 50% 0 0;
                overflow:hidden;
                z-index:40;
                backdrop-filter: blur(10px);
                background-color:#272727dd;
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                transition:200ms linear height,200ms linear width,200ms linear border-radius;
            }
            #open_language_box,#open_search_box{
                width:100%;
                height:100vh;
                border-radius:0;
            }
            .language>img{
                width:15em;
            }
            .language>ion-icon,.search>ion-icon{
                position:absolute;
                height:2em;
                color:${color_header_text_mobile};
                cursor:pointer;
                left:1em;
                top:0;
                font-size:35px;
            }
            .language>ion-icon:active,.search>ion-icon:active{
                color:red;
            }
            .list-lang{
                width:25em;
                height:6em;
                display:flex;
                justify-content:space-around;
                align-items:center;
            }
            .list-lang>span{
                font-size:20px;
                color:#fff;
                cursor:pointer;
                transition:300ms linear color;
            }
            .list-lang>span:hover{
                color:${glod}
            }
            .head_hidden{
                display:none;
            }
            .search>input{
                width:20em;
                height:1.5em;
                outline:none;
                color:#fff;
                background-color:transparent;
                border:0;
                border-bottom:4px solid #c4c0c0;
                transition:300ms linear border-bottom;
                font-size:40px;
            }
            .search>input:focus{
                border-bottom:4px solid #ffffff;
            }
            .search>input::placeholder,.search>input{
                font-family: 'Tajawal', sans-serif;
            }
            .search>div{
                margin-top:2em;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
            }
            .search>div>a{
                text-decoration:none;
            }
            .articel{
                width:47em;
                max-width:100%;
                height:4em;
                background-color:${background};
                display:flex;
                justify-content:flex-start;
                flex-wrap:wrap;
                align-items:center;
                border-radius:5px;
                margin:0.4em 0;
                overflow:hidden;
                transition:300ms linear  box-shadow;
            }
            .articel:hover{
                box-shadow:0 0 10px 0 ${OrangeHover};
            }
            .articel>img{
                width:4em;
                height:4em;
            }
            .articel>div{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:flex-start;
                padding:0 .2em;
            }
            .articel>div>h4{
                font-size:20px;
                color:black;
            }
            .articel>div>p{
                color:${color_description};
            }
            .articel *{
                margin:0;
            }
            @media only screen and (max-width: 1024px) {
                .logo{
                    display:none;
                }
                .box-menu,.icons{
                    position:static;
                    right:auto;
                }
                .box-desktop{

                }
            }
            @media only screen and (max-width: 768px) {
                #open-box{
                    height:100vh;
                    padding:2em 0;
                    display:flex;
                }
                #close-box{
                    height:0;
                    padding:0;
                    display:none;
                }
                .box-desktop{
                    position: absolute;
                    right:0;
                    top: 0; 
                    z-index:20;
                    background-color:${color_header_mobile};
                    width:0;
                    height:0;
                    overflow:hidden;
                    flex-direction:column;
                    justify-content:flex-start;
                    padding:2em 0;
                    box-sizing:border-box;
                }
                .box-menu,.menu{
                    width:100%;
                    flex-direction:column;
                    align-items:center;
                    justify-content:flex-start;
                    padding:0;
                }
                .menu>li{
                    width:100%;
                    height:3em;
                    display:flex;
                    justify-content:center;
                }
                .menu>li>a{
                    color:${color_header_text_mobile};
                    font-size:20px;
                }
                .icons>ion-icon{
                    color:${color_header_text_mobile};
                    margin:.5em;
                }
                .border-menu{
                    display:block;
                    margin:1em 0;
                }
                .close,.open{
                    display:block;
                    position:absolute;
                    font-size:40px;
                    left:.1em;
                    top:.3em;
                    color:${color_header_text_mobile};
                    cursor:pointer;
                }
                .close:active,.box-mobile>ion-icon:active{
                    color:${OrangeHover};
                }
                .box-mobile{
                    display:block;
                    position:sticky;
                    width:100%;
                    height:4em;
                    top:0;
                    right:0;
                    z-index:2;
                    background-color:${color_header_mobile}; 
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:.5em;
                    box-sizing:border-box;
                    border-bottom:3px solid #b8c3cc;
                    box-shadow: 0 2px 13px 1px #174c6b5e;
                }
                .box-mobile>img{
                    width:auto;
                    height:100%;
                }
                .logo{
                    display:block;
                }
                .box-logo{
                    order:-1;
                }
            }
            
            `
    ];

    override render() {
        const Language = html`
        <div class="language">
            <ion-icon @click=${this.close_lang} name="close-circle-outline"></ion-icon>
            <img src="/images/logo.png" alt="logo" title="logo" />
            <div class="list-lang">
                <span class="fa" @click=${this.close_lang}>فارسی</span>
                <span class="ar" @click=${this.close_lang}>العربی</span>
                <span class="en" @click=${this.close_lang}>English</span>
            </div>
        </div>
        `
        const search = html`
        <div class="search">
            <ion-icon @click=${this.close_search} name="close-circle-outline"></ion-icon>
            <input @keydown=${this.search} type="text" placeholder="${this.config.textSearch}" autofocus />
            <div>
                ${repeat(this.list, (item: article) => html`
                <a @click=${this.close_search} href="/post/${item.link}">
                    <div class="articel"><img src=${item.image} alt=${item.titel} />
                        <div>
                            <h4>${item.titel}</h4>
                            <p>${item.description}</p>
                        </div>
                    </div>
                </a>
                `)}
            </div>
        </div>
        `

        return html`
                ${Language}
                ${search}
                
                <div class="box-mobile">
                    <img src="/images/logo.png" alt="logo" title="logo" />
                    <ion-icon class="open" @click=${this.open} name="menu-outline"></ion-icon>
                </div>
                <div class="box-desktop ${this.hidden_head === true ? " head_hidden" : ""}">
                    <div class="box-menu">
                        <ion-icon @click=${this.colse} class="close" name="close-circle-outline"></ion-icon>
                        <img src="/images/border1.png" class="border-menu" alt="logo" />
                        <div class="menu">
                            <ul class="menu">
                                ${repeat(this.config.menu, (item: menu) => html`
                                <li @click=${this.colse}><a id=${this.path==item.link.replace("/", "") ? "active" : ""}
                                        href="${item.link}">${item.name}</a></li>`
                     )}
                            </ul>
                        </div>
                    </div>
                    <div class="box-logo">
                        <img class="logo" src="/images/logo.png" alt="logo" title="logo" />
                        <!-- <span class="line-hover"></span> -->
                    </div>
                    <div class="icons">
                        <ion-icon name="search-outline" @click=${this.open_search}></ion-icon>
                        <ion-icon name="globe-outline" @click=${this.open_lang} title="Language"></ion-icon>
                    </div>
                </div>
        `;
    }
 
    @query(".close")
    button_close!: HTMLButtonElement;
    @query(".box-desktop")
    menu!: HTMLElement;
    @query(".language")
    language!: HTMLElement;
    @query(".search")
    searchElement!: HTMLElement;
    @query(".search>input")
    inputsearch!: HTMLInputElement;
    @property({ attribute: true, type: String })
    path = ""
    @property({ attribute: true, type: Boolean })
    hidden_head = false;
    @property({ attribute: true, type: Object })
    config: config | any = {}
    @property({ attribute: false, type: Array })
    list: articles | [] = [];
    colse(_e: Event) {
        this.menu.setAttribute("id", "close-box")
        this.menu.setAttribute("id", "close-box");
    }
    open(_e: Event) {
        this.menu.setAttribute("id", "open-box");
    }
    open_lang(_e: Event) {
        this.language.setAttribute("id", "open_language_box");
    }
    close_lang(_e: Event) {
        this.language.removeAttribute("id");
    }
    open_search(_e: Event) {
        this.searchElement.setAttribute("id", "open_search_box");
    }
    close_search(_e: Event) {
        this.searchElement.removeAttribute("id");
        this.inputsearch.value = "";
        this.list = [];

    }
    async search(e: Event) {
        let value = (e.target as HTMLInputElement).value;

        //   Get list articles
        let json: any = localStorage.getItem('articles');
        if (!json) {
            const get: any = await getJson('/json/articles.json');
            localStorage.setItem('articles', JSON.stringify(get));
            json = get;
        } else {
            json = JSON.parse(json);
        }
        const articles: articles = json,
            list: articles | [] = articles.length > 0 && value.length > 0 ? articles.filter((item: article) => (item.titel + item.description).indexOf(value) !== -1) : [];
        this.list = list;
    }
}
