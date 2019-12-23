# TabAlert.js

Flashes the title and/or icon in the browser tab to get the user's attention.

## Usage
```javascript
<script src="TabAlert.min.js"></script>

<script>
  const tabAlert = new TabAlert();
  tabAlert.alert(options);
</script>
```

### Options
`message` This is the text that will be displayed on tab

`icon` (Optional) If specified, this icon will be toggled with the current favicon.
See list of available icons in source code.

`times` (Optional) The number of times to flash the message and/or icon.
If no number is specified, it will run until the _stop()_ method is called.

`delay` (Optional) Controls how fast to update the browser tab.
This is the number of milliseconds between changes.  The default is 1000.

**Note**: For some browsers, 1000 ms is the shortest interval allowed for non-active tabs.
Any value less than 1000 will be ignored.

## Demo

https://clarmond.github.io/TabAlert/index.html

## Examples

Notify the user that their session has expired
```javascript
const tabAlert = new TabAlert();
tabAlert.alert({ message: "Session has expired", icon: "stopwatch", times: 3 });
```

Alert user to new messages until the tab gets focus
```javascript
const tabAlert = new TabAlert();
const unreadMessageCount = SomeModule.getUnreadMessageCount();
const newTitle = `(${unreadMessageCount}) ${document.title}`;
window.addEventListener('focus', window.tabAlert.stop);
tabAlert.alert({ message: newTitle, icon: "speech balloon" });
```
