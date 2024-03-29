import {getJson} from '@alwatr/fetch';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {state} from 'lit/decorators/state.js';
import {repeat} from 'lit/directives/repeat.js';

import {AppElement} from '../app-debt/app-element';
import {article, homePage, menu, NewsProjects, ProjectList, project, times} from '../types';

// Get color

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

// Get News and Projects
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
    .Background_homePage {
      width: 100%;
      height: 100vh;
      min-height: 30.9em;
      background: url(images/Background-homePage.jpg) no-repeat center center / cover;
      position: relative;
    }
    .filter_Background {
      width: 100%;
      height: 100vh;
      min-height: 100%;
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
    .filter_Background {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .filter_Background > .header {
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
      color: var(--askarian-glod, black);
    }
    .logo {
      width: 7em;
    }
    .titel {
      font-size: 5vw;
      color: var(--askarian-glod, red);
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
      border: 2px solid  var(--askarian-glod, black);
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
      background-color:  var(--askarian-glod, black);
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
      color:  var(--askarian-glod, black);
      font-size: 1em;
    }
    /* css about */
    .about {
      width: 100%;
      min-height: 40em;
      background: url(images/Background-part-about-home-page.png) no-repeat top right;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
    }
    .image_about {
      width: 36vw;
      max-width: 28em;
      height: 30vh;
      border: 6px solid  var(--askarian-orange, black);
      border-radius: 10px;
      position: relative;
      margin: 0 5em;
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
      color: var(--askarian-orange, black);
      font-size: 25px;
    }
    .text-about > h2 {
      font-size: 2.5em;
      text-align: center;
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
      background-color: var(--askarian-orange, black);
      transition: 200ms filter;
    }
    .button-about:hover {
      filter: contrast(120%);
    }

    .date {
      width: 100%;
      height: 45em;
      background: url(images/Background-part-about.jpg) no-repeat center center / cover;
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
      background-color: var(--askarian-background, black);
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
      border: 2px solid var(--askarian-background, black);
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
      text-align: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      align-items: center;
      transition: 300ms linear outline, 300ms linear Background-color, 300ms linear color;
      outline: 0px solid var(--askarian-orange-hover, black);
    }
    .border_circle_part_date > div > div:hover,
    #active_circle {
      background-color: var(--askarian-orange-hover, black);
      outline: 2px solid var(--askarian-orange-hover, black);
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
      justify-content: space-around;
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
      bottom: -100%;
      color: var(--askarian-orange, black);
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
      border: 3px solid var(--askarian-orange, black);
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
      box-shadow: 0 0 15px 0 var(--askarian-orange, black);
    }
    /* Styles vicarious shrine */
    .part-vicarious-shrine {
      width: 100%;
      min-height: 16em;
      background: url(/images/Background-part-vicarious-shrine.jpg) no-repeat center center / cover;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      margin: 10em 0 1em 0;
    }
    .box-two-vicarious-shrine {
      width: 18em;
      position: relative;
      height: 18em;
    }

    .box-two-vicarious-shrine > img {
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .box-vicarious-shrine {
      padding: 0 1em;
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      align-items: flex-start;
      flex-direction: column;
    }
    .box-vicarious-shrine > h2 {
      font-size: 30px;
    }
    .box-vicarious-shrine > p {
      text-align: start;
      color:var(--askarian-gray, black);
    }
    .box-vicarious-shrine > form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .box-vicarious-shrine > form > input[type='text'] {
      width: 25em;
      height: 3.5em;
      text-align: start;
      border: 2px solid var(--askarian-orange, black);
      border-radius: 7px;
      padding: 0 0.6em;
      margin: 0.5em;
      outline: none;
    }
    .box-vicarious-shrine > form > input[type='submit'] {
      width: 10em;
      height: 2.5em;
      border: 2px solid var(--askarian-orange, black);
      border-radius: 7px;
      padding: 0 0.6em;
      margin: 0.5em;
      outline: none;
      background-color: transparent;
      color: #fff;
      cursor: pointer;
      transition: 300ms linear Background-color;
    }
    .box-vicarious-shrine > form > input[type='submit']:hover {
      background-color: var(--askarian-orange, black);
    }
    /* Styles Part Ports */
    .part-news {
      width: 100%;
      margin-bottom: 5em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .part-news > div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 3em 0;
      width: 100%;
    }

    .part-news > div > a {
      width: 16vw;
      min-width: 14em;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      text-decoration: none;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      margin: 0 1em;
      box-shadow: 0 0 20px 0 #000000;
    }
    .part-news > div > a > h4 {
      font-size: 30px;
      color: black;
    }
    .part-news > div > a > img {
      width: 100%;
    }
    .part-news > div > a > p {
      color: var(--askarian-gray, black);
      text-align: start;
      margin: 1em 0.6em;
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
      .filter_Background > .header {
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
      .box-two-vicarious-shrine > img {
        left: 0em;
      }
      .part-news > div > a {
        width: 40%;
        margin: 2em 0.5em;
      }
      .part-news > div > a > img {
        width: 40vw;
      }

      @media only screen and (max-width: 676px) {
        .part-vicarious-shrine {
          justify-content: center;
        }
        .box-two-vicarious-shrine {
          display: none;
        }
        .box-vicarious-shrine {
          width: 100%;
          padding: 0;
        }
        .box-vicarious-shrine {
          align-items: center;
        }
        .box-vicarious-shrine > h2 {
          text-align: center;
        }
        .box-vicarious-shrine > form > input[type='text']:nth-child(1) {
          margin: 0;
        }
        .part-news > div > a {
          width: 80%;
        }
        .part-news > div > a > img {
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
        .box-vicarious-shrine > form > input[type='text'] {
          width: 99%;
        }
        .border_circle_part_date > div > div {
          width: 8em;
          font-size: 16px;
        }
      }
    }
  `;
  override render(): TemplateResult {
    return html`
      <div class="Background_homePage">
        <div class="filter_Background">
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
            <p>${this.config.text_scroll}</p>
          </div>
        </div>
      </div>
      <!-- Part About -->
      <div class="about">
        <div class="image_about">
          <img src="/images/Background-homePage.jpg" loading="lazy" alt="about" title="about" />
        </div>
        <div class="text-about">
          <p class="perfix_titel">${this.config.part_about.titelTop}</p>
          <h2>${this.config.part_about?.titel}</h2>
          <img src="/images/border1.png" alt="border" loading="lazy" title="border" />
          <p class="text-about-two">${this.config.part_about.description}</p>
          <a href="/about" class="button-about">${this.config.part_about.button}</a>
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
        <h2>${this.config.projectPart.titel}</h2>
        <p>${this.config.projectPart.description}</p>
        <img src="/images/border1.png" alt="border" loading="lazy" title="border" />
        <div class="box-project">
          <div class="img-project">
            ${
              this.news_projects ?
                repeat(
                    this.news_projects.project,
                    (item: project) => html`
                      <a class="item-project-img" href="/project/${item.link}">
                        <img src=${item.image} alt="image-${item.titel}" title="image-${item.titel}" loading="lazy" />
                        <p>${item.titel}</p>
                      </a>
                    `,
                ) :
                ''
}
          </div>
          <div class="project">
            ${
              this.news_projects ?
                repeat(
                    this.news_projects.project_list,
                    (item: ProjectList) => html`
                      <div class="item-project">
                        <p>${item.name}</p>
                        <p>${item.number}</p>
                      </div>
                    `,
                ) :
                ''
}
          </div>
        </div>
      </div>
      <!-- Part vicarious shrine -->
      <div class="part-vicarious-shrine">
        <div class="box-vicarious-shrine">
          <h2>${this.config.vicariousPart.titel}</h2>
          <p>${this.config.vicariousPart.description}</p>
          <form>
            <input type="text" minlength="5" required placeholder="${this.config.vicariousPart.input}"
              oninvalid="this.setCustomValidity('${
  this.config.vicariousPart.oninvalid
}')" oninput="setCustomValidity('')" />
            <input type="submit" value="${this.config.vicariousPart.button}" />
          </form>
        </div>
        <div class="box-two-vicarious-shrine">
          <img src="/Images/image-part-vicarious-shrine.png" alt="vicarious-shrine" 
          title="vicarious-shrine" loading="lazy" />
        </div>
      </div>
      <!-- Part News -->
      <div class="part-news">
        <h2>${this.config.news?.titel}</h2>
        <img src="/images/border1.png" alt="border" title="border" />
        <div>
          ${
            this.news_projects ?
              repeat(
                  this.news_projects.news,
                  (item: article) => html`
                    <a href="/news/${item.link}">
                      <img
                        src=${item.image}
                        alt="image post ${item.titel}"
                        title="image post ${item.titel}"
                        loading="lazy"
                      />
                      <h4>${item.titel}</h4>
                      <p>${item.description}</p>
                    </a>
                  `,
              ) :
              ''
}
        </div>
      </div>
    `;
  }
  @state()
  protected __day = 'فی السّبت ، ۱۲ جمادی الثانی';
  @property({attribute: true, type: Object})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: homePage | any = {};
  @property({attribute: true, type: Object})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    news_projects: NewsProjects | any = null;
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

  protected override async firstUpdated(): Promise<void> {
    // Get Times
    const TextTime: string | null = localStorage.getItem('times');
    const day: number = new Date().getUTCDay();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let JsonTime: any;
    if (
      !TextTime ||
      !(
        JSON.parse(TextTime).data[day].date.gregorian.month.number === new Date().getUTCMonth() + 1 ||
        JSON.parse(TextTime).data.gregorian.year == new Date().getUTCFullYear()
      )
    ) {
      const get: Record<string, symbol> = await getJson(
          'https://api.aladhan.com/v1/calendar?latitude=34.19883&longitude=43.873345',
      );
      localStorage.setItem('times', JSON.stringify(get));
      JsonTime = get;
    } else {
      JsonTime = JSON.parse(TextTime);
    }

    const date = JsonTime.data[day].date.hijri;
    this.times = JsonTime.data[day].timings;
    this.__day = `${this.lang === 'en' ? 'of' : 'فی'} ${date.weekday[this.lang === 'en' ? 'en' : 'ar']} , ${date.day} ${
      date.month[this.lang === 'en' ? 'en' : 'ar']
    }`;
    // Get News and Project
    let NewsJson: string = document.cookie;
    if (NewsJson.indexOf(this.lang) === -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const get: any = await getJson(`/json/news-projects-${this.lang}.json`);
      setCookie(`news-projects-${this.lang}`, JSON.stringify(get), 1);
      NewsJson = get;
    } else {
      NewsJson = JSON.parse(getCookie(`news-projects-${this.lang}`));
    }
    this.news_projects = NewsJson;
    this.requestUpdate();
  }
}
