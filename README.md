# Reaction Swag Shop


---

 **⚠ WIP NOTICE:** This Reaction plugin is under active development and is not completed yet. Things may have bugs or are still missing,
 so please be aware of that and use it on your own risk.
 You may want to follow our [Reaction Blog](https://blog.reactioncommerce.com/building-and-launching-a-store-on-reaction/), where we're going to communicate the project's progress. If case you're interested in a sneak preview: The project's current state is deployed [here](https://dkjyyaycmpxzbfqnx.getreaction.io/) and will evolve over time.

---


This repository contains the reaction-swag-shop plugin that's intended as a learning resource for everybody
who's facing the task of customizing Reaction for her/his own shop implementation. Additionally, this repository drives
our real swag shop that's offering merchandising products at [swag.getreaction.io](http://swag.getreaction.io).


### Getting started
If you would like to use this shop plugin as a starting point for your own project, please follow the steps outlined below:

#### Step 1
Create a new Reaction project for your new shop: https://docs.reactioncommerce.com/reaction-docs/master/installation

#### Step 2
Clone this shop repository into the custom plugin folder. In your project directory, execute the following bash
 commands (Windows commands will look a bit different):
```
 $ cd <your-new-shop-directory-name>/imports/plugins/custom
 $ git clone https://github.com/reactioncommerce/reaction-swag-shop.git
```

#### Step 3
```
$ cd <your-new-shop-directory-name>
$ mkdir -p private/plugins/reaction-swag-shop
$ mkdir -p public/plugins/reaction-swag-shop
```

#### Step 4
Copy all items in folder /imports/plugins/custom/reaction-swag-shop/private recursively into it.
```
$ cp -Rv imports/plugins/custom/reaction-swag-shop/private/* private/plugins/reaction-swag-shop/
```

#### Step 5
Copy all items in folder /imports/plugins/custom/reaction-swag-shop/public recursively into it.
```
$ cp -Rv imports/plugins/custom/reaction-swag-shop/public/* public/plugins/reaction-swag-shop/
```

#### Step 6
Install dependencies and start Reaction
```
$ meteor npm install
$ export SKIP_FIXTURES=1 && reaction
```


### How the final swag shop will look like

![Swag shop screenshot](https://raw.githubusercontent.com/reactioncommerce/reaction-docs/master/assets/reaction-swag-shop.png)
