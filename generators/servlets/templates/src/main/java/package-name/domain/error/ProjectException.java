package <%= java_package %>.domain.error;

/**
* Exception for handled errors of the project
*/
public class <%= tutorial_classname %>Exception extends RuntimeException {

  public <%= tutorial_classname %>Exception(Throwable ex) {
    super("Unexpected exception: " + ex.getMessage(), ex);
  }

  public <%= tutorial_classname %>Exception(String message) {
    super(message);
  }
}
