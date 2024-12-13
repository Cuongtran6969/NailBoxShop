package com.spring.nailshop.repository;

import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.entity.Address;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.mapper.UserMapper;
import com.spring.nailshop.repository.specification.SpecSearchCriteria;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import static com.spring.nailshop.constant.AppConstant.SEARCH_SPEC_OPERATOR;

@Component
@Slf4j
@AllArgsConstructor
public class SearchRepository {
    @PersistenceContext
    private EntityManager entityManager;

    private final UserMapper userMapper;

    private static final String LIKE_FORMAT = "%%%s%%";

    public PageResponse searchUserByCriteriaWithJoin(Pageable pageable, String[] user, String[] address) {
        log.info("-------------- searchUserByCriteriaWithJoin --------------");

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> query = builder.createQuery(User.class);
        Root<User> userRoot = query.from(User.class);
        Join<Address, User> addressRoot = userRoot.join("addresses");

        List<Predicate> userPreList = new ArrayList<>();
        Pattern pattern = Pattern.compile(SEARCH_SPEC_OPERATOR);
        for (String u : user) {
            Matcher matcher = pattern.matcher(u);
            if (matcher.find()) {
                log.info("1: {}, 2: {}, 3: {}, 4: {}, 5: {}", matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5));
                SpecSearchCriteria searchCriteria = new SpecSearchCriteria(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5));
                userPreList.add(toUserPredicate(userRoot, builder, searchCriteria));
            }
        }

        List<Predicate> addressPreList = new ArrayList<>();
        for (String a : address) {
            Matcher matcher = pattern.matcher(a);
            if (matcher.find()) {
                SpecSearchCriteria searchCriteria = new SpecSearchCriteria(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5));
                log.info("1: {}, 2: {}, 3: {}, 4: {}, 5: {}", matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5));
                addressPreList.add(toAddressPredicate(addressRoot, builder, searchCriteria));
            }
        }

        Predicate userPre = builder.and(userPreList.toArray(new Predicate[0]));
        Predicate addPre = builder.and(addressPreList.toArray(new Predicate[0]));
        Predicate finalPre = builder.and(userPre, addPre);

        query.where(finalPre);

        List<User> users = entityManager.createQuery(query)
                .setFirstResult(pageable.getPageNumber())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        long count = countUserJoinAddress(user, address);

        return PageResponse.builder()
                .page(pageable.getPageNumber())
                .size(pageable.getPageSize())
                .total(count)
                .items(users.stream().map(userMapper::toUserResponse).toList())
                .build();
    }

    private Predicate toUserPredicate(Root<User> root, CriteriaBuilder builder, SpecSearchCriteria criteria) {
        log.info("-------------- toUserPredicate --------------");
        return switch (criteria.getOperation()) {
            case EQUALITY -> builder.equal(root.get(criteria.getKey()), criteria.getValue());
            case NEGATION -> builder.notEqual(root.get(criteria.getKey()), criteria.getValue());
            case GREATER_THAN -> builder.greaterThan(root.get(criteria.getKey()), criteria.getValue().toString());
            case LESS_THAN -> builder.lessThan(root.get(criteria.getKey()), criteria.getValue().toString());
            case LIKE -> builder.like(root.get(criteria.getKey()), "%" + criteria.getValue().toString() + "%");
            case STARTS_WITH -> builder.like(root.get(criteria.getKey()), criteria.getValue() + "%");
            case ENDS_WITH -> builder.like(root.get(criteria.getKey()), "%" + criteria.getValue());
            case CONTAINS -> builder.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
        };
    }

    private Predicate toAddressPredicate(Join<Address, User> root, CriteriaBuilder builder, SpecSearchCriteria criteria) {
        log.info("-------------- toAddressPredicate --------------");
        return switch (criteria.getOperation()) {
            case EQUALITY -> builder.equal(root.get(criteria.getKey()), criteria.getValue());
            case NEGATION -> builder.notEqual(root.get(criteria.getKey()), criteria.getValue());
            case GREATER_THAN -> builder.greaterThan(root.get(criteria.getKey()), criteria.getValue().toString());
            case LESS_THAN -> builder.lessThan(root.get(criteria.getKey()), criteria.getValue().toString());
            case LIKE -> builder.like(root.get(criteria.getKey()), "%" + criteria.getValue().toString() + "%");
            case STARTS_WITH -> builder.like(root.get(criteria.getKey()), criteria.getValue() + "%");
            case ENDS_WITH -> builder.like(root.get(criteria.getKey()), "%" + criteria.getValue());
            case CONTAINS -> builder.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
        };
    }

    private long countUserJoinAddress(String[] user, String[] address) {
        log.info("-------------- countUserJoinAddress --------------");

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        Root<User> userRoot = query.from(User.class);
        Join<Address, User> addressRoot = userRoot.join("addresses");

        List<Predicate> userPreList = new ArrayList<>();

        Pattern pattern = Pattern.compile(SEARCH_SPEC_OPERATOR);
        for (String u : user) {
            Matcher matcher = pattern.matcher(u);
            if (matcher.find()) {
                SpecSearchCriteria searchCriteria = new SpecSearchCriteria(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5));
                userPreList.add(toUserPredicate(userRoot, builder, searchCriteria));
            }
        }

        List<Predicate> addressPreList = new ArrayList<>();
        for (String a : address) {
            Matcher matcher = pattern.matcher(a);
            if (matcher.find()) {
                SpecSearchCriteria searchCriteria = new SpecSearchCriteria(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5));
                addressPreList.add(toAddressPredicate(addressRoot, builder, searchCriteria));
            }
        }

        Predicate userPre = builder.or(userPreList.toArray(new Predicate[0]));
        Predicate addPre = builder.or(addressPreList.toArray(new Predicate[0]));
        Predicate finalPre = builder.and(userPre, addPre);

        query.select(builder.count(userRoot));
        query.where(finalPre);

        return entityManager.createQuery(query).getSingleResult();
    }
}
