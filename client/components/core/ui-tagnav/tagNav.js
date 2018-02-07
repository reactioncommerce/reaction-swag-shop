import React from "react";
import { getRawComponent, replaceComponent, Components } from "@reactioncommerce/reaction-components";
import { DragDropProvider } from "/imports/plugins/core/ui/client/providers";


class TagNav extends getRawComponent("TagNav") {
  handleOpenSearchModal = async () => {
    this.props.closeNavbar();
    const { $ } = await import("meteor/jquery");
    // Simulate click. Workaround, until the search modal is react-ified
    $(".rui.navbar .search button").click();
  }

  render() {
    const { navbarOrientation, navbarPosition, navbarAnchor, navbarVisibility } = this.props;
    return (
      <div className={`rui tagnav ${navbarOrientation} ${navbarPosition} ${navbarAnchor} ${navbarVisibility}`}>
        <div className="navbar-header">
          <Components.Button
            primary={true}
            icon="times"
            status="default"
            className="close-button"
            onClick={this.props.closeNavbar}
          />
          <Components.Brand
            title={"reaction"}
          />
          <Components.FlatButton
            className="search-button"
            icon="fa fa-search"
            kind="flat"
            onClick={this.handleOpenSearchModal}
          />
          <Components.CartIcon closeNavbar={this.props.closeNavbar}/>
          {this.props.children}
        </div>
        <div className="navbar-items">
          <DragDropProvider>
            <Components.TagList
              {...this.props}
              isTagNav={true}
              draggable={true}
              enableNewTagForm={true}
            >
              <div className="dropdown-container">
                <Components.TagGroup
                  {...this.props}
                  editable={this.props.editable === true}
                  tagGroupProps={this.tagGroupProps(this.state.selectedTag || {})}
                  onMove={this.props.onMoveTag}
                  onTagInputBlur={this.handleTagSave}
                  onTagMouseOut={this.handleTagMouseOut}
                  onTagMouseOver={this.handleTagMouseOver}
                  onTagSave={this.handleTagSave}
                />
              </div>
            </Components.TagList>
          </DragDropProvider>
          {this.props.canEdit && this.renderEditButton()}

          <div className="flyout-dropdowns">
            <Components.LanguageDropdown />
            <Components.MainDropdown />
          </div>
        </div>
      </div>
    );
  }
}

replaceComponent("TagNav", TagNav);
