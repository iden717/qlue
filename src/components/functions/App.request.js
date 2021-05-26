import { useContext } from "react";
import { API } from "../../config/api";
import { PeopleContext } from "../../context/peopleContext";

export default function AppRequest() {
  const [state, dispatch] = useContext(PeopleContext);

  const getPeople = (num) => {
    dispatch({
      type: "IN_LOADING",
    });
    return API.get(`/people/?page=${num ? num : 1}`)
      .then((res) => {
        const getPeoples = JSON.stringify(res?.data);
        localStorage.setItem("people", getPeoples);
        dispatch({
          type: "LOADING_DONE",
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "LOADING_DONE",
        });
        return { message: "err" };
      });
  };
  const all = { getPeople };
  return all;
}
