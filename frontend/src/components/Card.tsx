import { useEffect, useState } from 'react'
import { EditUserModal } from './EditUser';


type CardProps = {
    home_id:number,
    addr: string;
    state: string;
    zip: string;
    sqft: number;
    beds: number;
    baths: number;
    list_price: number;
  };

const Card: React.FC<CardProps> = ({home_id,addr, state,zip,sqft,beds,baths,list_price}) => {
    const [showModel, setShowModel] = useState(false);
    return(
        <>
        <div className="card" style ={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">Street Address : {addr}</h5>
                <p className="card-text">State : {state}</p>
                <p className="card-text">Zip : {zip}</p>
                <p className="card-text">Area(sqft) : {sqft}</p>
                <p className="card-text">Beds : {beds}</p>
                <p className="card-text">Baths : {baths}</p>
                <p className="card-text">List Price : {list_price}</p>
                <button className="btn btn-primary" onClick={() => {setShowModel(true)}}>
                    Edit User
                </button>
            </div>
        </div>
        <EditUserModal addr = {addr} home_id={home_id} isOpen={showModel} onClose={() => setShowModel(false)}/>
        </>
    )
}

export {Card};