var generators = require('yeoman-generator');
var chalk = require('chalk');

//Available frameworks for projects
exports.frameworks = {
    SERVLETS  : 'Servlets'
}

//Base proper
exports.common = {
  DEFAULT_INPUT_VALUE : 'CHANGE ME OR DELETE ME',
  validateText : function(context, input, minLength, errMsg)
  {
      var done = context.async();
      if (input.length < minLength) {
        done(errMsg);
        return;
      }
      done(null, true);
  }
}

//Base implementation
exports.Base = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  ask_webhooks : {
    type    : 'confirm',
    name    : 'use_webhooks',
    message : 'Your app uses webhooks?',
    store   : true
  },
  ask_seeding : {
    type    : 'confirm',
    name    : 'use_seeding',
    message : 'Create a seeding mechanism?',
    store   : true
  },
  ask_model : {
    type    : 'input',
    name    : 'model_name',
    message : 'Name of the main model',
    default : 'Example',
    filter  : modelName => modelName.trim().capFirst(),
    validate: function(input) { exports.common.validateText(this, input, 3, 'Enter a valid model name, e.g., Employee') },
    store   : true
  },
  generatePlatformPrompt : function(questionsArray, callback)
  {
    return this.prompt([{
       type    : 'input',
       name    : 'tutorial_title',
       message : 'Tutorial Verbose Title (platform agnostic)',
       default : this.toTitle(this.appname)
     }, {
       type    : 'input',
       name    : 'tutorial_name',
       message : 'Canonical Name',
       default : answers => answers.tutorial_title.toSlug()
     }].concat(questionsArray)).then(function (answers) {
       //Infered vars
       answers.project_lang = this.project_lang;
       answers.project_framework = this.project_framework;
       answers.database_name = answers.tutorial_name;
       answers.tutorial_shortname = answers.tutorial_name.shorten();
       answers.project_name  = answers.tutorial_name + "-" + this.project_framework;
       answers.tutorial_classname = answers.tutorial_title.replace(' ', '').capFirst();
       answers.tutorial_varname = answers.tutorial_classname.unCapFirst();
       //This vars gonna be seen by the template files
       this.exportAsTemplatesVars(answers);
       //Delegate to callback. If changes something should export variables.
       callback && callback.call(this, answers);
    }.bind(this)).catch(function(err){
       this.env.error("Interrupted while entering data: " + err);
    }.bind(this));
  },
  toTitle : function(text)
  {
     return text.replace(`${this.project_framework}`, '').trim().split(' ').map(word => word.trim().capFirst()).join(' ');
  },
  strong : function(text)
  {
     return chalk.cyan(text);
  },
  exportAsTemplatesVars : function(vars)
  {
     this.exported_vars = this.exported_vars || {};
     for(var key in vars)
     {
       this.exported_vars[key] = vars[key];
     }
  },
  getTemplateVar : function(varname)
  {
      return (typeof this.exported_vars[varname] === 'undefined') ? this.exported_vars : this.exported_vars[varname];
  },
  copyFile : function(sourceFile, destFile)
  {
     this.fs.copy(this.templatePath(sourceFile), this.destinationPath(destFile || sourceFile));
  },
  copyTplFile : function(sourceFile, destFile, options)
  {
     this.template(this.templatePath(sourceFile), this.destinationPath(destFile || sourceFile), this.exported_vars, options);
  },
  deleteFile : function(filename)
  {
     this.fs.delete(this.destinationPath(filename));
  }
});
