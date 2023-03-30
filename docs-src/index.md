---
layout: page.11ty.cjs
title: <carousel-wc> ⌲ Home
---

# &lt;carousel-wc>

`<carousel-wc>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<carousel-wc>` is just an HTML element. You can it anywhere you can use HTML!

```html
<carousel-wc></carousel-wc>
```

  </div>
  <div>

<carousel-wc></carousel-wc>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<carousel-wc>` can be configured with attributed in plain HTML.

```html
<carousel-wc name="HTML"></carousel-wc>
```

  </div>
  <div>

<carousel-wc name="HTML"></carousel-wc>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<carousel-wc>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;carousel-wc&gt;</h2>
    <carousel-wc .name=${name}></carousel-wc>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;carousel-wc&gt;</h2>
<carousel-wc name="lit-html"></carousel-wc>

  </div>
</section>
