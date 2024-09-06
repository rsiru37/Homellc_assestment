import { useEffect, useState } from 'react'
//import './App.css'
import axios from "axios"
import { Card } from './components/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setusers] = useState<any[]>([]);
  const [selected_user,setuser] = useState<any>();
  const [homes,sethomes] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchUserData = async () =>{
      const response:any = await axios.get("http://localhost:3000/user/find-all");
      const usernames:string[] = response.data.users.map((user: { username: any; }) => user.username);
      setusers(response.data.users);
    }
    fetchUserData();
  }, [selected_user]);

  const handleUser = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value, 10);
    setuser(userId);
    setloading(true);
  }


  useEffect(() => {
    const fetchHomes = async() => {
      const homes:any = await axios.get("http://localhost:3000/home/find-by-user", { params: {selected_user}});
      if(homes?.data.homes){
        sethomes(homes.data.homes);
        setloading(false);
      }
      else{
        alert("Something Went wrong, Retry");
      }
      }
    fetchHomes();
  }, [selected_user]);

  return (
    <>
      <h1>HomeLLC Assestment</h1>
      <label htmlFor="user-select">Select a User: </label>
      <select id="user-select" value = {selected_user ?? ''} onChange={handleUser}>
        <option value="" disabled>Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <div className='row'>
        
        { !loading && homes?.map((card: any) => (
            <div className='col-md-2.5 mb-4' key ={card.id}>
              <Card home_id={card.id} addr = {card.street_address} state={card.state} zip={card.zip} sqft={card.sqft} beds={card.beds} baths={card.baths} list_price={card.list_price}/>
            </div>
          ))
        }
      </div>
      <div>
      {loading && <p style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: 0,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '48px'
        }}>Loading</p>}
        </div>
    </>
  )
}

export default App
