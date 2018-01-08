import React from "react";
import { Components, ComponentsTable, replaceComponent } from "@reactioncommerce/reaction-components";
import classnames from "classnames";
import { Button, Handle } from "/imports/plugins/core/ui/client/components";
import { Tags } from "/lib/collections";

/**
 A customized version of TagItem that does attach a onClick handler to the Handle icon and
 displays a popover when clicked

 Notice: For class extension we use the internal structure ComponentsTable, because
 the exported React componente is already wrapped with a HOC. We need the rawComponent here to extend.
 */
class TagItem extends ComponentsTable.TagItem.rawComponent {
  constructor() {
    super(...arguments);
    this.state = {
      popOverIsOpen: false,
      imageUrl: this.tag.imageUrl
    };
  }

  handleHandleClick = () => {
    this.setState({
      popOverIsOpen: !this.state.popOverIsOpen
    });
  }

  handleImageUrlChange = (event, value) => {
    this.setState({
      imageUrl: value
    });
  }

  handleBlur = (event) => {
    let value = event.currentTarget.value;
    if (typeof value !== "string") {
      return;
    }
    value = value.trim();
    Tags.update(this.tag._id, {
      $set: {
        imageUrl: value
      }
    });
    this.setState({
      popOverIsOpen: false
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

    return (
      this.props.connectDropTarget(
        <div onMouseLeave={this.handleMouseLeave} className="rui item edit draggable">
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
                <div ref="popoverContent" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className={"tag-image-form"}>
                  <Components.TextField
                    label="Image URL"
                    i18nKeyLabel="imageUrl"
                    type="text"
                    name="imageUrl"
                    value={this.state.imageUrl}
                    onBlur={this.handleBlur}
                    onChange={this.handleImageUrlChange} />
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
        </div>
      )
    );
  }
}

replaceComponent("TagItem", TagItem);

export default TagItem;
