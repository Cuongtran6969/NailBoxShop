package com.spring.nailshop.configuration;

import com.spring.nailshop.constant.PredefinedRole;
import com.spring.nailshop.entity.Category;
import com.spring.nailshop.entity.Role;
import com.spring.nailshop.entity.Shop;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.repository.CategoryRepository;
import com.spring.nailshop.repository.RoleRepository;
import com.spring.nailshop.repository.ShopRepository;
import com.spring.nailshop.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {
    PasswordEncoder passwordEncoder;

    @NonFinal
    static final String ADMIN_USER_NAME = "admin@gmail.com";
    @NonFinal
    static final String ADMIN_PASSWORD = "123456";

    // Các loại Nail box mới
    private static final List<String> NAIL_BOX_CATEGORIES = Arrays.asList(
            "Nail box cute",
            "Nail box đơn giản",
            "Nail box nữ tính",
            "Nail box đính hoa",
            "Nail box đính kim cương",
            "Nail box đính kim đá",
            "Nail box đính bướm",
            "Nail box đính nơ",
            "Nail box đính ngôi sao",
            "Nail box đính đá Swarovski",
            "Nail box mùa hè",
            "Nail box trang trí mùa thu",
            "Nail box cho cô dâu",
            "Nail box thiết kế riêng",
            "Nail box thiết kế chấm bi",
            "Nail box đính hoa tươi",
            "Nail box đơn giản nhưng sang trọng",
            "Nail box Giáng Sinh",
            "Nail box Tết",
            "Sơn móng tay",
            "Sơn gel cho móng tay",
            "Keo dán móng tay",
            "Kéo cắt móng tay",
            "Dũa móng tay",
            "Combo phụ kiện làm móng"
    );

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver"
    )
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository,
                                        ShopRepository shopRepository, CategoryRepository categoryRepository) {
        log.info("Initializing application.....");
        return args -> {
            if(roleRepository.findByName(PredefinedRole.ADMIN_ROLE).isEmpty()) {
                roleRepository.save(Role.builder()
                                .name(PredefinedRole.ADMIN_ROLE)
                                .description("Admin role")
                        .build());
            }
            if(roleRepository.findByName(PredefinedRole.USER_ROLE).isEmpty()) {
                roleRepository.save(Role.builder()
                        .name(PredefinedRole.USER_ROLE)
                        .description("User role")
                        .build());
            }
            if(roleRepository.findByName(PredefinedRole.STAFF_ROLE).isEmpty()) {
                roleRepository.save(Role.builder()
                        .name(PredefinedRole.STAFF_ROLE)
                        .description("Staff role")
                        .build());
            }
            for (String categoryName : NAIL_BOX_CATEGORIES) {
                if (categoryRepository.findByName(categoryName).isEmpty()) {
                    Category category = new Category();
                    category.setName(categoryName);
                    category.setDescription("Thể loại Nail box: " + categoryName);
                    categoryRepository.save(category);
                }
            }
            if(userRepository.findByEmail(ADMIN_USER_NAME).isEmpty()) {
                Role roleAdmin = roleRepository.findByName(PredefinedRole.ADMIN_ROLE).orElseThrow(() -> new UsernameNotFoundException("Not found amdin role"));

                User user = User.builder()
                        .email(ADMIN_USER_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .firstName("Tran")
                        .lastName("Cuong")
                        .name("Tran Cuong")
                        .phone("0383459560")
                        .role(roleAdmin)
                        .build();
                userRepository.save(user);
            }
            if(shopRepository.findAll().isEmpty()) {
                Shop shop = Shop.builder()
                        .name("NailLaShop")
                        .district_name("Dien Chau")
                        .province_name("Nghe An")
                        .ward_name("Dien Thai")
                        .bank_code("083838383999")
                        .bank_name("MB Bank")
                        .bank_account_name("TRAN VAN CUONG")
                        .phone("0383459560")
                        .build();
                shopRepository.save(shop);
            }

            log.info("Application initialization completed .....");
        };
    }
}
