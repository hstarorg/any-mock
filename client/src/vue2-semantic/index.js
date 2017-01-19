import SmCards from './card/sm-cards';
import SmCard from './card/sm-card';
import SmSegment from './segment/sm-segment';
import SmDropdown from './dropdown/sm-dropdown';
import SmDropdownList from './dropdown/sm-dropdown-list';
import SmCheckbox from './checkbox/sm-checkbox';
import SmRadio from './checkbox/sm-radio';

// All components.
const COMPONENTS = [
  SmCards,
  SmCard,
  SmSegment,
  SmDropdown,
  SmDropdownList,
  SmCheckbox,
  SmRadio
];

const install = function (Vue) {
  if (install.installed) return;
  COMPONENTS.forEach(comp => {
    Vue.component(comp.name, comp);
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  install,
  version: '0.0.1'
};
