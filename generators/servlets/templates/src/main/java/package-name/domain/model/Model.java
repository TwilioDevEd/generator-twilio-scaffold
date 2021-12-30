package <%= java_package %>.domain.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class <%= model_name %> {

  @Id
  @GeneratedValue
  private Long id;

  private String fullName;

  private <%= model_name %>() { }

  public <%= model_name %>(String fullName, String email, String phoneNumber, String imageUrl) {
    this.fullName = fullName;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  @Override
  public String toString() {
    return fullName;
  }
}
