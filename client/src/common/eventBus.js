import Vue from 'vue';

let bus = new Vue();

class EventBus {
  constructor() {
  }

  on(eventName, handler, scope) {
    let eventObj = bus.$on(eventName, handler.bind(scope || null));
    if(scope){
      scope.$on('$beforeDestroy', () => {
        eventObj.$destory();
      });
    }
  }

  once(eventName, handler, scope){
    bus.$once(eventName, handler.bind(scope || null));
  }

  emit(eventName, data) {
    bus.$dispatch(eventName, data);
  }
};

export const eventBus = new EventBus();
