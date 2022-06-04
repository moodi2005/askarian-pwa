import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {state} from 'lit/decorators/state.js';
import {repeat} from 'lit/directives/repeat.js';

import {homePage, menu, times} from '../types';

import {AppElement} from '../app-debt/app-element';

import type {ListenerInterface} from '@alwatr/signal';
import type {TemplateResult} from 'lit';

// Get color
import {glod, Orange, background, OrangeHover, Gray} from '../color';
import {getJson} from '@alwatr/fetch';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

interface project_Image {
  name: string;
  link: string;
  image: string;
}
const project_img: Array<project_Image> = [
  {name: 'الصفحة الرئيسية', link: '/', image: '/images/background-part-about.jpg'},
  {name: 'الصفحة الرئيسية', link: '/', image: '/images/background-part-about.jpg'},
];

interface project {
  name: string;
  link: string;
  number: number;
}
const project: Array<project> = [
  {name: 'الصفحة الرئيسية', link: '/', number: 0},
  {name: 'الصفحة الرئيسية', link: '/', number: 0},
];

interface post {
  titel: string;
  description: string;
  link: string;
  image: string;
}
const posts: Array<post> = [
  {titel: 'خبر الاول', description: 'توضيحات', link: '/', image: '/images/background-homePage.jpg'},
  {titel: 'خبر الاول', description: 'توضيحات', link: '/', image: '/images/background-homePage.jpg'},
  {titel: 'خبر الاول', description: 'توضيحات', link: '/', image: '/images/background-homePage.jpg'},
  {titel: 'خبر الاول', description: 'توضيحات', link: '/', image: '/images/background-homePage.jpg'},
];

