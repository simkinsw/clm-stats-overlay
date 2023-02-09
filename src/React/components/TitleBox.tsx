function TitleBox({ text } : {text: string}) {

    return ( 
        <div className="title-box-container">
            <span className="title-box">{text}</span> 
        </div>
    )
}

export default TitleBox;