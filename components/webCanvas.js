import { Stage, Layer, Image, Rect} from 'react-konva';
import useImage from "use-image";
import Konva from 'konva';
import { useEffect, useRef } from 'react';

const images = [
    require("../assets/images/wizduds/Wizduds-Artwork-1.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-2.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-3.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-4.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-5.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-6.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-7.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-8.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-9.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-10.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-11.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-12.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-13.png"),
    require("../assets/images/wizduds/Wizduds-Artwork-14.png"),
];

const FilterImage = ({ imageSource }) => {
    const [image] = useImage(imageSource);
    const imageRef = useRef();

    // when image is loaded we need to cache the shape
    useEffect(() => {
        if (image) {
            // you many need to reapply cache on some props changes like shadow, stroke, etc.
            imageRef.current.cache();
        }
    }, [image]);

    return (
        <Image
            ref={imageRef}
            x={0}
            y={0}
            height={650} 
            width={650}
            image={image}
            filters={[Konva.Filters.Blur]}
            blurRadius={10}
        />
    );
};

export default function WebCanvas() {

    const CreateLayers = ()=>{
        return (
            <Layer>
                {images.map(i => {
                    return <FilterImage imageSource={i} key={i}/>;
                })}
            </Layer>
        );
    }

    return (
        
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Rect
                    x={0}
                    y={0}
                    width={650}
                    height={650}
                    fill="white"
                    />
            </Layer>
            {CreateLayers()}

        </Stage>
    );
}
