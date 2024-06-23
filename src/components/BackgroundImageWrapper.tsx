import leftbg from "../img/leftLoginBackground.png";
import rightBg from "../img/rightLoginBackground.png";

const BackgroundImageWrapper = () => {
    return (
        <div>
            <section
                className="absolute left-0 top-0 bottom-0 h-full w-1/2" 
                style={
                    {
                    backgroundImage: `url(${leftbg})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: 'center top'
                }}>
            </section>
            <section
                className="absolute right-0 top-0 bottom-0 h-full w-1/2" 
                style={
                    {
                    backgroundImage: `url(${rightBg})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: 'center top'
                }}>
            </section>
        </div>
    )
}

export default BackgroundImageWrapper
