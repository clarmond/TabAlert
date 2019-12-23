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
