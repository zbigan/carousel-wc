var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, state, queryAssignedElements, } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { SLIDE_LEFT_IN, SLIDE_LEFT_OUT, SLIDE_RIGHT_IN, SLIDE_RIGHT_OUT, BOOTSTRAP_CHEVRON_LEFT, BOOTSTRAP_CHEVRON_RIGHT, } from "./constants.js";
import "./slide-button.js";
let SimpleCarousel = class SimpleCarousel extends LitElement {
    constructor() {
        super(...arguments);
        // Assume this is always a valid slide index.
        this.slideIndex = 0;
        this.containerHeight = 0;
    }
    /**
     * Return slide index in the range of [0, slideElement.length)
     */
    get wrappedIndex() {
        return wrapIndex(this.slideIndex, this.slideElements.length);
    }
    render() {
        const containerStyles = {
            height: `${this.containerHeight}px`,
        };
        return html `<slide-button
        part="buttons left-button"
        exportparts="internal-btn : buttons"
        @click=${this.navigateToPrevSlide}
      >
        ${BOOTSTRAP_CHEVRON_LEFT}
      </slide-button>
      <div part="container" id="container" style="${styleMap(containerStyles)}">
        <slot></slot>
      </div>
      <slide-button
        part="buttons right-button"
        exportparts="internal-btn : buttons"
        @click=${this.navigateToNextSlide}
      >
        ${BOOTSTRAP_CHEVRON_RIGHT}
      </slide-button>`;
    }
    firstUpdated() {
        this.containerHeight = getMaxElHeight(this.slideElements);
        this.initializeSlides();
    }
    updated(changedProperties) {
        if (changedProperties.has("slideIndex")) {
            const oldSlideIndex = changedProperties.get("slideIndex");
            if (oldSlideIndex === undefined) {
                return;
            }
            const isAdvancing = this.slideIndex > oldSlideIndex;
            if (isAdvancing) {
                this.navigateWithAnimation(1, SLIDE_LEFT_OUT, SLIDE_RIGHT_IN);
            }
            else {
                this.navigateWithAnimation(-1, SLIDE_RIGHT_OUT, SLIDE_LEFT_IN);
            }
        }
    }
    navigateToNextSlide() {
        this.slideIndex += 1;
    }
    navigateToPrevSlide() {
        this.slideIndex -= 1;
    }
    async navigateWithAnimation(nextSlideOffset, leavingAnimation, enteringAnimation) {
        this.initializeSlides();
        const leavingElIndex = wrapIndex(this.slideIndex - nextSlideOffset, this.slideElements.length);
        const elLeaving = this.slideElements[leavingElIndex];
        showSlide(elLeaving);
        // Animate out current element
        const leavingAnim = elLeaving.animate(leavingAnimation[0], leavingAnimation[1]);
        // Entering slide
        const newSlideEl = this.slideElements[this.wrappedIndex];
        // Show the new slide
        showSlide(newSlideEl);
        // Teleport it out of view and animate it in
        const enteringAnim = newSlideEl.animate(enteringAnimation[0], enteringAnimation[1]);
        try {
            // Wait for animations
            await Promise.all([leavingAnim.finished, enteringAnim.finished]);
            // Hide the element that left
            hideSlide(elLeaving);
        }
        catch {
            /* Animation was cancelled */
        }
    }
    initializeSlides() {
        for (let i = 0; i < this.slideElements.length; i++) {
            const slide = this.slideElements[i];
            slide.getAnimations().forEach((anim) => anim.cancel());
            if (i === this.wrappedIndex) {
                showSlide(slide);
            }
            else {
                hideSlide(slide);
            }
        }
    }
};
SimpleCarousel.styles = css `
    ::slotted(.slide-hidden) {
      display: none;
    }
    /** So the elements all overlap */
    ::slotted(*) {
      position: absolute;
      padding: 1em;
    }
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      min-width: 500px;
    }
    #container {
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 0 18px;
      padding: 1em;
      overflow: hidden;
      position: relative;
      /* --carousel-box-shadow - is custom property with
      fallback for default styles if var is not defined: */
      box-shadow: var(
        --carousel-box-shadow,
        #293198 0.2em 0.2em 0.4em,
        #ceffff -0.1em -0.1em 0.2em
      );
    }
  `;
__decorate([
    property({ type: Number })
], SimpleCarousel.prototype, "slideIndex", void 0);
__decorate([
    state()
], SimpleCarousel.prototype, "containerHeight", void 0);
__decorate([
    queryAssignedElements()
], SimpleCarousel.prototype, "slideElements", void 0);
SimpleCarousel = __decorate([
    customElement("carousel-wc")
], SimpleCarousel);
export { SimpleCarousel };
function getMaxElHeight(els) {
    return Math.max(0, ...els.map((el) => el.getBoundingClientRect().height));
}
function hideSlide(el) {
    el.classList.add("slide-hidden");
}
function showSlide(el) {
    el.classList.remove("slide-hidden");
}
function wrapIndex(idx, max) {
    return ((idx % max) + max) % max;
}
//# sourceMappingURL=carousel-wc.js.map