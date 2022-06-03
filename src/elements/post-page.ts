import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js'

@customElement('post-page')
export class PostPage extends LitElement {
    static override styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    override render() {
        return html``;
    }
}
