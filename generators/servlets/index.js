var generators = require('yeoman-generator');
require("../utils.js");
var twilio = require("../twilio.js");

module.exports = twilio.projects.Base.extend({
  framework_name : 'servlets',
  constructor: function () {
      twilio.projects.Base.apply(this, arguments);
  },
  prompting: function () {
    return this.generatePlatformPrompt([
      this.ask_webhooks,
      this.ask_seeding,
      {
        type    : 'confirm',
        name    : 'use_checkstyle',
        message : 'Validate with checkstyle?',
        store   : true
      }
    ], function (answers) {
    });
  },
  writing: function () {
    this.log('Copying servlets specific files');
    this.copyTplFile('README.md');
    this.copyTplFile('build.gradle');
    this.copyTplFile('settings.gradle');
    if(this.getTemplateVar('use_checkstyle'))
    {
      this.copyTplFile('config/checkstyle/checkstyle.xml');
    }else {
      this.deleteFile('config/');
    }
  }
});
