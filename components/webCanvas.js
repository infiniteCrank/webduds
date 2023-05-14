import { Stage, Layer, Image, Rect} from 'react-konva';
import useImage from "use-image";
import Konva from 'konva';
import { useEffect, useRef } from 'react';

const FilterImage = ({ imageSource,imageColor }) => {
    const [image] = useImage(imageSource);
    const imageRef = useRef();

    useEffect(() => {
        if (image) {
            imageRef.current.cache();
        }
    }, [image]);

    if(imageColor.length>0){
        return (
            <Image
                ref={imageRef}
                x={0}
                y={0}
                height={650} 
                width={650}
                image={image}
                filters={[Konva.Filters.RGB]}
                red={imageColor[0]}
                green={imageColor[1]}
                blue={imageColor[2]}
            />
        );
    }else{
        return (
            <Image
                ref={imageRef}
                x={0}
                y={0}
                height={650} 
                width={650}
                image={image}
            />
        );
    }
    
};

export default function WebCanvas() {

    const images = [
        {image:require("../assets/images/wizduds/Wizduds-Artwork-1.png"),color:[100,0,0],name:"sky"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-2.png"),color:[],name:"clouds"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-3.png"),color:[],name:"ship"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-4.png"),color:[],name:"logo"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-5.png"),color:[],name:"skin"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-6.png"),color:[],name:"shoes"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-7.png"),color:[],name:"hair"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-8.png"),color:[],name:"cloths"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-9.png"),color:[],name:"staff"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-10.png"),color:[],name:"fireball"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-11.png"),color:[],name:"braclet"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-12.png"),color:[],name:"spell"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-13.png"),color:[],name:"outline"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-14.png"),color:[],name:"eyes"},
    ];

    const CreateLayers = ()=>{
        return (
            <Layer>
                {images.map(i => {
                    return <FilterImage imageSource={i.image} imageColor={i.color} key={i.image}/>;
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
