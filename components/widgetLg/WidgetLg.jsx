import { Visibility } from "@mui/icons-material";
import NextLink from 'next/link'
import Image from 'next/image'
export default function WidgetLg({ orders }) {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Latest new Orders </span>
      <ul className="widgetSmList">
        {
          orders.length > 0 ?
            (
              orders.map((item, index) => (
                <li key={index} className="widgetSmListItem">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PayPal_Logo_Icon_2014.svg/1200px-PayPal_Logo_Icon_2014.svg.png"
                    alt={item.paymentMethod}
                    className="widgetSmImg"
                  />
                  <div className="widgetSmUser">
                    <div className="totalAndDate">
                    <span className="widgetSmUsername" style={{ fontSize: '14px' }}>TOTAL: $ {item.totalPrice} </span>
                    <span className="widgetSmUsername" style={{ fontSize: '14px' }}>Created At: {item.createdAt.slice(0,10)} </span>
                    </div>
                    <span className="widgetSmUsername" style={{ fontSize: '12px' }}>Customer: {item.shippingAddress.fullName} </span>
                    <span className="widgetSmUserTitle" style={{ fontSize: '13px' }}>Destination: {item.shippingAddress.city} - {item.shippingAddress.address} </span>
                  </div>
                  <button className="widgetSmButton">
                    <Visibility className="widgetSmIcon" />
                    <NextLink href={`/order/${item._id}`} >
                      <a className="viewOrderButton">View Order</a>
                    </NextLink>
                  </button>
                </li>
              ))
            )
            :
            (<Typography variant="h3" component="h3">No Orders found</Typography>)
        }
      </ul>
    </div>
  );
}