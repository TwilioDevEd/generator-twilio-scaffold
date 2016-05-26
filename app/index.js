var generators = require('yeoman-generator');
var frameworks = {
  LARAVEL : 'Laravel',
  FLASK   : 'Flask',
  NET     : '.NET',
  RAILS   : 'Rails',
  SINATRA : 'Sinatra',
  SERVLETS: 'Servlets',
  EXPRESS : 'Express'
};
var DEFAULT_INPUT_VALUE = 'CHANGE ME OR DELETE ME';

module.exports = generators.Base.extend({
  prompting: {
    frameworkPrompt: function() {
      return this.prompt([{
        type    : 'list',
        name    : 'framework',
        message : 'Used Framework',
        choices : [
          frameworks.LARAVEL,
          frameworks.FLASK,
          frameworks.NET,
          frameworks.RAILS,
          frameworks.SINATRA,
          frameworks.SERVLETS,
          frameworks.EXPRESS
        ],
        default : frameworks.RAILS
      }]).then(function (answers) {
        console.log(answers);
        this.chosenFramework = answers.framework;
      }.bind(this));
    },
    optionsPrompt: function() {
      return this.prompt([{
        type    : 'input',
        name    : 'tutorialName',
        message : 'Tutorial Name',
        default : DEFAULT_INPUT_VALUE
      }, {
        type    : 'input',
        name    : 'repoName',
        message : 'Repo Name',
        default : DEFAULT_INPUT_VALUE
      }, {
        type    : 'input',
        name    : 'dbName',
        message : 'Database Name',
        default : DEFAULT_INPUT_VALUE
      }, {
        type    : 'input',
        name    : 'ngrokEndPoint',
        message : 'Ngrok End Point Path',
        default : DEFAULT_INPUT_VALUE
      }]).then(function (answers) {
        console.log(answers);
        this.tutorialName = answers.tutorialName;
        this.repoName = answers.repoName;
        this.dbName = answers.dbName,
        this.ngrokEndPoint = answers.ngrokEndPoint
      }.bind(this));
    }
  },
  writing: function () {
    console.log(this.chosenFramework);
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        frameworkName: this.chosenFramework,
        tutorialName: this.tutorialName,
        repoName: this.repoName,
        dbName: this.dbName,
        ngrokEndPoint: this.ngrokEndPoint
      }
    );
  }
});
