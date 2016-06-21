var generators = require('yeoman-generator');
require("../utils.js");
var twilio = require("../twilio.js");

module.exports = twilio.Base.extend({
  framework_name : 'servlets',
  src_package_folder : 'src/main/java/package-name',
  constructor: function () {
      twilio.Base.apply(this, arguments);
  },
  getTargetFolder : function() { return 'src/main/java/com/twilio/' + this.getTemplateVar('package_name') },
  prompting: function () {
    return this.generatePlatformPrompt([
      this.ask_webhooks,
      this.ask_seeding,
      this.ask_model,
      {
        type    : 'confirm',
        name    : 'use_checkstyle',
        message : 'Validate with checkstyle?',
        store   : true
      }
    ], (answers) => {
       let servlet_infered_answers = {};
       servlet_infered_answers.package_name  = answers.tutorial_name.minimize();
       servlet_infered_answers.java_package = 'com.twilio.' + servlet_infered_answers.package_name;
       this.exportAsTemplatesVars(servlet_infered_answers);
    });
  },
  writing: {
    installGeneralFiles : function () {
      this.log("Copying general files for servlets' project...");
      this.copyTplFile('README.md');
      this.copyTplFile('build.gradle');
      this.copyTplFile('settings.gradle');
      if(this.getTemplateVar('use_checkstyle'))
      {
        this.copyTplFile('config/checkstyle/checkstyle.xml');
      }else {
        this.deleteFile('config');
      }
    },
    installClassesFiles : function() {
      let package_folder = this.getTargetFolder();
      let java_package = this.getTemplateVar('java_package');
      let model_name = this.getTemplateVar('model_name');
      let tutorial_classname = this.getTemplateVar('tutorial_classname');
      this.log(`Setting Up package ${this.strong(java_package)} and resources...`);
      this.copyTplFile(this.src_package_folder + '/application/servlet/IndexServlet.java',
                      package_folder  + '/application/servlet/IndexServlet.java');
      this.copyTplFile(this.src_package_folder + '/application/config/BeansGuiceConfig.java',
                      package_folder  + '/application/config/BeansGuiceConfig.java');
      this.copyTplFile(this.src_package_folder + '/application/config/ProjectServletsGuiceConfig.java',
                      package_folder  + `/application/config/${tutorial_classname}ServletsGuiceConfig.java`);
      this.copyTplFile(this.src_package_folder + '/domain/common/Twilio.java',
                      package_folder  + '/domain/common/Twilio.java');
      this.copyTplFile(this.src_package_folder + '/domain/common/Utils.java',
                      package_folder  + '/domain/common/Utils.java');
      this.copyTplFile(this.src_package_folder + '/domain/error/ProjectException.java',
                      package_folder  + `/domain/error/${tutorial_classname}Exception.java`);
      this.copyTplFile(this.src_package_folder + '/domain/model/Model.java',
                      package_folder  + `/domain/model/${model_name}.java`);
      this.copyTplFile(this.src_package_folder + '/domain/repository/ModelRepository.java',
                      package_folder  + `/domain/repository/${model_name}Repository.java`);
    },
    installResourceFiles : function() {
      let tutorial_name = this.getTemplateVar('tutorial_name');
      this.log('Installing resources...');
      this.copyTplFile('.travis.yml');
      this.copyTplFile('.gitignore');
      this.copyTplFile('.env.example');
      this.copyTplFile('LICENSE');
      this.copyTplFile('src/main/resources/META-INF/persistence.xml');
      this.copyTplFile('src/main/webapp/index.jsp');
      this.copyTplFile('src/main/webapp/css/main.css',`src/main/webapp/css/${tutorial_name}.css`);
      this.copyTplFile('src/main/webapp/WEB-INF/web.xml');
    }
  }
});
