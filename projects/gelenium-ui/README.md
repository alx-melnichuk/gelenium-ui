## Gelenium-UI

A library of visual components in a style similar to "Material UI".
But the components of this library are more flexible.

Demo site: [gelenium-ui](https://alx-melnichuk.github.io/gelenium-ui/).
This site also has examples of use.

This library was generated with [Angular CLI](https://v14.angular.io/cli) version 14.1.2.

### Installation

```bash
# using npm
$ npm install gelenium-ui

# using yarn
$ yarn add gelenium-ui
```

### Component: "GlnInput"

#### Basic
The GlnInput component is a form control. It includes: label, input and help text.
It comes in three versions:

- with an outline (exterior="outlined" - default)
- with a fill (exterior="underline")
- standard (exterior="standard")

![input1a.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/input1a.png)

                
The element's label has an animation and smoothly transitions into a placeholder.

This component changes the display color when it is in an error state.

![input1b_error.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/input1b_error.png)


#### Ornament

An ornament (text or picture) can be placed at the beginning or at the end of an element.

![input2a_ornam.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/input2a_ornam.png)


#### Frame Size

The element's height is set according to the value of the "size" parameter.
All padding and offsets are determined by this variable and the font size.

The 'size' property takes the following values:
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

![input3a_size.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/input3a_size.png)

An element with an "underline" appearance.

![input3b_size.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/input3b_size.png)


#### Border radius

For these components, you can change the border radius.

An element with an "outlined" appearance.

![input4a_border.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/input4a_border.png)

An element with an "underline" appearance.

![input4b_border.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/input4b_border.png)

There are also other features of these components that can be seen on the demo site.

### Component: "GlnTextarea"

#### Basic

The GlnTextarea component is a form control. It includes: label, textarea and help text. You can enter text in multiline mode. If the "cntRows" parameter is not specified, then the element's height will dynamically change depending on the number of lines in the element's text.
It comes in three versions:

- with an outline (exterior="outlined" - default)
- with a fill (exterior="underline")
- standard (exterior="standard")

Similar in appearance and behavior to the GlnInput component.

![textarea1a.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/textarea1a.png)


### Component: "GlnButton"

#### Basic

The GlnButton component is a styled button.
It comes in three versions:

- as a container (exterior="contained")
- as an outline (exterior="outlined" - default)
- as text (exterior="text")

![button1a.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/button1a.png)


#### Ornament

An ornament (text or picture) can be placed at the beginning or at the end of an element.

![button1b.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/button1b.png)


### Component: "GlnSelect"

#### Basic

The GlnSelect component is a form control. It includes: label, option list and help text.
It comes in three versions:

- with an outline (exterior="outlined" - default)
- with a fill (exterior="underline")
- standard (exterior="standard")

![select1a.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/select1a.png)


### Component: "GlnAutocomplete"

#### Basic

The GlnAutocomplete component allows you to supplement the input of the GlnInput component with a panel of suggested options.

![autocomplete1a.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/autocomplete1a.png)


### Component: "GlnPagination"

#### Basic

The GlnPagination component is designed to change the current page from the specified range.

![pagination1a.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/pagination1a.png)


### Component: "GlnSpinner"

#### Basic

The GlnSpinner component is used to display the progress of data processing.
This component renders an internal "svg" image that rotates around its own axis.
Also, this component can display its content instead of an internal image.

![spinner1a.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/spinner1a.png)

![spinner1b.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/spinner1b.png)


### Component: "GlnSwitch"

#### Basic

The GlnSwitch component displays the "on" or "off" state. It can be used to display the status of any parameter.

![switch1a.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/switch1a.png)


### Component: "GlnTooltip"

#### Basic

The GlnTooltip component displays a tooltip when the user hovers over or long presses on an element.

![tooltip1a.png](https://github.com/alx-melnichuk/gelenium-ui/raw/master/pictures-readme/tooltip1a.png)

