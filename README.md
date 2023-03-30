# Carousel
###  This is code-along session from Lit tutorial:
[Creating carousel with Lit](https://youtu.be/2RftvylEtrE)

### See implementation examples:
- ``npm install``
- ``npm run build:watch``
- ``npm run serve`` (in new terminal)

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
  ... code
}
```
