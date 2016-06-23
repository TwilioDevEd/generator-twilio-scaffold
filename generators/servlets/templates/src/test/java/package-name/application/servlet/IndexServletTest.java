package <%= java_package %>.application.servlet;


import <%= java_package %>.domain.repository.<%= model_name %>Repository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class IndexServletTest {

  @Mock
  private HttpServletRequest requestMock;

  @Mock
  private HttpServletResponse responseMock;

  @Mock
  private <%= model_name %>Repository <%= tutorial_varname %>RepositoryMock;

  @InjectMocks
  private IndexServlet indexServlet;

  @Test
  public void testDoGet() throws Exception {
    RequestDispatcher requestDispatcherMock = mock(RequestDispatcher.class);
    when(requestMock.getRequestDispatcher(anyString())).thenReturn(requestDispatcherMock);
    indexServlet.doGet(requestMock, responseMock);
    verify(requestDispatcherMock, times(1)).forward(requestMock, responseMock);
  }
}
