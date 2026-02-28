export const Title = ({title, subtitle}) => {
    return (
        <>
            <div className="title">
                <h2 className="title__header">{title}</h2>
                <p className="title__subtitle">{subtitle}</p>
            </div>
        </>
    )
}

