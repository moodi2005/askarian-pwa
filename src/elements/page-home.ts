import { css, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators/state.js';


import { AppElement } from '../app-debt/app-element';
import './test-element';

import type { ListenerInterface } from '@alwatr/signal';
import type { TemplateResult } from 'lit';

// Get color
import { glod, Orange, background, OrangeHover } from "../color"

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

const list = [
  { name: "الصفحة الرئيسية", link: "/", },
  { name: "معلومات عنا", link: "/about" },
  { name: html`<img class="logo" src="/images/logo.png" title="Logo" alt="Logo">`, link: "/" },
  { name: "الصفحة الرئيسية", link: "/home" },
  { name: "الصفحة الرئيسية", link: "/" },
]
/**
 * APP PWA Home Page Element
 *
 * ```html
 * <page-home></page-home>
 * ```
 */
@customElement('page-home')
export class PageHome extends AppElement {
  static override styles = css`
      p,img,div,span,h1,h2,h3,h4,h5,h6{
      margin:0;
      padding:0;
    }
    p,h1,h2,h3,h4,h5,h6{
      font-family: 'Tajawal', sans-serif;
    }
    :host {
      display: flex;
      flex-direction: column;
    }
    .background_homePage{
      width:100%;
      height:100vh;
      background:url(images/background-homePage.jpg) no-repeat center center / cover;
      position:relative;
    }
    .filter_background{
      width:100%;
      height:100vh;
      position:absolute;
      top:0;
      right:0;
      background-color:#00000081;
      transition:200ms opacity;      
      opacity:0;
      animation: input 1.5s linear 300ms  normal 1 forwards;
    }
    @keyframes input {
      from{
        opacity:0
      }
      to{
        opacity:1
      }
    }
    .filter_background{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
    }
    .filter_background>header{
      width:100%;
      position:absolute;
      top:0;
      display:flex;
      justify-content:center;
    }
    .menu{
      width:50%;
      display:flex;
      justify-content:space-around;
      align-items:center;
      list-style:none;

    }
    .menu>li>a{
      color:#fff;
      font-size:1em;
      text-decoration: none;
      transition:200ms linear color;
    }
    .menu>li>a:hover,.menu>li>a:active{
      color:${glod}
    }
    .logo{
      width:7em;
    }
    .titel{
      font-size:7vw;
      color:${glod};
    }

    .box-scroll{
      position:absolute;
      bottom:4em;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
    }
    .scroll{
      width:1.2em;
      height:2.5em;
      border-radius:15px;
      border:2px solid ${glod};
      display:flex;
      justify-content:center;
      position:relative;
    }
    .scroll>span{
      width:.6em;
      height:.6em;
      position:absolute;
      top:.1em;
      border-radius:50%;
      background-color:${glod};
      animation: scroll 2s linear 300ms  normal infinite forwards;
    }
    @keyframes scroll {
      from{
         top: .1em;
         opacity: 1;
      }
      to{
         top: 100%;
         opacity: 0;
      }
    }
    .box-scroll>p{
      color:${glod};
      font-size:1em;
    }
    /* css about */
    .about{
      width:100%;
      min-height:40em;
      background:url(images/background-part-about-home-page.png) no-repeat top right ;
      display:flex;
      justify-content:center;
      flex-wrap:wrap;
      align-items:center;
    }
    .image_about{
      width:36vw;
      max-width:28em;
      height:30vh;
      border:6px solid ${Orange};
      border-radius:10px;
      position:relative;
      margin-left:10em;
    }
    .image_about>img{
      width:40vw;
      max-width:30em;
      height:35vh;
      max-height:20em;
      position:absolute;
      bottom:2em;
      right:2em;
      border-radius:4px;
    }
    .text-about{
      width:30em;
      display:flex;
      flex-direction:column;
      align-items:flex-end;
      justify-content:center;
      z-index:1;
    }
    .perfix_titel{
      color:${Orange};
      font-size:25px;
    }
    .text-about>h2{
      font-size:2.5em;
      margin:.3em 0;
    }
    .text-about-two{
      font-size:20px;
      direction:rtl;
      text-align: justify;
    }
    .button-about{
      width:8em;
      height:2.3em;
      text-decoration:none;
      color:#fff;
      font-size:15px;
      border-radius:4px;
      display:flex;
      justify-content:center;
      align-items:center;
      margin-top:1em;
      background-color:${Orange};
      transition:200ms filter;
    }
    .button-about:hover{
      filter: contrast(120%);
    }

    .date{
      width:100%;
      height:45em;
      background:url(images/background-part-about.jpg) no-repeat center center / cover;
      position:relative;
      display:flex;
      justify-content:center;
      align-items:center;
      margin-bottom:20em;
    }
    .Circle_part_date{
      width:33em;
      height:33em;
      border-radius:50%;
      background-color:${background};
      position:absolute;
      bottom:-22em;
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-items:center;
    }
    .time{
      font-size:80px;
      font-weight:500;
    }
    .day{
      font-size:30px;
      font-weight:300;
      text-align: center;
    }
    .border_circle_part_date{
      width:58vw;
      height:50vw;
      min-width: 50em;
      min-height: 50em;
      border:2px solid ${background};
      border-radius:50%;
      position:absolute;
      bottom:-25vw;
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-items:center;
    }
    .border_circle_part_date>div{
      height:10em;
      display:flex;
      align-items:center;
    }
    .border_circle_part_date>div>div{
      width:7em;
      font-size:20px;
      height:7em;
      background:#fff;
      border-radius:50%;
      display:flex;
      justify-content:center;
      cursor:pointer;
      align-items:center;
      transition: 300ms linear outline, 300ms linear background-color,300ms linear color;
      outline:0px solid ${OrangeHover}
    }
    .border_circle_part_date>div>div:hover,#active_circle{
      background-color:${OrangeHover};
      outline: 2px solid ${OrangeHover};
      outline-offset: 9px;
      color:#fff;
    }
    .circle1{
      width:60vw;
      justify-content:center;
      position:absolute;
      top:-5em;
    }
    .circle2{
      width:47vw;
      min-width: 44em;
      justify-content:space-between;
      position:absolute;
      top:3em;
    }
    .circle3{
      width:62vw;
      min-width: 58em;
      justify-content:space-between;
      position:absolute;
      top:16em;
    }
  
    @media only screen and (max-width: 768px) {
      .filter_background>header{
        display:none;
      }
      .about{
        margin-top:1em;
      }
      .text-about{
        order:1;
        align-items:center;
      }
      .image_about{
        margin:0;
        height:auto;
        display:flex;
        justify-content:center;
        align-items:center;
      }
      .image_about>img{
        width:100%;
        height:auto;
        position:static;
      }
      .border_circle_part_date{
        width:auto;
        height:auto;
        min-height:auto;
        min-width:auto;
        flex-direction:row-reverse;
        justify-content:center;
        border:none;
        position:static;
        flex-wrap:wrap;
      }
      .border_circle_part_date > div {
        width:auto;
        position:static;
        min-width:auto;
        flex-wrap:wrap;
      }
      .border_circle_part_date > div >div{
        border-radius:10px;
        margin:.5em;
      }
      .date{
        align-items:flex-start;
        margin:1em 0;
        height:auto;
        min-height: 42em;
      }
      .Circle_part_date{
        width: 52vw;
        height: 26vw;
        min-width:23em;
        min-height: 10em;
        bottom: 0;
        border-radius:250px 250px 0 0;

      }
      @media only screen and (max-width: 320px) {
      .Circle_part_date{
        width:100vw;
        min-width:auto;
      }
      }

    }
  `;

  protected _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    // this._listenerList.push(router.signal.addListener(() => this.requestUpdate()));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html`
      <div class="background_homePage">
        <div class="filter_background">
          <!-- Menu -->
          <header>
            <ul class="menu">
              ${list.map((item) => {
       return html`<li><a href="/${item.link}">${item.name}</a></li>`
     })}
            </ul>
          </header>
          <h1 title="titel" class="titel">العتبة العسكرية المقدسة</h1>
          <!-- Scroll -->
          <div class="box-scroll">
            <div class="scroll"><span></span></div>
            <p>يرجى التمرير</p>
          </div>
        </div>
      </div>
      <!-- Part About -->
      <div class="about">
        <div class="text-about">
          <p class="perfix_titel">تاريخ</p>
          <h2>سامراء وأئمة سامراء</h2>
          <img src="/images/border1.png" alt="border" title="border" />
          <p class="text-about-two">
            يعود أصل اسم (سامراء) في أصله إلى سائر الأسماء الآرامية بالعراق التي كانت تنتهي بحرف الألف المقصور مثل (كربلا)
            (بعقوبا) وفي مراحل تاريخية لاحقة من تاريخ اللغة العربية التي ورثت تلك التسميات لبعض مدنها في أرض الرافدين أضيفت
            علامة الهمزة إلى مفردتي (سامرا) و(كربلا) فأصبحتا (سامراء وكربلاء) في حين استبدل حرف الألف بحرف التاء من اسم مدينة
            بعقوبا فأضحى يكتب (بعقوبة) ومعلوم أن مدينة سامراء في معظم تاريخ الدولة العباسية كانت باهرة في...
          </p>
          <a href="/about" class="button-about">اقرأ أكثر</a>
      
        </div>
        <div class="image_about">
          <img src="/images/background-homePage.jpg" alt="about" title="about" />
        </div>
      </div>
      <!-- Part Date -->
      <div class="date">
        <div class="border_circle_part_date">
          <div class="circle1">
            <div>نداء ليلية</div>
          </div>
          <div class="circle2">
            <div>نداء الصباح</div>
            <div>نداء ليلية</div>
          </div>
          <div class="circle3">
            <div>نداء الصباح</div>
            <div>نداء ليلية</div>
          </div>
        </div>
        <div class="Circle_part_date">
          <p class="time">${this.__time.hours}:${this.__time.minutes}</p>
          <p class="day">${this.__day}</p>
        </div>
      </div>
      </div>
    `;
  }
  @state()
  protected __time: any = { hours: "00", minutes: "00" }
  @state()
  protected __day: string = "فی السّبت ، ۱۲ جمادی الثانی"



}
