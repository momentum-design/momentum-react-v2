/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { default as reset } from "@/wc_scss/reset.scss";
import { customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import "../theme/Theme";
@customElement("token-audit")
export class TokenAudit extends LitElement {
  @property({ type: String }) component = "";

  @internalProperty() tokens: string[] | undefined;

  @query("md-theme") theme!: HTMLElement;

  static get styles() {
    return [reset];
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
  }

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

  renderRow = (token: string) => {
    return html`
      <tr>
        <td>${token}</td>
        <td>$md-gray-40, #b2b2b2, <span style=${this.swatch("red")}></span></td>
        <td>$md-gray-40, #b2b2b2, <span title=${"blue"} style=${this.swatch("blue")}></span></td>
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

        #tokens tr:nth-child(even) {
          background-color: #f2f2f2;
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
            <th colspan="3">${`Lumos Mode`}</th>
          </tr>
          <tr>
            <th colspan="1">CSS Var Name</th>
            <th colspan="1">Light Theme</th>
            <th colspan="1">Dark Theme</th>
          </tr>
        </thead>
        <tbody>
          ${this.renderRow("--badge-outline-color")}
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
