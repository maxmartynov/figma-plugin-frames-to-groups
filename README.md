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

1. Install dependencies

    ```sh
    npm install
    ```

2. Get the [Figma desktop app](https://www.figma.com/downloads/). At this time, plugin development and testing needs to be done using the Figma desktop app. This is because Figma needs to read your code saved as a local file.

3. Log in to your account and open the file editor in the Figma desktop app.

4. Go to `Menu > Plugins > Development > New Plugin...`. This will bring up the "Create a plugin" modal. Choose the `manifest.json` from this project.


#### Watch

Run the watcher that will transpile .ts files into .js files on change
```sh
npm run dev
```


## Publishing

1. Build for production

    ```sh
    npm run build
    ```

2. Bump the app version

    ```sh
    npm run bump
    ```

3. Follow to the official guide [Publish plugins to the Figma Community](https://help.figma.com/hc/en-us/articles/360042293394-Publish-plugins-to-the-Figma-Community#Submit_your_plugin)



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



## Credits
The idea initiator & artwork - [Filippos Protogeridis](https://github.com/protogeridis)



## License
[MIT](LICENSE)