package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.VerifyTokenModel;
import org.springframework.stereotype.Service;

@Service
public interface VerifyTokenService {
    ResponeModelJson AddNewVerifyToken(VerifyTokenModel verifyTokenModel);

}
