import React from "react";
import { Components } from "@reactioncommerce/reaction-components";
import LanguageDropdownCore from "/imports/plugins/core/i18n/client/components/languageDropdown";


class LanguageDropdown extends LanguageDropdownCore {
  buttonElement() {
    return (
      <Components.Button containerStyle={{ color: "#000" }}>
        <Components.Translation defaultValue="Language" i18nKey="templateGrid.columns.language" />&nbsp;

        <i className="fa fa-chevron-down"/>
      </Components.Button>
    );
  }
}

export default LanguageDropdown;
