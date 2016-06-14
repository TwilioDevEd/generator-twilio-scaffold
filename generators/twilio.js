var generators = require('yeoman-generator');

//Available frameworks for projects
exports.frameworks = {
    SERVLETS: 'Servlets',
    /*
    @TODO
    LARAVEL : 'Laravel',
    FLASK   : 'Flask',
    NET     : '.NET',
    RAILS   : 'Rails',
    SINATRA : 'Sinatra',
    EXPRESS : 'Express'*/
}

//Base proper
exports.projects = {
  DEFAULT_INPUT_VALUE : 'CHANGE ME OR DELETE ME'
}

//Base implementation
exports.projects.Base = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  ask_webhooks : {
    type    : 'confirm',
    name    : 'use_webhooks',
    message : 'Your app uses webhooks?',
    default : exports.projects.DEFAULT_INPUT_VALUE
  },
  ask_seeding : {
    type    : 'confirm',
    name    : 'use_seeding',
    message : 'Create a seeding mechanism?',
    default : exports.projects.DEFAULT_INPUT_VALUE
  },
  generatePlatformPrompt : function(questionsArray, callback)
  {
    return this.prompt([{
       type    : 'input',
       name    : 'tutorial_title',
       message : 'Tutorial Verbose Title (platform agnostic)',
       default : this.appname.toTitle()
     }, {
       type    : 'input',
       name    : 'tutorial_name',
       message : 'Canonical Name',
       default : function(answers)
       {
         return answers.tutorial_title.toSlug();
       }
     }].concat(questionsArray)).then(function (answers) {
       //Infered vars
       answers.database_name = answers.tutorial_name;
       answers.project_name = answers.tutorial_name + "-" + this.framework_name;
       //This vars gonna be seen by the template files
       this.exportAsTemplatesVars(answers);
       //Delegate to callback
       callback.call(this, answers);
    }.bind(this)).catch(function(err){
       this.env.error("Interrupted while entering data: " + err);
    }.bind(this));
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
      return this.exported_vars[varname] || this.exported_vars;
  },
  copyFile : function(filename)
  {
     this.fs.copy(filename, filename);
  },
  copyTplFile : function(filename)
  {
     this.fs.copyTpl(this.templatePath(filename), this.destinationPath(filename), this.exported_vars);
  },
  deleteFile : function(filename)
  {
     this.fs.delete(this.destinationPath(filename));
  },
  processDirectory : function(source, destination) {
      var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
      var files = this.expandFiles('**', { dot: true, cwd: root });

      for (var i = 0; i < files.length; i++) {
          var f = files[i];
          var src = path.join(root, f);
          if(path.basename(f).indexOf('_') == 0){
              var dest = path.join(destination, path.dirname(f), path.basename(f).replace(/^_/, ''));
              this.template(src, dest);
          }
          else{
              var dest = path.join(destination, f);
              this.copy(src, dest);
          }
      }
  }
});
