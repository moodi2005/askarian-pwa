import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';

import {AppElement} from '../app-debt/app-element';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-live': PageLive;
  }
}

/**
 * ```html
 * <test-element></test-element>
 * ```
 */
@customElement('page-live')
export class PageLive extends AppElement {
  static override styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div {
      width: 60em;
      height: 30em;
      background: url(/images/shobak.jpg) no-repeat center center / cover;
      margin: 2em 0 20em 0;
      border-radius: 7px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div > p {
      font-size: 60px;
      color: #fff;
    }
  `;

  override render(): TemplateResult {
    return html`
      <div>
        <p>${this.config.titel}</p>
      </div>
    `;
  }
  @property({attribute: true, type: Object})
    config: Record<string, number> = {};
}
