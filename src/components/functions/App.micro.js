import { useContext, useState } from "react";
import { useHistory } from "react-router";
import AppRequest from "./App.request";
import { PeopleContext } from "../../context/peopleContext";

export default function Micro() {
  const req = AppRequest();
  const route = useHistory();

  const [state, dispatch] = useContext(PeopleContext);

  // Max = Maximum number pagination
  // Per = Total Data Per Page
  // Page = location page now
  const loopPagination = (max, per, page) => {
    let getLocal = [];
    if (localStorage.people) {
      getLocal.push(JSON.parse(localStorage.people));
    }

    const num = getLocal[0]?.count;
    const maxTotal = totalPage(per, num) % max;

    let content = [];

    //
    const numTotal = 2;
    const startNumber = page > numTotal ? page - numTotal : 1;

    const endNumber =
      page < totalPage(per, num) - numTotal
        ? page + numTotal
        : totalPage(per, num);

    for (let i = startNumber; i <= endNumber; i++) {
      if (page === i) {
        content.push(
          <li key={i} className="uk-active" style={{ cursor: "pointer" }}>
            <span style={{ fontWeight: 500 }}>{i}</span>
          </li>
        );
      } else {
        content.push(
          <li
            key={i}
            onClick={() => {
              route.push(`/${i}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <span>{i}</span>
          </li>
        );
      }
    }
    return content;
  };

  // Per = Total Data Per Page
  // Num = Total full data
  const totalPage = (per, num) => {
    const ccount = num / per;
    return Math.ceil(ccount);
  };

  const getPeople = async (page) => {
    return await req.getPeople(page);
  };

  const getLocalParse = (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
  };

  const DataChart = () => {
    const data = [];
    const res = getLocalParse("people");

    data.push({
      name: res?.results.map((value) => value.name),
      dataSets: [
        {
          label: "Height",
          data: res?.results.map((value) => value.height),
          backgroundColor: ["rgba(54, 162, 235, 0.6)"],
        },
        {
          label: "Mass",
          data: res?.results.map((value) => value.mass),
          backgroundColor: ["rgba(75, 192, 192, 0.6)"],
        },
      ],
    });

    return data;
  };
  const all = {
    state,
    req,
    totalPage,
    loopPagination,
    getPeople,
    getLocalParse,
    DataChart,
  };

  return all;
}
