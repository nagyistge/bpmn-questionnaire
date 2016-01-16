'use strict';

var TestHelper = module.exports = require('bpmn-js/test/helper');

// Insert bpmn-questionnaire styles
TestHelper.insertCSS('bpmn-questionnaire.min.css', require('../dist/css/bpmn-questionnaire.min.css'));

// Insert additional styles for test container
TestHelper.insertCSS('bpmn-questionnaire-testing.css', require('../assets/css/bpmn-questionnaire-testing.css'));