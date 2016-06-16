package <%= java_package %>.application.config;

import com.google.inject.persist.PersistFilter;
import com.google.inject.servlet.ServletModule;
import <%= java_package %>.application.servlet.IndexServlet;

/**
 * Configure the servlets for the project
 */
public class <%= tutorial_classname %>ServletsGuiceConfig extends ServletModule {

  @Override
  public void configureServlets() {
    filter("/*").through(PersistFilter.class);
    serve("/").with(IndexServlet.class);
    //TODO Add extra paths here
  }
}
