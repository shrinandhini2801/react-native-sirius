<p align="center">
  <img alt="react-native-sirius" src="./ReadmeAssets/siriusLogo.svg?sanitize=true" height="200">
</p>
<p align="center">
  by<br/>
  <a href="https://thestar.ca">The Star</a>
</p>

---

![node](https://img.shields.io/badge/v12.13-Node-brightgreen)

## Install instruction

`npm install`

## Run app on Simulator

`npm start`

iOS

`npm run ios`

`npm run ipad`

Android

`npm run android`

## Run dev tools for debugging

`npm run react-devtools`

## Check iOS Simulators

`xcrun simctl list --json devices`

> Check for isAvailable true

`iPad Pro (9.7 inch)` this is qualified name of the simulator

The script `npm run ipad` uses `iPad Pro (9.7 inch)`.

Change {simulator-name} to run custom simulator

`react-native run-ios --simulator="{simulator-name}"`

---

### Cache clear

```
watchman watch-del-all &&
rm -rf $TMPDIR/react-native-packager-cache-* &&
rm -rf $TMPDIR/metro-bundler-cache-* &&
rm -rf node_modules/ &&
npm cache clean --force &&
npm install &&
npm start -- --reset-cache
```

## Design and Development principal

Please read [Atomic Design Methodology](http://atomicdesign.bradfrost.com/chapter-2/) if you are not familiar with the concept

## Layouts

### Layout 1

<div style="display: flex;">
  <div>
    Layout 1 <br/>
    <img alt="react-native-sirius" src="./ReadmeAssets/Layout_01.png?sanitize=true" width=250  style="background-color: #FCFBF9">
  </div>
  <div>
    Layout 2 <br/>
    <img alt="react-native-sirius" src="./ReadmeAssets/Layout_02.png?sanitize=true" width=250  style="background-color: #FCFBF9">
  </div>
  <div>
    Layout 3 <br/>
    <img alt="react-native-sirius" src="./ReadmeAssets/Layout_03.png?sanitize=true" width=250  style="background-color: #FCFBF9">
  </div>
  <div>
    Layout 4 <br/>
    <img alt="react-native-sirius" src="./ReadmeAssets/Layout_04.png?sanitize=true" width=250  style="background-color: #FCFBF9">
  </div>
  <div>
    Layout 5 <br/>
    <img alt="react-native-sirius" src="./ReadmeAssets/Layout_05.png?sanitize=true" width=250 style="background-color: #FCFBF9">
  </div>
  <div>
    Layout 6 <br/>
    <img alt="react-native-sirius" src="./ReadmeAssets/Layout_06.png?sanitize=true" width=250  style="background-color: #FCFBF9">
  </div>
</div>
