import "@/components/button/Button";
import "@/components/icon/Icon.ts";
import "@/components/tooltip/Tooltip.ts";
import { customElement, html, LitElement, property } from "lit-element";

@customElement("tooltip-template-sandbox")
export class TooltipTemplateSandbox extends LitElement { 
  @property({ type: String }) message = "Copy";
  @property({ type: Boolean }) isCopied = false;

  private clickBtn() {
    this.isCopied = true;
    if (this.isCopied) {
      this.message = "Copied";
      console.log("change");
      this.requestUpdate("message");
    } else {
      this.message = "Copy";
    }

    setTimeout(() => {
        this.isCopied = false;
      }, 500);
  }

  render() {
    return html`
      <div class="row md-padding__vertical">
        <md-tooltip message=${this.message}>
          <md-button @button-click=${() => this.clickBtn()}>Tooltip Default</md-button>
        </md-tooltip>
      </div>
      <div class="row md-padding__vertical">
        <md-tooltip message="Tooltip" placement="right">
          <md-button>Tooltip Right</md-button>
        </md-tooltip>
        <md-tooltip message="Tooltip" placement="right">
          <md-button>Tooltip Right</md-button>
        </md-tooltip>
      </div>
      <div class="row md-padding__vertical">
        <md-tooltip message="Tooltip" placement="top">
          <md-button>Tooltip Top</md-button>
        </md-tooltip>
      </div>
      <div class="row md-padding__vertical">
        <md-tooltip message="Tooltip" placement="bottom">
          <md-button>Tooltip Bottom</md-button>
        </md-tooltip>
      </div>
      <div class="row md-padding__vertical">
        <md-tooltip message="Tooltip" placement="left">
          <md-button>Tooltip Left</md-button>
        </md-tooltip>
      </div>
      <div class="row md-padding__vertical">
        <md-tooltip message="Tooltip" placement="right">
          <md-button>Tooltip Right</md-button>
        </md-tooltip>
      </div>
      <div class="row md-padding__vertical">
        <md-tooltip placement="right">
          <div slot="tooltip-content"><md-icon style="margin-right: .5rem" name="headset_12"></md-icon> Call</div>
          <md-button>Tooltip Slot Content</md-button>
        </md-tooltip>
      </div>
    `
  }

}

export const tooltipTemplate = html`
  <div class="container">
    <div class="column ">
      <div class="row md-margin__bottom"><h3>md-tooltip</h3></div>
        <tooltip-template-sandbox></tooltip-template-sandbox>
    </div>
  </div>
`;
