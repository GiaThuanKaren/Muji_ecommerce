import React from "react";
import { ProductResponeModel } from "src/Model/apiModel";
import { ICON, IconSolid } from "src/utils";
import { ProductCartItem } from "src/utils/constant";

type ProductCartItemProps = ProductCartItem & { onQuantityChange: (newQuantity: number) => void }

function CartItem({ item, quantity, onQuantityChange }: ProductCartItemProps) {
    const [numberProductAddToCard, setNumberProductAddToCard] = React.useState(1);
    return ( 
        <div className='flex mb-2'>
            <img className='w-14 h-16 object-cover rounded-md mr-2' src={item.image} alt="" />
            <div className='flex flex-col flex-wrap text-[13px]'>
                <p>{item.name}</p>
                <p>&times; {quantity}</p>
                <p>{item.price}đ</p>
            </div>
            <div className='flex items-center border-2 border-[#a5a4a4] w-fit h-5 px-3 py-1'>
                <ICON onClick={() => {
                    if (numberProductAddToCard !== 1) {
                        setNumberProductAddToCard(numberProductAddToCard - 1)
                    }
                    onQuantityChange(numberProductAddToCard - 1);
                } } 
                className={" " + `${numberProductAddToCard == 1 ? " text-slate-400 " : "  "}`} icon={IconSolid.faMinus} />
                <h3 className='mx-3 text-lg px-2'>
                    {numberProductAddToCard}
                </h3>
                <ICON onClick={() => {
                    setNumberProductAddToCard(numberProductAddToCard + 1)
                    onQuantityChange(numberProductAddToCard + 1);
                }} className='' icon={IconSolid.faPlus} />
            </div>
        </div>
    );
}

export default CartItem;