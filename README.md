# SimpleAccessibility_JS
Simple vanilla JS script for simple accessibility options.

## How to use
Just add the .js file and the .css file to see the magic. Like this:

`<script src='path/to/jsfile.js'></script>
<script>
  ACCESSIBILITY.createAccessibility();
</script>`

You can pass an ement ID as well, to make it a button to open/close the widget.


`<script src='path/to/jsfile.js'></script><script>ACCESSIBILITY.createAccessibility("myElementId");</script>`

The css files can be loaded too or you can create your own stylesheet.

---

## Options
The script already has a few basic options on it. They are:

- **Invert Colors** 
- **Contrast**
- **Highlight Links**
- **Highlight titles (H* tags)**
- **Font Size**
- **Stop Animations**
- **Bigger Cursor**

---

## Keyboard Shortcuts

To make it easier to some, the script already have some keyboard shortcuts. They are:
- **CTRL+U (some developers may not like it):** It will open/close the widget on the page;
- **ESC (with widget visible):** It will close the widget;
- **Page Click:** When clicked out of the widget, it will close itself;

