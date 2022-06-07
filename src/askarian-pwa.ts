import {getJson} from '@alwatr/fetch';
import {router} from '@alwatr/router';
import {SignalInterface} from '@alwatr/signal';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {state} from 'lit/decorators/state.js';
import {repeat} from 'lit/directives/repeat.js';

import {AppElement} from './app-debt/app-element';
import {Background, Orange, Gray} from './color';
import {config} from './types';

import './elements/page-home';
import './elements/page-about';
import './elements/page-live';
import './elements/header-element';
import './elements/page-panorama';
import './elements/page-articles';
import './elements/page-post';
import './elements/page-404';

import type {RoutesConfig} from '@alwatr/router';
import type {ListenerInterface} from '@alwatr/signal';
import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'askarian-pwa': AskarianPwa;
  }
}

// Language
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lang: any = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ar';

// get config and menu and footer
const TextConfig: string | null = localStorage.getItem(`config-${lang}`);
let config: config;
if (!TextConfig) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const get: any = await getJson(`/json/config-${lang}.json`);
  localStorage.setItem(`config-${lang}`, JSON.stringify(config));
  config = get;
} else {
  config = JSON.parse(TextConfig);
}

@customElement('askarian-pwa')
export class AskarianPwa extends AppElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: ${Background};
      position: relative;
    }
    *,
    *::placeholder {
      margin: 0;
      padding: 0;
      font-family: 'Tajawal', sans-serif;
      box-sizing: border-box;
    }
    * > input::placeholder .page-container {
      position: relative;
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0%;
    }

    nav {
      display: flex;
      padding: 12px 16px;
      background-color: #333;
    }

    nav .nav__item {
      padding: 8px;
      color: #fff;
      transition: color 256ms ease, Background-color 256ms ease;
      border-radius: 4px;
      text-decoration: none;
    }

    nav .nav__item.active {
      transition: color 256ms 128ms ease, Background-color 256ms 128ms ease;
      background-color: #fff;
      color: #000;
    }
    footer {
      width: 100%;
      min-height: 40em;
      background: url(/images/Background-footer.jpg) no-repeat center center / cover;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex-wrap: wrap;
    }
    .border-footer {
      position: absolute;
      top: 0;
      width: 100%;
    }
    .menu_footer {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .menu_footer > div {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .menu_footer > div > div {
      width: 20em;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .menu_footer > div > div > h6 {
      font-size: 25px;
      color: ${Orange};
    }
    .menu_footer > div > div > a,
    .menu_footer > div > div > p {
      text-decoration: none;
      color: #fff;
      margin: 0.5em 0;
      cursor: pointer;
      transition: 300ms linear color;
    }
    .menu_footer > div > a:hover {
      color: ${Orange};
    }
    .copy-right {
      width: 100%;
      height: 2em;
      text-align: center;
      color: #fff;
      position: absolute;
      bottom: 1em;
      border-top: 1px solid ${Gray};
    }
    header-element {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    @media only screen and (max-width: 768px) {
      .menu_footer > div > div {
        width: 100%;
      }
      footer {
        min-height: 47em;
      }
    }
  `;

  constructor() {
    super();
    router.initial();
    // Set language
    if (location.search.split('lang=')[1]) {
      localStorage.setItem('language', location.search.split('lang=')[1]);
    }
    if (lang === 'en') {
      document.dir = 'ltr';
    }
  }

  @state()
  protected _hideNavigation = true;

  protected _hideNavigationSignal = new SignalInterface('hide-navigation');

  protected _activePage = 'home';

  protected _routes: RoutesConfig = {
    map: (route) => (this._activePage = route.sectionList[0]?.toString().trim() || 'home'),
    list: {
      home: {
        render: () => html`<page-home .config=${config.homePage} lang="${lang}"></page-home>`,
      },
      about: {
        render: () => html`<page-about lang="${lang}"></page-about>`,
      },
      live: {
        render: () => html`<page-live .config=${config.live}></page-live>`,
      },
      panorama: {
        render: () => html`<page-panorama .config=${config.panorama}></page-panorama>`,
      },
      blog: {
        render: () => html`<page-articles .config=${config.articles} lang="${lang}"></page-articles>`,
      },
      post: {
        render: () => html`<page-post titelSite=${config.titelSite} lang="${lang}"></page-post>`,
      },
      news: {
        render: () => html`<page-post titelSite=${config.titelSite} lang="${lang}"></page-post>`,
      },
      project: {
        render: () => html`<page-post titelSite=${config.titelSite} lang="${lang}"></page-post>`,
      },
      404: {
        render: () => html`<page-404 titelSite=${config.titelSite} lang="${lang}"></page-404>`,
      },
    },
  };

  protected _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this._listenerList.push(
        router.signal.addListener(
            (route) => {
              this._logger.logMethodArgs('routeChanged', {route});
              this._activePage = route.sectionList[0]?.toString().trim() || 'home';
              this.requestUpdate();
              // set titel page
              const page = config.menu.filter(
                  (item) => item.link === `/${this._activePage === 'home' ? '' : this._activePage}`,
              )[0];
              if (!(page === undefined)) document.title = `${page.titel}  | ${config.titelSite}  `;
              else document.title = `${config.titelSite}`;
            },
            {receivePrevious: true},
        ),
        this._hideNavigationSignal.addListener((_hideNavigation) => {
          this._hideNavigation = _hideNavigation;
        }),
    );
    this._hideNavigationSignal.dispatch(false); // @TODO: make signal file and base config
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html`
      <header-element
        path=${this._activePage}
        .config=${config}
        lang="${lang}"
        ?hidden_head=${this._activePage === 'home'}
      ></header-element>
      <main class="page-container">${router.outlet(this._routes)}</main>
      <footer>
        <img src="/images/footer_border.png" class="border-footer" loading="lazy" alt="border footer" />
        <div class="menu_footer">
          <div>
            <div>
              <h6>${config.footer.name[0]}</h6>
              <img src="/images/border1.png" loading="lazy" alt="border footer" />
              ${repeat(config.footer.one, (item) => html` <a href=${item.link}>${item.name}</a> `)}
            </div>
            <div>
              <h6>${config.footer.name[1]}</h6>
              <img src="/images/border1.png" loading="lazy" alt="border footer" />
              ${repeat(config.footer.two, (item) => html` <a href=${item.link}>${item.name}</a> `)}
            </div>
            <div>
              <h6>${config.footer.name[2]}</h6>
              <img src="/images/border1.png" loading="lazy" alt="border footer" />
              ${repeat(config.footer.three, (item) => html` <a href=${item.link}>${item.name}</a> `)}
            </div>
            <div>
              <h6>اتصل بنا</h6>
              <img src="/images/border1.png" loading="lazy" alt="border footer" />
              <p>تذكير: ضع الأيقونة</p>
            </div>
          </div>
        </div>
        <p class="copy-right">
          Portions of this content are ©1998–2022 by individual Hussain Holy Askarian IT contributors.
        </p>
      </footer>
    `;
  }
}
