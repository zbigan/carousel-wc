# Carousel
###  This is code-along session from Lit tutorial:
[Creating carousel with Lit](https://youtu.be/2RftvylEtrE)

## Styling
### To style our web component from outside we will use custom CSS properties and "part" attribute

- text colors and other font settings automatically inherit styles through shadow dom from parent
- to inherit text color that is not a text (e.g. SVG), use "currentColor" css value

## Public styling API:
Custom CSS properties:
- --carousel-box-shadow
- --carousel-active-btn-box-shadow
- --carousel-active-btn-background-color
- --carousel-active-btn-color

Parts:
- container
- buttons
- left-button
- right-button
- internal-btn (makes part public to direct parent but not outside web component. To make it happen, we use "exportparts" to forward parts from the slide button)

## Using custom CSS properties examples from the parent CSS example:
```
carousel-wc {
  --carousel-box-shadow: 0px 6px -3px egba(0, 0, 0, 0.2),
  0px 10px 14px 1px rgba(0, 0, 0, 0.14),
  0px 4px 18px 3px rgba(0, 0, 0, 0.12);

  --carousel-active-btn-box-shadow: var(--carousel-box-shadow);

  --carousel-active-btn-color: white;

  --carousel-active-btn-background-color: rgb(247, 130, 0);
}
```

## Using parts examples from the parent CSS example:
```
carousel-wc::part(container) {
  :root {
    background-color: #f4f4f4;
    font-family: Arial;
  }
  simple-carousel::part(container) {
    border-radius: unset;
    margin: unset;
    box-shadow: unset;
    background-color: rgb(215, 218, 222);
  }
  simple-carousel::part(buttons) {
    border-radius: unset;
    height: 100%;
    box-shadow: unset;
    background-color: rgb(20, 150, 241);
  }
  simple-carousel {
    filter: drop-shadow(-1em -1em 0 rgb(6, 4, 24));
  }
  simple-carousel::part(buttons):active {
    background-color: rgb(247, 130, 8);
    color: white;
  }
  body {
    /* Center the carousel on the page */
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }
  /*
  Hide the simple-carousel element until it is defined, preventing a flash
  of unstyled content.
  */
  simple-carousel:not(:defined) {
    display: none;
  }
}
```

## Example of implementic the automatic carousel (all from ouside of web component):
[Link](https://github.com/lit/video-series-samples/blob/main/build-it-with-lit/02-simple-carousel/dev/demo-3.html)
