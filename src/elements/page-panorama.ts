import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';


import './header-element';

import {glod} from "../color"

@customElement('page-panorama')
export class PagePanorama extends LitElement {
  static override styles = [
    css`
            :host {
                width:100%;
                height:20em;
                display: flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
            }
            ion-icon{
                font-size:80px;
                animation: rotate 2s linear 300ms  normal infinite forwards;
                color:${glod};
             }
             h2{
                 font-size:40px;
                 color:${glod};
             }
            @keyframes rotate {
              from{
                transform: rotate(0deg);
              }
              to{
                transform: rotate(360deg);
              }
          
        `,
  ];

  override render() {
    return html` <ion-icon name="cog-outline"></ion-icon><h2>${this.config.titel}</h2> `;
  }
  @property({attribute:true,type:Object})
  config:any={};
}
