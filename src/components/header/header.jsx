import "./header.css"
const header = () =>{
    return (
        <header>
            <section id="info-user">
                <figure>
                    <img src={`../img/users/Female15.png`} alt="" />
                    <figcaption><b>Maria Rodriguez</b><br />Jefe de compras y ventas - QRO</figcaption>
                    {/* <figcaption>{`Maria Rodriguez\nJefe de compras y ventas - QRO`}</figcaption> */}
                </figure>
            </section>
            <section id="sec-nav">
                <section className="config-user">
                    <img src={`../icons/Sidebar-d.svg`} alt="" />
                    <img src={`../icons/Star-d.svg`} alt="" />
                </section>
                <section id="nav-location">
                    <ul>
                        <li>Dashboard</li>
                        <li>/ Default</li>
                    </ul>
                </section>
            </section>
            <section id="config-user">
                <ul>
                    <li><img src={`../icons/sun-d.svg`} alt="" /></li>
                    <li><img src={`../icons/ClockCounterClockwise-d.svg`} alt="" /></li>
                    <li><img src={`../icons/Bell-d.svg`} alt="" /></li>
                    <li><img src={`../icons/Rightbar-s.svg`} alt="" /></li>
                </ul>
            </section>
        </header>
    )
}
export default header;