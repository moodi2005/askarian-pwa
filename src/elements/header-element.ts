import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js'
import { query } from 'lit/decorators/query.js'
import { property } from 'lit/decorators/property.js'



import { repeat } from 'lit/directives/repeat.js';
import { OrangeHover, color_header, color_header_mobile, color_header_text, color_header_text_mobile } from "../color"

const list = [
    { name: "الصفحة الرئيسية", link: "/", page: "home" },
    { name: "تاريخ سامراء", link: "/about", page: "about" },
    { name: "يعيش", link: "/live", page: "live" },
    { name: "الحج إلى الضريح", link: "/panorama", page: "panorama" },
    { name: "مقالات", link: "/blog", page: "blog" },
]
declare global {
    interface HTMLElementTagNameMap {
        "ion-icon": HTMLElement;
    }
}
@customElement('header-element')
export class HeaderElement extends LitElement {

    @property({ attribute: true, type: String })
    path = ""

    static override styles = [
        css`
            :host {
                width:100%;
                position:relative;
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
                    position: inherit;
                    right:-100%;
                    bottom: 0; 
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
        return html`
        <div class="box-mobile">
            <img src="/images/logo.png" alt="logo" title="logo" />
            <ion-icon class="open" @click=${this.open} name="menu-outline"></ion-icon>
        </div>
        <div class="box-desktop">
            <div class="box-menu">
                <ion-icon @click=${this.colse} class="close" name="close-circle-outline"></ion-icon>
                <img src="/images/border1.png" class="border-menu" alt="logo" />
                <div class="menu">
                    <ul class="menu">
                        ${repeat(list, (item) => html`
                        <li @click=${this.colse}><a id=${this.path == item.page ? "active" : "" }
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
                <ion-icon name="search-outline"></ion-icon>
                <ion-icon name="globe-outline" title="Language"></ion-icon>
            </div>
        </div>
        `;
    }
    @query(".close")
    button_close!: HTMLButtonElement;
    @query(".box-desktop")
    menu!: HTMLElement;
    colse(_e: Event) {
        this.menu.setAttribute("id", "close-box")
        this.menu.setAttribute("id", "close-box")
    }
    open(_e: Event) {
        this.menu.setAttribute("id", "open-box")
    }
}
