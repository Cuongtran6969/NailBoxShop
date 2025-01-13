package com.spring.nailshop.service.impl;

import com.spring.nailshop.service.JwtService;
import com.spring.nailshop.util.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtServiceImpl implements JwtService {
    @NonFinal
    @Value("${jwt.secret-key}")
    private String SECRET_KEY;

    @NonFinal
    @Value("${jwt.refresh-key}")
    private String REFRESH_KEY;

    private long expiryTime = 1;

    private long expiryDay = 7;

    @Override
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // Thêm role vào claims
        String roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        claims.put("role", roles);
        return generateToken(claims, userDetails);
    }

    @Override
    public String generateRefreshToken(UserDetails userDetails) {
        return generateRefreshToken(new HashMap<>(), userDetails);
    }

    @Override
    public String extractUsername(String token, TokenType type) {
        return extractClaims(token, type, Claims::getSubject);
    }

    @Override
    public String extractRole(String token, TokenType type) {
        return extractClaims(token, type, claims -> claims.get("role", String.class));
    }

    @Override
    public boolean isValid(String token, TokenType type, UserDetails user) {
       String username = extractUsername(token, type);
       return (username.equals(user.getUsername()) && !isTokenExpired(token, type));
    }

    private String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(claims)//thong tin bi mat khong public (ma hoa thong tin)
                .setSubject(userDetails.getUsername())//khong trung lap
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date((System.currentTimeMillis() + 1000*60*60*expiryTime)))
                .signWith(getKey(TokenType.ACCESS_TOKEN), SignatureAlgorithm.HS256)//dinh nghia thuat toan
                .compact();
    }

    private String generateRefreshToken(Map<String, Object> claims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(claims)//thong tin bi mat khong public (ma hoa thong tin)
                .setSubject(userDetails.getUsername())//khong trung lap
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date((System.currentTimeMillis() + 1000*60*60*expiryDay)))
                .signWith(getKey(TokenType.REFRESH_TOKEN), SignatureAlgorithm.HS256)//dinh nghia thuat toan
                .compact();
    }

    private Key getKey(TokenType type) {
        switch (type) {
            case ACCESS_TOKEN -> {
                return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));//ma hoa secrekey va giai ma
            }
            case REFRESH_TOKEN -> {
                return Keys.hmacShaKeyFor(Decoders.BASE64.decode(REFRESH_KEY));//ma hoa secrekey va giai ma
            }
            default -> throw new IllegalStateException("Unexpected value: " + type);
        }
    }

    private boolean isTokenExpired(String token, TokenType type) {
        return extractExpiration(token, type).before(new Date());
    }

    private Date extractExpiration(String token, TokenType type) {
        return extractClaims(token, type, Claims::getExpiration);
    }

    public <T> T extractClaims(String token, TokenType type, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token, type);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token, TokenType type) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getKey(type))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
