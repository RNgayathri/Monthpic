
# Month-Pic

Allow to select month and year.

## tl;dr
* Install by executing `npm install monthpic`.
* Import by adding `import MonthPicker from 'monthpic'`.
* Use by adding `<MonthPicker  name="..." />`.

### Usage

Here's an example of basic usage:

```js
import React, { Component } from 'react';
import MonthPicker from 'monthpic';

class MyApp extends Component {
  render() {
    return (
      <div>
        <MonthPicker
          name="MonthPic"
          allowedYears={{ "after": new Date().getFullYear() - 2 }}
        />
      </div>
    );
  }
}
```
