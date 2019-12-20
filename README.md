# TabAlert.js

Flashes the title and/or icon in the browser tab to get the user's attention.

## Examples

Notify the user that their session has expired
```javascript
const tabAlert = new TabAlert();
tabAlert.alert({ message: "Session has expired", icon: "stopwatch", times: 3 });
```

Flash "New Message" until the tab gets focus
```javascript
const tabAlert = new TabAlert();
const newTitle = `(${unreadMessageCount}) ${document.title}`;
window.addEventListener('focus', window.tabAlert.stop);
tabAlert.alert({ message: newTitle, icon: "speech balloon"});
```
