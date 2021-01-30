import Sortable from "sortablejs";
import { customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";

@customElement("md-sortable-item")
export class SortableItem extends LitElement { 
  @property({ type: Boolean }) sortable = true;
  @query("#example") list!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
  }

  private setSortable() {
    requestAnimationFrame(() => {
      if (this.list) {
        new Sortable(this.list, {
          animation: 150,
          sort: true,
          ghostClass: 'blue-background-class'
        });
      }
    });
    console.log(this.list)
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("sortable")) {
      this.setSortable();
    }
  }

  render() {
    return html`
      <div id="example" class="list-group" sortable=${this.sortable}>
				
				<div class="list-group-item" >Item 1</div>
				<div class="list-group-item" >Item 2</div>
        <div class="list-group-item" >Item 3</div>
        <div class="list-group-item" >Item 4</div>
				<div class="list-group-item" >Item 5</div>
				<div class="list-group-item" >Item 6</div>
			</div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "md-sortable-item": SortableItem;
  }
}
