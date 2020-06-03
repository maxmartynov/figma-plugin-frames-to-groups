![](img/banner.png)

# Frames to Groups &mdash; Figma Plugin

This is a [Figma](figma.com) plugin that provides an easy way to convert
*Frames* to *Groups*.


## How To Use

Select layers and run the command `Convert Frames to Groups` and all
*Frames* inside the selected layers will be converted to *Groups*.

Cases:
- If no layers are selected, then all frames on the page will be converted.
- If you select a *Frame*, only the inner *Frames* will be converted,
not the selected one.
- If a component with the type `Instance` is selected, nothing will be changed inside it. To convert *Frames* inside an *Instance* component
you should select the source component of this *Instance*.


### Demo

`// TODO: add the demo`

[<br><img src="img/demo.gif" width="200"/>](img/demo.gif)



## Development

#### Installation
```
npm run install
```

#### Watch

Run the watcher that will transpile .ts files into .js files on change
```
npm run watch
```

#### Build

Build for production
```
npm run build
```

#### Bump the app version

```
npm run bump
# or
npm run patch
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



## Credits
The idea initiator & artwork - [Filippos Protogeridis](https://github.com/protogeridis)



## License
[MIT](LICENSE)