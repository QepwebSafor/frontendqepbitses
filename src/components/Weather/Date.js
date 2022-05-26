import React from "react";

import { useDate } from "./useDate";
const Date = props => {

    const { date, time } = useDate();
    return( <div className="card-body bg-dark">

      <h6 className="mx-auto">
        {" "}
        <i className="fas fa-calendar fa-2x"></i>&nbsp;&nbsp;
        {date}
      </h6>
      <h6 className="mx-auto">
        <i className="fas fa-clock fa-2x"></i>&nbsp;&nbsp;
        {time}
      </h6>
    </div>

)
}

export default Date;