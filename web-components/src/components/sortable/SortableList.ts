import Sortable from "sortablejs";
import { SlottedMixin } from "@/mixins/SlottedMixin";
import { SortableItem } from "@/components/sortable/SortableItem";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";

@customElement("md-sortable-list")
export class SortableList extends SlottedMixin(LitElement) { 
  @property({ type: Boolean }) sortable = true;

  @query("#example") list!: HTMLElement;
  @query('slot') slotElement?: HTMLSlotElement;

  private items: SortableItem[] = [];

  connectedCallback() {
    super.connectedCallback();
  }

  get slotItem() {
    return this.slotElement;
  }

  private setupItems() {
    if (this.slotElement) {
      const children = this.slotElement.assignedElements({ flatten: true })
      this.getChildrenFromTree({ children }, this.items);
    }
  }

  private getChildrenFromTree(elem: {children: Element[]}, items: SortableItem[]) {
    for (var i = 0; i < elem.children.length; i++) {
      var child = elem.children[i];
      if (child instanceof SortableItem) {
        items.push(child);
      }
      this.getChildrenFromTree(child as any, items); // RECURSION
    }
  }

  private async linkItems() {
    const { items } = this;

    items.forEach(item => {

      item.setAttribute("draggable", "true");
    });
  }

  private setSortable() {
    requestAnimationFrame(() => {
      if (this.list) {
        new Sortable(this.list, {
          animation: 150,
          sort: true,
          draggable: "md-sortable-item",
          ghostClass: 'blue-background-class'
        });
      }
    });
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("slotted")) {
      this.setupItems();
      this.linkItems()
      console.log(this.slotElement)
      console.log(this.items)
    }
    if (changedProperties.has("sortable")) {
      this.setSortable();
    }
  }

  render() {
    return html`
      <div id="example" class="md-sortable" sortable=${this.sortable}>
        <slot></slot>
			</div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "md-sortable-list": SortableList;
  }
}
