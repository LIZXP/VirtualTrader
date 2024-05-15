import MainNavBar from "../MainNavBar/MainNavBar"

function MainPageLayout({ children }) {
    return (
        <>
            <section>
                <MainNavBar />
            </section>
            <section>
                {children}
            </section>
        </>
    )
}

export default MainPageLayout