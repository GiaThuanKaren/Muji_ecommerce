package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Supplier;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.SupplierModel;
import com.muji_ecomerce.server.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SupplierImplementService implements SupplierService{

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public ResponeModelJson getAll() {
        return new ResponeModelJson(HttpStatus.OK,"OKe",supplierRepository.findAll());
    }

    @Override
    public ResponeModelJson updateSupplier(SupplierModel supplierModel) {
        Optional<Supplier> supplierFound = supplierRepository.findById(supplierModel.getSupplier_id());
        if(!supplierFound.isPresent())
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Supplier ID");
        supplierFound.get().setSupplier_name(
                supplierModel.getSupplier_name()
        );
        supplierFound.get().setSupplier_address(
                supplierModel.getSupplier_address()
        );

        return new ResponeModelJson(HttpStatus.OK,"Done",supplierRepository.save(supplierFound.get()));
    }

    @Override
    public ResponeModelJson createNewSupplier(SupplierModel supplierModel) {
        System.out.println("Supplier name ->>>>>" + supplierModel.getSupplier_name());
        Supplier supplier = new Supplier();
        supplier.setSupplier_address(
                supplierModel.getSupplier_address()
        );
        supplier.setSupplier_name(
                supplierModel.getSupplier_name()
        );

        return new ResponeModelJson(HttpStatus.OK,"Done",supplierRepository.save(supplier));
    }


    @Override
    public ResponeModelJson deleteSupplierById(Long id) {
        supplierRepository.deleteById(id);
        return new ResponeModelJson(HttpStatus.OK,"Done");
    }
}
