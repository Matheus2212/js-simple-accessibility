# SimpleAccessibility_JS
Simple vanilla JS script for simple accessibility features.


## Overview
SimpleAccessibility_JS is a vanilla JavaScript code that will make the website more accessible for people with motor difficulties. It should not do any harm to the website or make design be worse. It was developed using JavaScript ES5 to work with several other browsers.

It uses cookies has its memory, so the user won't need to keep applying the options that he uses at each page load on the website (localstorage in the near future maybe?)

Please, if you see any feature that isn't working, please tell me wich feature is and wich browser you've tested. It will be faster to fix that way.

---


## How to use
Just add the .js file and the .css file like and when the page is loaded (or before </body> tag), use this:

```css
<link rel="stylesheet" href="path/to/cssfile.csss"/>
```
```javascript
<script type="text/javascript" src="path/to/jsfile.js"></script>
```
```javascript
<script type="text/javascript">
  ACCESSIBILITY.createAccessibility();
</script>
```

You can give an element ID as parameter (better use in mobile devices), to make it a button to open/close the widget. Please note that the element MUST exist (the script WON'T create it).

```css
<link rel="stylesheet" href="path/to/cssfile.csss"/>
```
```javascript
<script type="text/javascript" src='path/to/jsfile.js'></script>
```
```javascript
<script type="text/javascript">
  ACCESSIBILITY.createAccessibility("myElementId");
</script>
```

Of course, you can create your own stylesheet for the widget.


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

