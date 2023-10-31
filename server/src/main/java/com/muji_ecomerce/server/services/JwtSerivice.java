package com.muji_ecomerce.server.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtSerivice {
    private static String SECRET_KEY="skjwsuioeiohf2w3hwihf8whchw4fhwoiyt093qriwyh8whwofthw8w@!@#$%^&*#$@$#%$#%@#$%$$%%^%^jkdxfgjklhdsjikfghjkdshfth'804j";
    public String extractUserName(String token) {

        return ExtractClaim(token,Claims::getSubject);
    }

    public <T> T ExtractClaim(String token, Function<Claims,T> claimResolver){
        final Claims claims = extracAllClamins(token);
        return claimResolver.apply(claims);
    }
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }
    public boolean isTokenValid(String token,UserDetails userDetails){
        final String userName= extractUserName(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return ExtractClaim(token,Claims::getExpiration);
    }

    public String generateToken(
            Map<String,Object> extraClaims,
            UserDetails userDetails
    ){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    private Claims extracAllClamins(String Token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(Token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
