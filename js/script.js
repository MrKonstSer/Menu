window.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
          calc = require('./modules/calc'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          modals = require('./modules/modals'),
          sliders = require('./modules/sliders'),
          timer = require('./modules/timer');

    tabs();
    calc();
    cards();
    forms();
    modals();
    sliders();
    timer();      

});  
   