/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { default as reset } from "@/wc_scss/reset.scss";
import { customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import "../button/Button";
import "../theme/Theme";
@customElement("token-audit")
export class TokenAudit extends LitElement {
  @property({ type: String }) component = "";

  @internalProperty() tokens: string[] | undefined;
  @internalProperty() lumos = false;
  @internalProperty() darkTheme = false;

  @query("md-theme") theme!: HTMLElement;

  closestElement(selector: string, base = this) {
    function __closestFrom(el: unknown): HTMLElement | null {
      if (!el || el === document || el === window) return null;
      const found = el.closest(selector);
      return found ? found : __closestFrom(el.getRootNode().host);
    }

    return __closestFrom(base);
  }

  static get styles() {
    return [reset];
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.refreshTokenData();
  }

  refreshTokenData = () => {
    const themeWrapper: unknown = this.closestElement("md-theme");
    this.lumos = themeWrapper.lumos;
    this.darkTheme = themeWrapper?.darkTheme;
  };

  private async fetchComponentStats() {
    const response = await fetch(`/stats/${this.component}.json`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchComponentStats()
      .then(data => {
        const { declarations } = data;
        const tokens: string[] = [];
        for (const item in declarations.properties) {
          declarations.properties[item].forEach((element: string) => {
            if (element.includes("(--")) {
              const start = element.indexOf("var(") + 4;
              const end = element.indexOf(",");
              const token = element.slice(start, end);
              tokens.push(token);
            }
          });
        }
        this.tokens = tokens;
        console.log(this.tokens);
      })
      .catch(error => error);
  }

  queryGlobalTokens = (token: string, lumos: boolean): Record<string, any> => {
    // use token to find the values provided by the compiled CSS
    // find the SASS variables from global
    // cross reference their definitions
    // access compiled component variables, if available, and error if not present
    return {
      lightVar: "fart",
      darkVar: "fart",
      lightHex: "fart",
      darkHex: "fart"
    };
  };

  renderRow = (token: string) => {
    const { lightVar, darkVar, lightHex, darkHex } = this.queryGlobalTokens(token, this.lumos);
    return html`
      <tr>
        <td>${token}</td>
        <td>${lightVar}, ${lightHex}, <span style=${this.swatch(lightHex)}></span></td>
        <td>${darkVar}, ${darkHex}, <span title=${"blue"} style=${this.swatch(darkHex)}></span></td>
      </tr>
    `;
  };

  swatch = (color: string) => {
    return `
      display: inline-block;
      height: 1rem;
      width: 2rem;
      background: ${color};
    `;
  };

  render() {
    return html`
      <style>
        #tokens {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        #tokens td,
        #tokens th {
          border: 1px solid #ddd;
          padding: 8px;
        }

        #tokens td:nth-child(2) {
          background-color: #ededed;
          color: #121212;
        }

        #tokens tr:hover {
          background-color: #ddd;
        }

        #tokens th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #4caf50;
          color: white;
        }
      </style>
      <h4 class="token-output">Token Audit</h4>
      <table id="tokens">
        <thead>
          <tr>
            <th colspan="2">${this.lumos ? "Lumos" : "Momentum"} - ${this.darkTheme ? "Dark Theme" : "Light Theme"}</th>
            <th colspan="1">
              <md-button @click=${this.refreshTokenData}>Refresh Token Report </md-button>
            </th>
          </tr>
          <tr>
            <th colspan="1">CSS Var Name</th>
            <th colspan="1">Light Theme</th>
            <th colspan="1">Dark Theme</th>
          </tr>
        </thead>
        <tbody>
          ${this.tokens?.map(variable => {
            return this.renderRow(variable);
          })}
        </tbody>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "token-audit": TokenAudit;
  }
}
