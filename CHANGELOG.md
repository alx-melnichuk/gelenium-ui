<a name="0.4.0"></a>
# [0.4.0](https://github.com/alx-melnichuk/gelenium-ui/tree/0.4.0) (2023-01-16)

### BREAKING CHANGES

For the GlnSwitch component, css parameters for client settings and a new example have been added.
Added 'GlnHighlight' channel to highlight text fragment in GlnHighlightModule.
This channel is used in the GlnAutocomplete demo page.
For components: GlnInput, GlnTextarea the extra 'div' node has been removed.
Fixed setting the height of the GlnInput component for types: color, date, datetime-local, month, time, week.
Added option panel closing when deleting GlnSelect.
Fixed GlnTouchRipple bug where sometimes click on source element didn't work.
The GlnOption interface has been created for methods of the GlnOptionComponent class.
This will allow other classes to use this interface and not be tied to a specific implementation.

### Features

* added a new **Autocomplete** component.


<a name="0.3.0"></a>
# [0.3.0](https://github.com/alx-melnichuk/gelenium-ui/tree/0.3.0) (2022-10-14)

### BREAKING CHANGES

The following components have been optimized: GlnInput, GlnTextarea, GlnSelect, GlnButton.
Previously for these components css-parameters of indents and other settings were defined in additional directives.
This led to additional waste of time, memory and, in general, looked difficult to understand.
Now all the required logic for calculating css-parameters has been transferred to the GlnFrame component and reduced to one method.
The GlnFrame component itself is the basis for the above components.
This allowed us to reduce the amount of code and make it easier to understand the process of calculating css parameters.

### Features

* added a new **Switch** component.


<a name="0.2.0"></a>
# [0.2.0](https://github.com/alx-melnichuk/gelenium-ui/tree/0.2.0) (2022-08-26)

### BREAKING CHANGES

* redesigned display logic for **Frame**
* added palette with primary colors **styles.css**
* the library has been moved to Angular v.14.

### Features

* added a new **Select** component.

The demo project has been reworked.


<a name="0.1.0"></a>
# [0.1.0](https://github.com/alx-melnichuk/gelenium-ui/tree/_0.1.0) (2022-06-10)

### Features

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