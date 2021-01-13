# SimpleAccessibility_JS
Simple vanilla JS script for simple accessibility options.


## Overview
SimpleAccessibility_JS is a vanilla JavaScript code that will make the website more accessible for people with motor difficulties. It should not do any harm to the website or make design be worse. 

It uses cookies has its memory, so the user don't need to keep applying the options he uses at each page load on the website.

---


## How to use
Just add the .js file and the .css file to see the magic. Like this:

```css
<link rel="stylesheet" href="path/to/cssfile.csss"/>
```
```javascript
<script type="text/javascript" src="path/to/jsfile.js"></script>
<script type="text/javascript">
  ACCESSIBILITY.createAccessibility();
</script>
```

You can pass an ement ID as well, to make it a button to open/close the widget. Note that the element must exist.

```css
<link rel="stylesheet" href="path/to/cssfile.csss"/>
```
```javascript
<script type="text/javascript" src='path/to/jsfile.js'></script>
<script type="text/javascript">
  ACCESSIBILITY.createAccessibility("myElementId");
</script>
```

The css files can be loaded too or you can create your own stylesheet.


---

## Options
The script already has a few basic options on it. They are:

- **Invert Colors** 
- **Contrast**
- **Highlight Links**
- **Highlight titles (Hn tags)**
- **Font Size**
- **Stop Animations**
- **Bigger Cursor**


---

## Keyboard Shortcuts

To make it easier to some, the script already have some keyboard shortcuts. They are:
- **CTRL+U (some developers may not like it):** It will open/close the widget on the page;
- **ESC (with widget visible):** It will close the widget;
- **Page Click:** When clicked out of the widget, it will close itself;

