import { useEffect, useState } from 'react'
//import './App.css'
import axios from "axios"
import { Card } from './components/Card';

function App() {
  const [users, setusers] = useState<any[]>([]);
  const [selected_user,setuser] = useState<any>(0);
  const [homes,sethomes] = useState([]);
  console.log("Hi1");
  useEffect(() => {
    const fetchUserData = async () =>{
      console.log("H12");
      const response:any = await axios.get("http://localhost:3000/user/find-all");
      console.log("Users", response.data.users);
      const usernames:string[] = response.data.users.map((user: { username: any; }) => user.username);
      setusers(response.data.users);
    }
    fetchUserData();
  }, []);

  const handleUser = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value, 10);
    setuser(userId);
    console.log("Selected user_id", selected_user);
  }


  useEffect(() => {
    const fetchHomes = async() => {
      const homes:any = await axios.get("http://localhost:3000/home/find-by-user", { params: {selected_user}});
      if(homes?.data.homes){
        sethomes(homes.data.homes);
      }
      console.log("Homes", homes.data);
      }
    fetchHomes();
  }, [selected_user]);

  return (
    <>
      <h1>Vite + React</h1>
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
      {/* <Card addr = "hi" state="AP" zip="123" sqft={4546} beds={123} baths={37} list_price={69}/> */}
        {homes.length > 0 ? (
          homes?.map((card: any) => (
            <div className='col-md-2.5 mb-4' key ={card.id}>
              <Card home_id={card.id} addr = {card.street_address} state={card.state} zip={card.zip} sqft={card.sqft} beds={card.beds} baths={card.baths} list_price={card.list_price}/>
            </div>
          ))
        ) : (<p>    No Homes Available</p>)}
      </div>
    </>
  )
}

export default App
