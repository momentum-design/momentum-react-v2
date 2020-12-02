/* eslint-disable @typescript-eslint/ban-ts-ignore */
/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { lumosDark, lumosLight, momentumDark, momentumLight } from "@/components/theme/index.ts";
import { default as reset } from "@/wc_scss/reset.scss";
import { customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import "../button/Button";
import "../theme/Theme";
import { colors } from "./scss/color-vars";
@customElement("token-audit")
export class TokenAudit extends LitElement {
  @property({ type: String }) component = "";

  @internalProperty() tokens: string[] | undefined;
  @internalProperty() lumos = false;
  @internalProperty() darkTheme = false;
  @internalProperty() activeTheme = momentumLight;
  @internalProperty() allThemes = [lumosDark, lumosLight, momentumDark, momentumLight];

  @query("md-theme") theme!: HTMLElement;

  closestElement(selector: string, base = this) {
    function __closestFrom(el: unknown): HTMLElement | null {
      if (!el || el === document || el === window) return null;
      // @ts-ignore
      const found = el.closest(selector);
      // @ts-ignore
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
    // @ts-ignore
    this.lumos = themeWrapper.lumos;
    // @ts-ignore
    this.darkTheme = themeWrapper.darkTheme;
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
      })
      .catch(error => error);
  }

  private setTheme() {
    if (this.lumos) {
      if (this.darkTheme) {
        return lumosDark;
      } else {
        return lumosLight;
      }
    } else {
      if (this.darkTheme) {
        return momentumDark;
      } else {
        return momentumLight;
      }
    }
  }

  queryGlobalTokens = (token: string): Record<string, any> => {
    this.activeTheme = this.setTheme();
    let rawLight = lumosLight.cssText;
    let rawDark = lumosDark.cssText;
    if (this.lumos) {
      rawLight = lumosLight.cssText;
      rawDark = lumosDark.cssText;
    } else {
      rawLight = momentumLight.cssText;
      rawDark = momentumDark.cssText;
    }
    const getHex = (searchToken: string, theme: string) => {
      const re = new RegExp(`${searchToken}: #`);
      const sixHex = new RegExp(/^#?([0-9a-f]{6}){1,2}$/);
      const threeHex = new RegExp(/^#?([0-9a-f]{3}){1,2}$/);
      const result = theme.match(re);
      const clip = theme
        // @ts-ignore
        .slice(result?.index + searchToken.length + 2, result?.index + searchToken.length + 9)
        .toLowerCase();
      if (sixHex.test(clip)) {
        return clip;
      } else if (clip.search(threeHex) !== null && clip.length > 0) {
        const hexcolor = clip
          .slice(0, 4)
          .split("")
          .map(function(hex) {
            if (hex !== "#") {
              return hex + hex;
            }
          })
          .join("");
        return `#${hexcolor}`;
      } else return `not a color: ${clip}`;
    };
    const lightHex = getHex(token, rawLight);
    const darkHex = getHex(token, rawDark);
    const lightVar = colors[lightHex];
    const darkVar = colors[darkHex];
    return {
      lightHex: lightHex,
      darkHex: darkHex,
      lightVar: lightVar,
      darkVar: darkVar
    };
  };

  swatchStyle = (value: string) => {
    return `width: 2rem; height: 1rem; display: inline-block; background: ${value}`;
  };

  renderRow = (token: string) => {
    const { lightVar, darkVar, lightHex, darkHex } = this.queryGlobalTokens(token);
    return html`
      <tr>
        <td>${token}</td>
        <td>${lightVar}, ${lightHex}, <span title=${lightHex} style=${this.swatchStyle(lightHex)}></span></td>
        <td>${darkVar}, ${darkHex}, <span title=${darkHex} style=${this.swatchStyle(darkHex)}></span></td>
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
            <th colspan="1">Light Hue</th>
            <th colspan="1">Dark Hue</th>
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
