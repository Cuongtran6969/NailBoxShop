package com.spring.nailshop.constant;

import java.util.regex.Pattern;

public interface AppConstant {
    String SEARCH_OPERATOR = "(\\w+?)(:|<|>)(.*)";
    String SEARCH_SPEC_OPERATOR = "(\\w+?)([:><~!])(.*)(\\p{Punct}?)(.*)(\\p{Punct}?)";
    String SORT_BY = "(\\w+?)(:)(.*)";
}
