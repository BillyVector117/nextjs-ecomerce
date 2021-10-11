
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetSm() {
  const [newUser, setNewUser] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("https://api-netflix-app.herokuapp.com/users/?limit=true", {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            authtoken:
              "Bearer " + JSON.parse(localStorage.getItem("user")).myToken,
          },
        })
        setNewUser(response.data)
      } catch (error) {
        console.error(error)
      } 
    }
    getUsers()
  }, []);
  console.log("new users: ", newUser)
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUser.map((item, index) => (
          <li key={index} className="widgetSmListItem">
            <img
              src="data:image/png;base64,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"
              alt={item.username}
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{item.username}</span>
              <span className="widgetSmUserTitle">{item.isAdmin ? "VIP User" : "Standar User"} </span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>

        ))}
      </ul>
    </div>
  );
}
