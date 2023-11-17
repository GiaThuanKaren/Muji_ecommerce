import { ProductResponeModel } from "src/Model/apiModel";
import { ProductCartItem } from "src/utils/constant";


function CartItem({ item, quantity }: ProductCartItem) {

    return ( 
        <div className='flex mb-2'>
            <img className='w-14 h-16 object-cover rounded-md mr-2' src={item.image} alt="" />
            <div className='flex flex-col flex-wrap text-[13px]'>
                <p>{item.name}</p>
                <p>&times; {quantity}</p>
                <p>{item.price}đ</p>
            </div>
            {/* <div>
                <p>Quantity</p>
            </div> */}
        </div>
    );
}

export default CartItem;