//package com.muji_ecomerce.server.config;
//
//import com.muji_ecomerce.server.services.JwtSerivice;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.NonNull;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
////@Component
////@RequiredArgsConstructor
//public class JwtFilterConfigAuthentication extends OncePerRequestFilter {
//
//    private  UserDetailsService userDetailsService;
//    private  JwtSerivice jwtService;
//    @Override
//    protected void doFilterInternal(
//            @NonNull HttpServletRequest request,
//            @NonNull HttpServletResponse response,
//            @NonNull FilterChain filterChain
//    ) throws ServletException, IOException {
//        final String authHeader = request.getHeader("Authorization");
//        final String userEmail;
//        final String jwt;
//        if(authHeader == null || authHeader.startsWith("Bearer ")){
//            filterChain.doFilter(request,response);
//            return;
//        }
//        jwt= authHeader.substring(7);
//        userEmail = jwtService.extractUserName(jwt);
//        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){
////            UserDetails userDetails = this.userDetailService.loadUserByUserName(userEmail);
//
//        }
//    }
//}
