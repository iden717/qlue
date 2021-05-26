import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Chart from "../components/Chart";
import Micro from "../components/functions/App.micro";
import Pagination from "../components/Pagination";

export default function ListPeople() {
  const route = useHistory();
  const params = useParams();
  const { page } = params;
  const micro = Micro();

  useEffect(() => {
    micro.getPeople(page);
  }, [page]);

  if (micro.state.loading)
    return (
      <div style={{ height: "60vh" }}>
        <span
          className="uk-flex uk-flex-center uk-align-center"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          uk-spinner="ratio: 1"
        ></span>
      </div>
    );

  return (
    <div className="uk-container uk-margin-large-top uk-margin-bottom">
      <Pagination micro={micro} page={Number(page)} per={10} route={route} />
      <div class="uk-overflow-auto">
        <div className="uk-margin-large-bottom">
          <Chart micro={micro} />
        </div>
        <table class="uk-table uk-table-hover uk-table-middle uk-table-divider">
          <thead>
            <tr>
              <th class="uk-table-shrink"></th>
              <th class="uk-width-small">Name</th>
              <th class="uk-table-shrink">Height</th>
              <th class="uk-table-shrink">Mass</th>
              <th class="uk-table-shrink uk-text-nowrap">Hair Color</th>
              <th class="uk-table-shrink uk-text-nowrap">Skin Color</th>
            </tr>
          </thead>
          <tbody>
            {micro.getLocalParse("people")?.results?.map((value, key) => (
              <tr>
                <td>
                  <input class="uk-checkbox" type="checkbox" />
                </td>
                <td class="uk-text-truncate">{value.name}</td>
                <td class="uk-text-nowrap">{value.height}</td>
                <td class="uk-text-nowrap">{value.mass}</td>
                <td class="uk-text-nowrap">{value.hair_color}</td>
                <td class="uk-text-nowrap">{value.skin_color}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination micro={micro} page={Number(page)} per={10} route={route} />
      </div>
    </div>
  );
}
