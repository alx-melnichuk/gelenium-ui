# Gelenium-UI

A library of visual components in a style similar to "Material UI".
But the components of this library are more flexible.

Demo site: [gelenium-ui](https://alx-melnichuk.github.io/gelenium-ui/).
This site also has examples of use.

This library was generated with [Angular CLI](https://v14.angular.io/cli) version 14.1.2.

## Installation

```bash
# using npm
$ npm install gelenium-ui

# using yarn
$ yarn add gelenium-ui
```

## Component: "GlnInput"

### Basic
The GlnInput component is a form control. It includes: label, input and help text.
It comes in three versions:

- with an outline (exterior="outlined" - default)
- with a fill (exterior="underline")
- standard (exterior="standard")

![input1a.png](/pictures-readme/input1a.png)


The element's label has an animation and smoothly transitions into a placeholder.

This component changes the display color when it is in an error state.

![input1b_error.png](/pictures-readme/input1b_error.png)
               

### Ornament

An ornament (text or picture) can be placed at the beginning or at the end of an element.

![input2a_ornam.png](/pictures-readme/input2a_ornam.png)


### Frame Size

The element's height is set according to the value of the "size" parameter. 
All padding and offsets are determined by this variable and the font size.

The "size" property takes the following values:
- "short" - sets the height to 38px;
- "small" - sets the height to 44px;
- "middle" - sets the height to 50px (default);
- "wide" - sets the height to 56px;
- "large" - sets the height to 62px;
- "huge" - sets the height to 68px;

The font size for native input and label is determined from the parent container.
The size of the font can be defined with the css-style for the "gln-input" tag.
We can change the font size at the gln-input tag level, but the height of the element will not change.

The height of the element remains the same even when the font size is changed (from font-size: 10px to 26px).

In the value of the 'size' parameter, you can also specify a numeric value (the height of the element in pixels).

In the configuration, you can also specify the value of the 'size' parameter, both string and numeric.

An element with an "outlined" appearance.

![input3a_size.png](/pictures-readme/input3a_size.png)

An element with an "underline" appearance.

![input3b_size.png](/pictures-readme/input3b_size.png)


### Border radius

For these components, you can change the border radius.

An element with an "outlined" appearance.

![input4a_border.png](/pictures-readme/input4a_border.png)

An element with an "underline" appearance.

![input4b_border.png](/pictures-readme/input4b_border.png)

There are also other features of these components that can be seen on the demo site.
