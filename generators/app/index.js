var generators = require('yeoman-generator');
require("../utils.js");
var twilio = require("../twilio.js");

var frameworks = twilio.frameworks;

module.exports = twilio.Base.extend({
  constructor: function () {
      twilio.Base.apply(this, arguments);
      console.log(require('../twilio-welcome'));
  },
  prompting: function(){
      return this.prompt([{
        type    : 'list',
        name    : 'framework',
        message : 'Which framework are you going to use?',
        choices : frameworks.toArray(),
        default : frameworks.RAILS
      }]).then(function (answers) {
         //Infered vars
         answers.framework_name = answers.framework.toSlug();
         //This vars gonna be seen by the template files
         this.exportAsTemplatesVars(answers);
         //Delegate to platform generator
         this.composeWith('twilio-scaffold:' + this.getTemplateVar('framework_name'));
      }.bind(this)).catch(function(err){
         this.env.error("Interrupted: " + err);
      }.bind(this));
  },
  writing: function () {
    this.log('Copying general files...');
    this.copyFile('.editorconfig');
  }
});
