import { router } from '@alwatr/router';
import { SignalInterface } from '@alwatr/signal';
import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators/state.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';


import { AppElement } from './app-debt/app-element';
import { mainNavigation } from './config';

import './elements/page-home';
import './elements/page-about';
import "./elements/header-element";


import type { RoutesConfig } from '@alwatr/router';
import type { ListenerInterface } from '@alwatr/signal';
import type { TemplateResult } from 'lit';

// import colors
import { background, Orange, Gray } from "./color"

declare global {
  interface HTMLElementTagNameMap {
    'askarian-pwa': AskarianPwa;
  }
}

interface menu_footer {
  name: string,
  link: string
}
const footer: { name: Array<string>; one: Array<menu_footer>; two: Array<menu_footer>; three: Array<menu_footer> } = {
  name: [
    "Menu1",
    "Menu2",
    "Menu3",
  ],
  one: [
    { name: "link 1", link: "/" },
    { name: "link 2", link: "/" },
    { name: "link 3", link: "/" },
    { name: "link 4", link: "/" }
  ],
  two: [
    { name: "link 1", link: "/" },
    { name: "link 2", link: "/" },
    { name: "link 3", link: "/" },
    { name: "link 4", link: "/" }
  ],
  three: [
    { name: "link 1", link: "/" },
    { name: "link 2", link: "/" },
    { name: "link 3", link: "/" },
    { name: "link 4", link: "/" }
  ]
}

/**
 * APP PWA Root Element
 *
 * ```html
 * <app-index></app-index>
 * ```
 */
@customElement('askarian-pwa')
export class AskarianPwa extends AppElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: ${background};
    }
    *{
      margin:0;
      padding:0;
      font-family: 'Tajawal', sans-serif;
      box-sizing:border-box;
    }
    .page-container {
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
      transition: color 256ms ease, background-color 256ms ease;
      border-radius: 4px;
      text-decoration:none;
    }

    nav .nav__item.active {
      transition: color 256ms 128ms ease, background-color 256ms 128ms ease;
      background-color: #fff;
      color: #000;
    }
    footer{
      width:100%;
      min-height:40em;
      background:url(/images/background-footer.jpg) no-repeat center center /cover;
      position:relative;
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      flex-wrap:wrap;
    }
    .border-footer{
      position:absolute;
      top:0;
      width:100%;
    }
    .menu_footer{
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
    }
    .menu_footer>div{
      width:100%;
      display:flex;
      justify-content:space-around;
      align-items:flex-start;
      flex-wrap:wrap;
    }
    .menu_footer>div>div{
      width:20em;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
    }
    .menu_footer>div>div>h6{
      font-size:25px;
      color:${Orange};
    }
    .menu_footer>div>div>a,.menu_footer>div>div>p{
      text-decoration:none;
      color:#fff;
      margin:.5em 0;
      cursor:pointer;
      transition:300ms linear color;
    }
    .menu_footer>div>a:hover{
      color:${Orange};
    }
    .copy-right{
      width:100%;
      height:2em;
      text-align:center;
      color:#fff;
      position:absolute;
      bottom:1em;
      border-top:1px solid ${Gray};
    }

    @media only screen and (max-width: 768px) {
    .menu_footer>div>div{
      width:100%;
    }
    footer{
      min-height:47em;
    }
    }
  `;

  constructor() {
    super();
    router.initial();
  }

  @state()
  protected _hideNavigation = true;

  protected _hideNavigationSignal = new SignalInterface('hide-navigation');

  protected _activePage = 'home';

  protected _routes: RoutesConfig = {
    // TODO: refactor route, we need to get active page!
    // TODO: ability to redirect!
    map: (route) => (this._activePage = route.sectionList[0]?.toString().trim() || 'home'),
    list: {
      home: {
        render: () => html`<page-home></page-home>`,
      },
      about: {
        render: () => html`<page-about></page-about>`,
      },
    },
  };

  protected _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this._listenerList.push(
      router.signal.addListener(
        (route) => {
          this._logger.logMethodArgs('routeChanged', { route });
          this._activePage = route.sectionList[0]?.toString().trim() || 'home';
          this.requestUpdate();
        },
        { receivePrevious: true },
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
          <header-element path=${this._activePage} ?hidden=${this._activePage==="home" && window.screen.width>768}></header-element>
          <main class="page-container">${router.outlet(this._routes)}</main>
          <footer>
            <img src="/images/footer_border.png" class="border-footer" loading="lazy" alt="border footer" />
            <div class="menu_footer">
              <div>
                <div>
                  <h6>${footer.name[0]}</h6>
                  <img src="/images/border1.png" loading="lazy" alt="border footer" />
                  ${repeat(footer.one, (item) => html`
                  <a href=${item.link}>${item.name}</a>
                  `)}
                </div>
                <div>
                  <h6>${footer.name[1]}</h6>
                  <img src="/images/border1.png" loading="lazy" alt="border footer" />
                  ${repeat(footer.two, (item) => html`
                  <a href=${item.link}>${item.name}</a>
                  `)}
                </div>
                <div>
                  <h6>${footer.name[2]}</h6>
                  <img src="/images/border1.png" loading="lazy" alt="border footer" />
                  ${repeat(footer.three, (item) => html`
                  <a href=${item.link}>${item.name}</a>
                  `)}
                </div>
                <div>
                  <h6>اتصل بنا</h6>
                  <img src="/images/border1.png" loading="lazy" alt="border footer" />
                  <p>تذكير: ضع الأيقونة</p>
                </div>
              </div>
            </div>
            <p class="copy-right">Portions of this content are ©1998–2022 by individual Hussain Holy Askarian IT contributors.</p>
          </footer>
    `;
  }

  protected _renderNavigation(): TemplateResult | typeof nothing {
    if (this._hideNavigation) return nothing;

    const listTemplate = mainNavigation.map((item) => {
      const selected = this._activePage === item.id;
      return html`
        <a href="${router.makeUrl({ sectionList: [item.id] })}" class="nav__item ${classMap({ active: selected })}">
          <span class="nav__item-text">${item.title}</span>
        </a>
      `;
    });

    return html`<nav>${listTemplate}</nav>`;
  }
}
