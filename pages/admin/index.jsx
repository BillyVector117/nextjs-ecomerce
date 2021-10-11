
import { userData } from "../../dummyData";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";

import { useEffect } from "react";
import Chart from "../../components/chart/Chart";
import WidgetSm from "../../components/widgetLg/WidgetLg";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import LayoutAdmin from "../../components/LayoutAdmin";

function Index() {
    useEffect(() => {

    }, [])
    return (
        <LayoutAdmin title="Admin" currentSection="Home">
            <div className="home">
                <FeaturedInfo />

                <Chart className="animate__fadeInDownBig" data={userData} title="User Analytics" grid dataKey="Active User" />
                <div className="homeWidgets">
                    <WidgetSm className="animate__fadeInDownBig" />
                    <WidgetLg />
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default Index
