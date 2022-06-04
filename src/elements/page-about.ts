import {css, html, CSSResultGroup} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {query} from 'lit/decorators/query.js';

import {AppElement} from '../app-debt/app-element';

import {getJson} from '@alwatr/fetch';

import type {ListenerInterface} from '@alwatr/signal';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-about': PageAbout;
  }
}

@customElement('page-about')
export class PageAbout extends AppElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      position: relative;
    }
    * {
      box-sizing: border-box;
    }
    .content {
      width: 40%;
      background-color: #ffff;
      border-radius: 10px;
      margin: 8em 3em 4em 0;
      box-shadow: 0 0 25px rgb(227 229 230 / 50%);
      overflow: hidden;
    }
    .sidebar {
      width: 16vw;
      border-radius: 6px;
      background-color: transparent;
      margin: 8em 0 4em 3em;
      position: relative;
      position: sticky;
      top: 7em;
    }
    .image-post {
      width: 16vw;
      height: 16vw;
      background: url('/images/samarra.jpg') no-repeat center center / cover;
      border: 4px solid #e4e8eb;
      background-color: transparent;
      border-radius: 10px 103px 10px 10px;
      box-shadow: 0 0 25px rgb(227 229 230 / 50%);
    }
    .content > p {
      text-align: justify;
      padding: 0 0.2em;
    }
    .menu-sidebar {
      width: 100%;
      height: fit-content;
      box-shadow: 0 0 25px rgb(227 229 230 / 50%);
      padding: 1em 0.1em;
      margin: 4em 0;
      border-radius: 10px;
      background-color: #fff;
    }
    @media only screen and (max-width: 1440px) {
      .content {
        width: 50%;
        margin: 5em 1em;
      }
    }
    @media only screen and (max-width: 1024px) {
      .sidebar {
        display: none;
      }
      .content {
        width: 90%;
        margin: 5em 1em;
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

  protected override render(): TemplateResult {
    return html`
      <div class="sidebar">
        <div class="image-post" title="Samarra"></div>
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
      <div class="content">
        <p></p>
      </div>
    `;
  }

  @query('.content>p')
  content!: HTMLParagraphElement;

  protected override async firstUpdated() {
    let json: any = localStorage.getItem('about');
    if (!json) {
      const get: any = await getJson('/json/about.json');
      localStorage.setItem('about', JSON.stringify(get));
      json = get;
    } else {
      json = JSON.parse(json);
    }
    this.content.innerHTML = json.ar;
  }
}
