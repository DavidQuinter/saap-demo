import "./nav.css";
const nav = () => {
  return (
    <nav id="nav">
      <ul>
        <li className="nav-sec-active">
          <figure>
            <img src={`../icons/Notebook-d.svg`} alt="" />
            <figcaption><a href="/">Default</a></figcaption>
          </figure>
        </li>
        <li>
          <figure>
            <img src={`../icons/UsersThree-d.svg`} alt="" />
            <figcaption><a href="/profiles">profiles</a></figcaption>
          </figure>
        </li>
        <li>
          <figure>
            <img src={`../icons/ChartPieSlice-d.svg`} alt="" />
            <figcaption><a href="/stadistics">Stadistics</a></figcaption>
          </figure>
        </li>
      </ul>
    </nav>
  );
};
export default nav;