@customElement('page-home')
export class PageHome extends AppElement {
  static override styles = css`
    p,
    img,
    div,
    span,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    input {
      margin: 0;
      padding: 0;
    }
    :host {
      display: flex;
      flex-direction: column;
    }
    .background_homePage {
      width: 100%;
      height: 100vh;
      background: url(images/background-homePage.jpg) no-repeat center center / cover;
      position: relative;
    }
    .filter_background {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #00000081;
      transition: 200ms opacity;
      opacity: 0;
      animation: input 1.5s linear 300ms normal 1 forwards;
    }
    @keyframes input {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .filter_background {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .filter_background > .header {
      width: 100%;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
    }
    .menu {
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      list-style: none;
    }
    .menu > li > a {
      color: #fff;
      font-size: 1em;
      text-decoration: none;
      transition: 200ms linear color;
    }
    .menu > li > a:hover,
    .menu > li > a:active {
      color: ${glod};
    }
    .logo {
      width: 7em;
    }
    .titel {
      font-size: 5vw;
      color: ${glod};
    }

    .box-scroll {
      position: absolute;
      bottom: 4em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .scroll {
      width: 1.2em;
      height: 2.5em;
      border-radius: 15px;
      border: 2px solid ${glod};
      display: flex;
      justify-content: center;
      position: relative;
    }
    .scroll > span {
      width: 0.6em;
      height: 0.6em;
      position: absolute;
      top: 0.1em;
      border-radius: 50%;
      background-color: ${glod};
      animation: scroll 2s linear 300ms normal infinite forwards;
    }
    @keyframes scroll {
      from {
        top: 0.1em;
        opacity: 1;
      }
      to {
        top: 100%;
        opacity: 0;
      }
    }
    .box-scroll > p {
      color: ${glod};
      font-size: 1em;
    }
    /* css about */
    .about {
      width: 100%;
      min-height: 40em;
      background: url(images/background-part-about-home-page.png) no-repeat top right;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
    }
    .image_about {
      width: 36vw;
      max-width: 28em;
      height: 30vh;
      border: 6px solid ${Orange};
      border-radius: 10px;
      position: relative;
      margin: 0 10em;
    }
    .image_about > img {
      width: 40vw;
      max-width: 30em;
      height: 35vh;
      max-height: 20em;
      position: absolute;
      bottom: 2em;
      right: 2em;
      border-radius: 4px;
    }
    .text-about {
      width: 30em;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      z-index: 1;
    }
    .perfix_titel {
      color: ${Orange};
      font-size: 25px;
    }
    .text-about > h2 {
      font-size: 2.5em;
      margin: 0.3em 0;
    }
    .text-about-two {
      font-size: 20px;
      direction: rtl;
      text-align: justify;
    }
    .button-about {
      width: 8em;
      height: 2.3em;
      text-decoration: none;
      color: #fff;
      font-size: 15px;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1em;
      background-color: ${Orange};
      transition: 200ms filter;
    }
    .button-about:hover {
      filter: contrast(120%);
    }

    .date {
      width: 100%;
      height: 45em;
      background: url(images/background-part-about.jpg) no-repeat center center / cover;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5em;
    }
    .Circle_part_date {
      width: 27em;
      height: 12em;
      border-radius: 20vw 20vw 0 0;
      background-color: ${background};
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      z-index: 1;
    }
    .time {
      font-size: 80px;
      font-weight: 500;
    }
    .day {
      font-size: 30px;
      font-weight: 300;
      text-align: center;
    }
    .border_circle_part_date {
      width: 58vw;
      height: 45vw;
      min-width: 50em;
      min-height: 29em;
      max-height: 30em;
      border: 2px solid ${background};
      border-radius: 110vw 110vw 0 0;
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
    .border_circle_part_date > div {
      height: 10em;
      display: flex;
      align-items: center;
    }
    .border_circle_part_date > div > div {
      width: 8em;
      font-size: 18px;
      height: 8em;
      background: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      align-items: center;
      transition: 300ms linear outline, 300ms linear background-color, 300ms linear color;
      outline: 0px solid ${OrangeHover};
    }
    .border_circle_part_date > div > div:hover,
    #active_circle {
      background-color: ${OrangeHover};
      outline: 2px solid ${OrangeHover};
      outline-offset: 9px;
      color: #fff;
    }
    .circle1 {
      width: 60vw;
      justify-content: center;
      position: absolute;
      top: -5em;
    }
    .circle2 {
      width: 47vw;
      min-width: 44em;
      justify-content: space-between;
      position: absolute;
      top: 3em;
    }
    .circle3 {
      width: 62vw;
      min-width: 58em;
      justify-content: space-between;
      position: absolute;
      top: 16em;
    }
    /* Styles Part Project */
    .part-project {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .box-project {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      margin: 2em;
    }
    .img-project {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .item-project-img {
      width: 40em;
      height: 15em;
      display: flex;
      justify-content: center;
      overflow: hidden;
      position: relative;
      text-decoration: none;
      margin: 0.5em 0;
    }
    .item-project-img > p {
      position: absolute;
      font-size: 30px;
      bottom: -30px;
      color: ${Orange};
      transition: 300ms linear bottom;
    }
    .item-project-img > img {
      width: 100%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 15px;
    }
    .item-project-img:hover > p {
      bottom: 3em;
    }
    .project {
      width: 20em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .item-project {
      width: 20em;
      height: 3em;
      border: 3px solid ${Orange};
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.7em;
      text-decoration: none;
      padding: 0 0.5em;
      box-sizing: border-box;
      transition: 300ms linear box-shadow;
    }
    .item-project:hover {
      box-shadow: 0 0 15px 0 ${Orange};
    }
    /* Styles vicarious shrine */
    .part-vicarious-shrine {
      width: 100%;
      min-height: 16em;
      background: url(/images/background-part-vicarious-shrine.jpg) no-repeat center center / cover;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      margin: 10em 0 1em 0;
    }
    .part-vicarious-shrine > img {
      position: absolute;
      bottom: 0;
      left: 5vw;
    }
    .part-vicarious-shrine > div {
      padding: 0 1em;
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      align-items: flex-start;
      flex-direction: column;
    }
    .part-vicarious-shrine > div > h2 {
      font-size: 30px;
    }
    .part-vicarious-shrine > div > p {
      text-align: start;
      color: ${Gray};
    }
    .part-vicarious-shrine > div > form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .part-vicarious-shrine > div > form > input[type='text'] {
      width: 25em;
      height: 3.5em;
      text-align: start;
      border: 2px solid ${Orange};
      border-radius: 7px;
      padding: 0 0.6em;
      margin: 0.5em;
      outline: none;
    }
    .part-vicarious-shrine > div > form > input[type='submit'] {
      width: 10em;
      height: 2.5em;
      border: 2px solid ${Orange};
      border-radius: 7px;
      padding: 0 0.6em;
      margin: 0.5em;
      outline: none;
      background-color: transparent;
      color: #fff;
      cursor: pointer;
      transition: 300ms linear background-color;
    }
    .part-vicarious-shrine > div > form > input[type='submit']:hover {
      background-color: ${Orange};
    }
    /* Styles Part Ports */
    .part-posts {
      width: 100%;
      margin-bottom: 5em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .part-posts > div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 1em 0;
      width: 100%;
    }

    .part-posts > div > a {
      width: 17vw;
      min-height: 22em;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      text-decoration: none;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      margin: 0 0.8em;
      box-shadow: 0 0 20px 0 #000000;
    }
    .part-posts > div > a > h4 {
      font-size: 30px;
      color: black;
    }
    .part-posts > div > a > img {
      width: 17vw;
    }

    @media only screen and (max-width: 1040px) {
      .image_about {
        margin-top: 5em;
      }
      .about {
        margin: 2em 0;
      }
    }
    @media only screen and (max-width: 768px) {
      .filter_background > .header {
        display: none;
      }
      .about {
        margin-top: 1em;
      }
      .text-about {
        width: 100vw;
        order: 1;
        align-items: center;
      }
      .image_about {
        margin: 0;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .image_about > img {
        width: 100%;
        height: auto;
        position: static;
      }
      .border_circle_part_date {
        width: auto;
        height: auto;
        min-height: auto;
        min-width: auto;
        flex-direction: row-reverse;
        justify-content: center;
        border: none;
        position: static;
        flex-wrap: wrap;
      }
      .border_circle_part_date > div {
        width: auto;
        position: static;
        min-width: auto;
        flex-wrap: wrap;
      }
      .border_circle_part_date > div > div {
        border-radius: 10px;
        margin: 0.5em;
      }
      .date {
        align-items: flex-start;
        margin: 1em 0;
        height: auto;
        min-height: 42em;
      }
      .time {
        font-size: 60px;
      }
      .Circle_part_date {
        width: 52vw;
        height: 26vw;
        min-width: 22em;
        min-height: 10em;
        bottom: 0;
        border-radius: 250px 250px 0 0;
      }
      .item-project-img {
        width: 80vw;
        height: 10em;
      }
      .item-project-img > p {
        bottom: 2em;
      }
      .part-vicarious-shrine > img {
        left: 0em;
      }
      .part-posts > div > a {
        width: 40%;
        margin: 2em 0.5em;
      }
      .part-posts > div > a > img {
        width: 40vw;
      }

      @media only screen and (max-width: 676px) {
        .part-vicarious-shrine > img {
          display: none;
        }
        .part-vicarious-shrine > div {
          width: 100%;
          padding: 0;
        }
        .part-vicarious-shrine > div > h2 {
          text-align: center;
        }
        .part-vicarious-shrine > div > form > input[type='text']:nth-child(1) {
          margin: 0;
        }
        .part-posts > div > a {
          width: 100%;
          margin: 2em 0.5em;
        }
        .part-posts > div > a > img {
          width: 100vw;
        }
        .image_about {
          width: 95%;
        }
      }
      @media only screen and (max-width: 320px) {
        .Circle_part_date {
          width: 100vw;
          min-width: auto;
        }
        .part-project {
          margin: 6em 0;
        }
        .part-project > h2 {
          text-align: center;
        }
        .part-vicarious-shrine > div > form > input[type='text'] {
          width: 99%;
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
          <div class="header">
            <ul class="menu">
              ${repeat(this.config.menu, (item: menu, index: number) => {
                if (this.config.menu.length / 2 === index + 1) {
                  return html`
                    <li><a href="${item.link}">${item.name}</a></li>
                    <li>
                      <a href="/"><img class="logo" src="/images/logo.png" title="Logo" alt="Logo" /></a>
                    </li>
                  `;
                } else {
                  return html` <li><a href="${item.link}">${item.name}</a></li>`;
                }
              })}
            </ul>
          </div>
          <h1 title="titel" class="titel">${this.config.titel}</h1>
          <!-- Scroll -->
          <div class="box-scroll">
            <div class="scroll"><span></span></div>
            <p>يرجى التمرير</p>
          </div>
        </div>
      </div>
      <!-- Part About -->
      <div class="about">
        <div class="image_about">
          <img src="/images/background-homePage.jpg" loading="lazy" alt="about" title="about" />
        </div>
        <div class="text-about">
          <p class="perfix_titel">${this.config.part_about?.titelTop}</p>
          <h2>${this.config.part_about?.titel}</h2>
          <img src="/images/border1.png" alt="border" loading="lazy" title="border" />
          <p class="text-about-two">${this.config.part_about?.description}</p>
          <a href="/about" class="button-about">${this.config.part_about?.button}</a>
        </div>
      </div>
      <!-- Part Date -->
      <div class="date">
        <div class="border_circle_part_date">
          <div class="circle1">
            <div>${this.config.times[2]}<p>${this.times.Dhuhr.split('(')[0]}</p></div>
          </div>
          <div class="circle2">
            <div>${this.config.times[3]}<p>${this.times.Maghrib.split('(')[0]}</p></div>
            <div>${this.config.times[1]}<p>${this.times.Sunrise.split('(')[0]}</p></div>
          </div>
          <div class="circle3">
            <div>${this.config.times[4]}<p>${this.times.Midnight.split('(')[0]}</p></div>
            <div>${this.config.times[0]}<p>${this.times.Fajr.split('(')[0]}</p></div>
          </div>
        </div>
        <div class="Circle_part_date">
          <p class="time">${new Date().getUTCHours() + 3}:${new Date().getUTCMinutes()}</p>
          <p class="day">${this.__day}</p>
        </div>
      </div>
      </div>
      <!-- Part Project -->
      <div class="part-project">
        <h2>${this.config.projectPart?.titel}</h2>
        <p>${this.config.projectPart?.description}</p>
        <img src="/images/border1.png" alt="border" loading="lazy" title="border" />
        <div class="box-project">
          <div class="img-project">
            ${repeat(
              project_img,
              (item) => html`
                <a class="item-project-img" href="${item.link}">
                  <img src=${item.image} alt="image-${item.name}" title="image-${item.name}" loading="lazy" />
                  <p>${item.name}</p>
                </a>
              `
            )}
          </div>
          <div class="project">
            ${repeat(
              project,
              (item) => html`
                <a class="item-project" href="${item.link}">
                  <p>${item.name}</p>
                  <p>${item.number}</p>
                </a>
              `
            )}
          </div>
        </div>
      </div>
      <!-- Part vicarious shrine -->
      <div class="part-vicarious-shrine">
        <div>
          <h2>${this.config.vicariousPart?.titel}</h2>
          <p>${this.config.vicariousPart?.description}</p>
          <form>
            <input type="text" minlength="5" required placeholder="${this.config.vicariousPart?.input}"
              oninvalid="this.setCustomValidity('${
                this.config.vicariousPart?.oninvalid
              }')" oninput="setCustomValidity('')" />
            <input type="submit" value="${this.config.vicariousPart?.input}" />
          </form>
        </div>
        <img src="/Images/image-part-vicarious-shrine.png" alt="vicarious-shrine" title="vicarious-shrine" loading="lazy" />
      </div>
      <!-- Part Posts -->
      <div class="part-posts">
        <h2>${this.config.news?.titel}</h2>
        <img src="/images/border1.png" alt="border" title="border" />
        <div>
          ${repeat(
            posts,
            (item) => html`
              <a href="${item.link}">
                <img src=${item.image} alt="image post ${item.titel}" title="image post ${item.titel}" loading="lazy" />
                <h4>${item.titel}</h4>
                <p>${item.description}</p>
              </a>
            `
          )}
        </div>
      </div>
    `;
  }
  @state()
  protected __day: string = 'فی السّبت ، ۱۲ جمادی الثانی';
  @property({attribute: true, type: Object})
  config: homePage | any = {};
  @property({attribute: false, type: Object})
  times: times = {
    Fajr: '00:00',
    Sunrise: '00:00',
    Dhuhr: '00:00',
    Asr: '00:00',
    Sunset: '00:00',
    Maghrib: '00:00',
    Isha: '00:00',
    Imsak: '00:00',
    Midnight: '00:00',
  };

  protected override async firstUpdated() {
    const day: number = new Date().getUTCDay();
    let json: any = localStorage.getItem('times');
    if (
      !json ||
      JSON.parse(json).data[day].date.gregorian.month.number === new Date().getUTCMonth() + 1 ||
      JSON.parse(json).date.gregorian.year == new Date().getUTCFullYear()
    ) {
      const get: any = await getJson('https://api.aladhan.com/v1/calendar?latitude=34.19883&longitude=43.873345');
      localStorage.setItem('times', JSON.stringify(get));
      json = get;
    } else {
      json = JSON.parse(json);
    }

    const times: any = json,
      date = times.data[day].date.hijri;
    this.times = times.data[day].timings;
    this.__day = `فی ${date.weekday.ar} , ${date.day} ${date.month.ar}`;
  }
}
