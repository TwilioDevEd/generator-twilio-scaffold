package <%= java_package %>.domain.<%= model_name.unCapFirst() %>Repository;

import <%= java_package %>.domain.model.<%= model_name %>;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * Handle {@link <%= model_name %>} entities in the database
 */
public class <%= model_name %>Repository {

  private final CriteriaBuilder criteriaBuilder;

  private EntityManager entityManager;

  @Inject
  public <%= model_name %>Repository(EntityManager entityManager) {
    this.entityManager = entityManager;
    this.criteriaBuilder = entityManager.getCriteriaBuilder();
  }

  /**
   * Add multiple entries wrapped in a {@link Iterable<<%= model_name %>>} element
   *
   * @param entries {@link Iterable<<%= model_name %>>} not <code>null<code>
   */
  public void addAll(Iterable<<%= model_name %>> entries) {
    entries.forEach(entityManager::persist);
  }

  /**
   * Add one or more entries of {@link <%= model_name %>}
   *
   * @param entries Instances of {@link <%= model_name %>} to add
   */
  public void add(<%= model_name %>... entries) {
    addAll(Arrays.asList(entries));
  }

  /**
   * Retrieve all available entries of {@link <%= model_name %>}
   *
   * @return A {@link List<<%= model_name %>>} not <code>null</code>
   */
  public List<<%= model_name %>> getAll() {
    CriteriaQuery<<%= model_name %>> query = criteriaBuilder.createQuery(<%= model_name %>.class);
    Root<<%= model_name %>> root = query.from(<%= model_name %>.class);
    CriteriaQuery<<%= model_name %>> select = query.select(root);
    return entityManager.createQuery(select).getResultList();
  }

  /**
   * Gets a {@link <%= model_name %>} by its <code>id</code>
   *
   * @param id The {@link <%= model_name %>#id} property value
   * @return An {@link Optional} with the {@link <%= model_name %>} found or
   *         {@link Optional#empty()}
   */
  public Optional<<%= model_name %>> find<%= model_name %>ById(Long id) {
    return Optional.ofNullable(entityManager.find(<%= model_name %>.class, id));
  }
}
