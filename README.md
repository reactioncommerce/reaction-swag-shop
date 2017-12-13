# Reaction Swag Shop


---

 **⚠ WIP NOTICE:** This Reaction plugin is under active development and is not completed yet. Things may have bugs or are still missing,
 so please be aware of that and use it on your own risk.
 You may want to follow our [Reaction Blog](https://blog.reactioncommerce.com/), where we're going to communicate the project's progress.  
 
---


This repository contains the reaction-swag-shop plugin that's intended as a learning resource for everybody
who's facing the task of customizing Reaction for her/his own shop implementation. Additionally, this repository drives
our real swag shop that's offering merchandising products at [swag.getreaction.io](swag.getreaction.io).


### Getting started
If you would like to use this shop plugin as a starting point for your own project, please follow the steps outlined below:

#### Step 1
Create a new Reaction project for your new shop: https://docs.reactioncommerce.com/reaction-docs/master/installation

#### Step 2
Clone this shop repository into the custom plugin folder. In your project directory, execute the following bash
 commands (Windows commands will look a bit different):
```
 $ cd <your-new-shop-directory-name>/imports/plugins/custom
 $ git clone https://github.com/reactioncommerce/reaction-swag-shop.git <your-new-shop-directory-name>
```

#### Step 3
Copy private asset files into your root application's /private folder
```
$ cp -Rv <your-new-shop-directory-name>/imports/plugins/custom/<your-new-shop-directory-name>/private/* <your-new-shop-directory-name>/private/plugins/<your-new-shop-directory-name>/
```

#### Step 4
Copy public files into your root application's /public folder
```
$ cp -Rv <your-new-shop-directory-name>/imports/plugins/custom/<your-new-shop-directory-name>/public/* <your-new-shop-directory-name>/public/plugins/<your-new-shop-directory-name>/
```

#### Step 5
Start Reaction
```
$ export SKIP_FIXTURES=1 && reaction run
```


### How the final swag shop will look like

![Swag shop screenshot](https://raw.githubusercontent.com/reactioncommerce/reaction-docs/master/assets/reaction-swag-shop.png)