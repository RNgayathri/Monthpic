
# MonthYearPicker

Allow to select month and year.

* Install by executing `npm install month-year-picker`.
* Import by adding `import MonthPicker from 'month-year-picker'`.
* Use by adding `<MonthPicker  name="..." />`.

<img src="./src/images/example-1.png" alt="Example-1" />

## Demo
<img src="./src/images/MPDemo2.gif" alt="Example-1" />

### Usage

Here's an example of basic usage:

```js
import React, { Component } from 'react';
import MonthPicker from 'month-year-picker';

class MyApp extends Component {
  render() {
    return (
      <div>
        <MonthPicker
          name="MonthYear"
          allowedYears={{ "after": new Date().getFullYear() - 2 }}
        />
      </div>
    );
  }
}
```
## User guide

#### Props

|Prop name|Description|Default value|Example values|
|----|----|----|----|
|className|Class name that will be added to rendered element along with the default.|n/a|<ul><li>String:<br />`"custom-class-name-1"`</li></ul>|
|Id|Id for Month Picker.|n/a|<ul><li>String:<br />`"MonthYear"`</li></ul>|
|hintText|hint text shown in picker.|"MM/YY"|<ul><li>String:<br />`"MM/YY"`</li></ul>|
|hintStyle|hint text style for Month Picker.|n/a|<ul><li>Array:<br />`{color:"white"}`</li></ul>|
|primaryColor|Primary Color for Month Picker.|"#27718c"|<ul><li>String:<br />`"#4776E6"`</li></ul>|
|secondaryColor|secondary Color for Month Picker.|"#898989"|<ul><li>String:<br />`"#898989"`</li></ul>|
|textFieldStyle|Text field Style for Month Picker.|n/a|<ul><li>Array:<br />`{color:"black"}`</li></ul>|
|disabled|For disabling Month Picker.|false|<ul><li>Boolean:<br />`true`</li></ul>|



