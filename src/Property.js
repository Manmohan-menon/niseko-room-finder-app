function Property({ property}) {
    return (
        <div className='property-block'>
            <h2 className='property-name'>{ property.name }</h2>
            <p className='property-description'>{ property.description }</p>
        </div>
    )
}

export default Property;