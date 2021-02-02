
import { customElement, html, LitElement } from "lit-element";

@customElement("md-sortable-item")
export class SortableItem extends LitElement { 

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <div class="md-sortable-item">
        <slot></slot>
      </div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "md-sortable-item": SortableItem;
  }
}
