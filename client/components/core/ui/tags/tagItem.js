import React from "react";
import { Components, replaceComponent, getRawComponent } from "@reactioncommerce/reaction-components";
import classnames from "classnames";
import { Button, Handle } from "/imports/plugins/core/ui/client/components/index";
import { Tags } from "/lib/collections/index";

/**
 A customized version of TagItem that does attach a onClick handler to the Handle icon and
 displays a popover when clicked

 Notice: For class extension we use the internal structure ComponentsTable, because
 the exported React component is already wrapped with a HOC. We need the rawComponent here to extend.
 */
class TagItem extends getRawComponent("TagItem") {
  constructor(...args) {
    super(...args);
    this.state = {
      popOverIsOpen: false,
      catTileImageUrl: this.tag.catTileImageUrl,
      catHeroImageUrl: this.tag.catHeroImageUrl,
      catHeroTitle: this.tag.catHeroTitle,
      catHeroSubtitle: this.tag.catHeroSubtitle
    };
  }

  handleHandleClick = () => {
    this.setState({
      popOverIsOpen: !this.state.popOverIsOpen
    });
  }

  handleImageUrlChange = (event, value) => {
    this.setState({
      [event.currentTarget.name]: value
    });
  }

  handleBlur = (event) => {
    let { value } = event.currentTarget;
    if (typeof value !== "string") {
      return;
    }
    value = value.trim();
    Tags.update(this.tag._id, {
      $set: {
        [event.currentTarget.name]: value
      }
    });
  }

  /**
   * handleMouseEnter: Popover content entered via mouse
   * When moving from hamburger icon into popover content, don't let it close.
   */
  handleMouseEnter = () => {
    this.canClose = false;
  }

  /**
   * handleMouseLeave: Moving out of popover content OR hamburger icon. Going to close
   * with delay.
   */
  handleMouseLeave = () => {
    this.canClose = true;
    setTimeout(() => {
      if (this.canClose) {
        this.setState({
          popOverIsOpen: false
        });
      }
    }, 200);
  }

  renderEditableTag() {
    const baseClassName = classnames({
      "rui": true,
      "tag": true,
      "edit": true,
      "draggable": this.props.draggable,
      "full-width": this.props.fullWidth
    });

    return this.props.connectDropTarget(<div onMouseLeave={this.handleMouseLeave} className="rui item edit draggable">
      <div
        className={baseClassName}
        data-id={this.props.tag._id}
      >
        <form onSubmit={this.handleTagFormSubmit}>
          <Components.Popover
            isOpen={this.state.popOverIsOpen}
            attachment="top left"
            targetAttachment="bottom left"
            constraints={[
              {
                to: "scrollParent",
                pin: true
              },
              {
                to: "window",
                attachment: "together"
              }
            ]}
            showDropdownButton={false}
          >
            <div ref="popoverContent"
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              className={"tag-image-form"}
            >
              <Components.TextField
                label="Category Tile Image URL"
                i18nKeyLabel="catTileImageUrl"
                type="text"
                name="catTileImageUrl"
                value={this.state.catTileImageUrl}
                onBlur={this.handleBlur}
                onChange={this.handleImageUrlChange}
              />
              <Components.TextField
                label="Category Hero Image URL"
                i18nKeyLabel="catHeroImageUrl"
                type="text"
                name="catHeroImageUrl"
                value={this.state.catHeroImageUrl}
                onBlur={this.handleBlur}
                onChange={this.handleImageUrlChange}
              />
            </div>
          </Components.Popover>
          <Handle onClick={this.handleHandleClick} connectDragSource={this.props.connectDragSource} />
          {this.renderAutosuggestInput()}
          <Button icon="times-circle" onClick={this.handleTagRemove} status="danger" />
          {this.props.isTagNav &&
          <Button icon="chevron-down" onClick={this.handleTagSelect} status="default" />
          }
        </form>
      </div>
    </div>);
  }
}

replaceComponent("TagItem", TagItem);

export default TagItem;
