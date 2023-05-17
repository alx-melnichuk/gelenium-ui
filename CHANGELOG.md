#### [0.6.0](https://github.com/alx-melnichuk/gelenium-ui/tree/0.6.0) (2023-05-17)

#### Features

* added a new **GlnChip** component;
* added a new **GlnCheckbox** component;
* added a new **GlnRadioButton** component;
* added a new **GlnSnackbar** component;
* added new service **GlnSnackbarService**;

#### [0.5.0](https://github.com/alx-melnichuk/gelenium-ui/tree/0.5.0) (2023-03-21)

#### BREAKING CHANGES

Directives for working with "ornament" (additional pictures in input elements) are separated into a separate module.
Now, before using the ornament, you need to add the GlnFrameOrnamentModule.

Modification of the GlnButton component.
Previously, the height of a component was based on the height of the content's text and its vertical padding.
Now the height is determined by the css-property "height", and the content is centered.
Therefore, the input parameters: "ornamLfAlign", "ornamRgAlign" became unnecessary and were removed.
Also removed css-parameters "--glnbt-pd-tp", "--glnbt-pd-bt".
Horizontal padding remain.

Removed css properties for GlnButton component:
* font-size: 0.875em;
* line-height: 1.75;
This allows you to specify the exact 'font-size' value for a particular component.
And reduces the error in the calculation of line spacing.
And this, in turn, minimizes the occurrence of inaccurate vertical alignment.

For components: GlnInput, GlnSelect, GlnTextarea, GlnButton input parameter:
* frameSize:string | null | undefined;
replaced by:
* size:number | string | null | undefined;

We slightly simplified the structure of the GlnButton component: we got rid of the intermediate div layer.

#### Features

* added a new **GlnTooltip** component;
* added a new **GlnPagination** component;
* added a new **GlnSpinner** component;


#### [0.4.0](https://github.com/alx-melnichuk/gelenium-ui/tree/0.4.0) (2023-01-16)

#### BREAKING CHANGES

For the GlnSwitch component, css parameters for client settings and a new example have been added.
Added 'GlnHighlight' channel to highlight text fragment in GlnHighlightModule.
This channel is used in the GlnAutocomplete demo page.
For components: GlnInput, GlnTextarea the extra 'div' node has been removed.
Fixed setting the height of the GlnInput component for types: color, date, datetime-local, month, time, week.
Added option panel closing when deleting GlnSelect.
Fixed GlnTouchRipple bug where sometimes click on source element didn't work.
The GlnOption interface has been created for methods of the GlnOptionComponent class.
This will allow other classes to use this interface and not be tied to a specific implementation.

#### Features

* added a new **Autocomplete** component.


#### [0.3.0](https://github.com/alx-melnichuk/gelenium-ui/tree/0.3.0) (2022-10-14)

#### BREAKING CHANGES

The following components have been optimized: GlnInput, GlnTextarea, GlnSelect, GlnButton.
Previously for these components css-parameters of indents and other settings were defined in additional directives.
This led to additional waste of time, memory and, in general, looked difficult to understand.
Now all the required logic for calculating css-parameters has been transferred to the GlnFrame component and reduced to one method.
The GlnFrame component itself is the basis for the above components.
This allowed us to reduce the amount of code and make it easier to understand the process of calculating css parameters.

#### Features

* added a new **Switch** component.


#### [0.2.0](https://github.com/alx-melnichuk/gelenium-ui/tree/0.2.0) (2022-08-26)

#### BREAKING CHANGES

* redesigned display logic for **Frame**
* added palette with primary colors **styles.css**
* the library has been moved to Angular v.14.

#### Features

* added a new **Select** component.

The demo project has been reworked.


#### [0.1.0](https://github.com/alx-melnichuk/gelenium-ui/tree/_0.1.0) (2022-06-10)

#### Features

Initial release with the following elements:

* Components:
** Button
** Frame
** HintOrError
** InfiniteScroll
** Input
** Textarea
* Directives:
** AutoFocuse
** RegexCheck
** RegexMatch
** RegexRemove