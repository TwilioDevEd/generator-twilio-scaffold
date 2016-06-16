package <%= java_package %>.application.config;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.persist.jpa.JpaPersistModule;
import com.google.inject.servlet.GuiceServletContextListener;

public class BeansGuiceConfig extends GuiceServletContextListener {

  @Override
  protected Injector getInjector() {
    return Guice.createInjector(new JpaPersistModule("jpa-<%= tutorial_name %>"),
        new <%= tutorial_classname %>ServletsGuiceConfig());
  }
}
