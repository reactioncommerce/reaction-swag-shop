## Deprecated! This repository is no longer being maintained and does not work with the current version of Reaction Commerce.
# Reaction Swag Shop

This repository contains the reaction-swag-shop plugin that's intended as a learning resource for everybody
who's facing the task of customizing Reaction for her/his own shop implementation. The plugin's current state is deployed [here](https://swagproject.reactioncommerce.com). There's also a blog post series on our [Reaction Blog](https://blog.reactioncommerce.com/building-and-launching-a-store-on-reaction/) that explains in more detail about the evolution of this ticket.


### Getting started
If you would like to use this shop plugin as a starting point for your own project, please follow the steps outlined below:

#### Step 1
Create a new Reaction project for your new shop: https://docs.reactioncommerce.com/docs/1.14.0/installation

#### Step 2
Clone this shop repository into the custom plugin folder. In your project directory, execute the following bash
 commands (Windows commands will look a bit different):
```
 $ cd <your-new-shop-directory-name>/imports/plugins/custom
 $ git clone https://github.com/reactioncommerce/reaction-swag-shop.git
```

#### Step 3
Ensure latest version of reaction-cli is installed
```
$ npm i -g reaction-cli
```

#### Step 4
Install dependencies and start Reaction
```
$ cd <your-new-shop-directory-name>
$ meteor npm install
$ export SKIP_FIXTURES=1 && reaction
```


### Troubleshooting
In case you experience the error `Unknown asset: plugins/reaction-swag-shop/images/BCTMZ6HTxFSppJESk.jpg`, it's very
likely that the SKIP_FIXTURES environment variable is not set correctly. In that case, reset the database via
`reaction reset -n` and ensure SKIP_FIXTURES is set properly before running `reaction` 

### How the final swag shop will look like

![Swag shop screenshot](https://raw.githubusercontent.com/reactioncommerce/reaction-docs/master/assets/reaction-swag-shop.png)
