import {LitElement, html, css, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';

import {Glod, OrangeHover} from '../color';

@customElement('page-404')
export class Page404 extends LitElement {
  static override styles = [
    css`
      :host {
        display: block;
        height: 60vh;
      }
      div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin: 2em 0;
      }
      h1 {
        font-size: 60px;
        margin: 0;
      }
      a {
        text-decoration: none;
        color: #fff;
        background-color: ${Glod};
        width: 11em;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        transition: 300ms linear background-color;
      }
      a:hover {
        background-color: ${OrangeHover};
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <div>
        <h1>404</h1>
        <p>${this.massage}</p>
        <a href="/">${this.button}</a>
      </div>
    `;
  }
  @property({attribute: false, type: String})
    massage = '';
  @property({attribute: false, type: String})
    button = '';
  protected override firstUpdated(): void {
    switch (this.lang) {
      case 'fa':
        this.massage = 'این صفحه وجود ندارد. می توانید به صفحه اصلی برگردید';
        this.button = 'بازگشت به صفحه اصلی';
        break;
      case 'ar':
        this.massage = 'هذه الصفحة غير موجودة. يمكنك العودة إلى الصفحة الرئيسية';
        this.button = 'عد إلى الصفحة الرئيسية';
        break;
      case 'en':
        this.massage = 'This page does not exist. You can return to the main page';
        this.button = 'Return to main page';
        break;

      default:
        break;
    }
  }
}
