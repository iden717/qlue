export default function Pagination(props) {
  const { micro, page, per, route } = props;
  return (
    <ul class="uk-pagination uk-flex-center" uk-margin>
      {page === 1 ? null : (
        <li>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => route.push(`/${page - 1}`)}
            uk-icon="icon: chevron-left"
          ></span>
        </li>
      )}

      {micro.loopPagination(5, per, page)}

      {micro.totalPage(per, micro.getLocalParse("people")?.count) ===
      page ? null : (
        <li>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => route.push(`/${page + 1}`)}
            uk-icon="icon: chevron-right"
          ></span>
        </li>
      )}
    </ul>
  );
}
