import { Visibility } from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import Image from 'next/image'
export default function WidgetSm({ users }) {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          users.length > 0 ?
            (
              users.map((item, index) => (
                <li key={index} className="widgetSmListItem">
                  <Image
                    src="https://via.placeholder.com/150"
                    alt={item.name}
                    className="widgetSmImg"
                  />
                  <div className="widgetSmUser">
                    <span className="widgetSmUsername">{item.name}</span>
                    <span className="widgetSmUserTitle">{item.isAdmin ? "ADMIN" : "Standard Member"} </span>
                  </div>
                  <button className="widgetSmButton">
                    <Visibility className="widgetSmIcon" />
                    Display
                  </button>
                </li>

              ))
            )
            :
            (<Typography variant="h3" component="h3">No members found</Typography>)
        }
      </ul>
    </div >
  );
}
