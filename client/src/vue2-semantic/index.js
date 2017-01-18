import SmCards from './card/sm-cards';
import SmCard from './card/sm-card';
import SmSegment from './segment/sm-segment';

// All components.
const COMPONENTS = [
  SmCards,
  SmCard,
  SmSegment
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
