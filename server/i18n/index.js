import { loadTranslations } from "/server/startup/i18n";

import de from "./de.json";
import en from "./en.json";

//
// we want all the files in individual
// imports for easier handling by
// automated translation software
//
loadTranslations([en, de]);
