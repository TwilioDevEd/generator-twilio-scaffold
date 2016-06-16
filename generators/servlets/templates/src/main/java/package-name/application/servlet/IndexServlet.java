package <%= java_package %>.application.servlet;

import com.google.inject.persist.Transactional;
import <%= java_package %>.domain.error.<%= tutorial_classname %>Exception;
import <%= java_package %>.domain.repository.<%= model_name %>Repository;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Singleton
public class IndexServlet extends HttpServlet {

  private static final Logger LOG = Logger.getLogger(IndexServlet.class.getName());

  private final <%= model_name %>Repository repository;

  @Inject
  public IndexServlet(final <%= model_name %>Repository repository) {
    this.repository = repository;
  }

  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
      IOException {
    req.setAttribute("param-name", "param-value");
    req.getRequestDispatcher("index.jsp").forward(req, resp);
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
      IOException {
    Optional<String> fullNameQuery = Optional.ofNullable(req.getParameter("param-name"));
    req.getRequestDispatcher("endpoint-servlet-path").forward(req, resp);
  }
<% if(use_seeding){ %>
  @Override
  @Transactional
  public void init(ServletConfig config) throws ServletException {
    super.init(config);
    try {
      // @TODO install data
      LOG.info("Installing...");
    } catch (Exception ex) {
      LOG.log(Level.SEVERE, "Unexpected error during setup: " + ex.getMessage());
    }
  }

  private URI getResourceURI() {
    Optional<URL> url =
        Optional.ofNullable(this.getClass().getResource(File.separator + "filetoload.json"));
    return url.map(u -> {
      try {
        return u.toURI();
      } catch (Exception e) {
        throw new <%= tutorial_classname %>Exception(e);
      }
    }).orElseThrow(
        () -> new <%= tutorial_classname %>Exception("Not possible to retrieve resource during installation"));
  }
<% } %>
}
