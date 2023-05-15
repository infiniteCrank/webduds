import { Stage, Layer, Image, Rect} from 'react-konva';
import {  StyleSheet, View, Text} from 'react-native';
import useImage from "use-image";
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';

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

    const [images, setImages] = useState([
        {image:require("../assets/images/wizduds/Wizduds-Artwork-1.png"),color:[25,139,220],name:"sky"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-2.png"),color:[255,255,255],name:"clouds"},
        {image:require("../assets/images/wizduds/Wizduds-Artwork-3.png"),color:[171,112,29],name:"ship"},
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
    ]);

    const [sketchPickerColor, setSketchPickerColor] = useState({
        r: images[selectedLayer|0].color[0],
        g:images[selectedLayer|0].color[1],
        b: images[selectedLayer|0].color[2],
        a: "1",
    });

    const CreateLayers = ()=>{
        return (
            <Layer>
                {images.map(i => {
                    return <FilterImage imageSource={i.image} imageColor={i.color} key={i.image}/>;
                })}
            </Layer>
        );
    }

    const [layerSelectOpen, setLayerSelectOpen] = useState(false);
    const [selectedLayer, setSelectedLayer] = useState(0);
    const [loading, setLoading] = useState(false);
    const [layers, setLayers] = useState(()=>{
        return images.map((i,layerNumber) => {
            return { label: i.name, value: layerNumber };
        })
    });
    const { handleSubmit, control } = useForm();

    return (
    <div>
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

        <DropDownPicker
        style={styles.dropdown}
        open={layerSelectOpen}
        value={selectedLayer}
        items={layers}
        setOpen={setLayerSelectOpen}
        setValue={setSelectedLayer}
        setItems={setLayers}
        loading={loading}
        activityIndicatorColor="#5188E3"
        searchable={true}
        searchPlaceholder="Search layers"
        onChangeValue={(selected)=>{
            setSketchPickerColor({
                r: images[selected|0].color[0],
                g:images[selected|0].color[1],
                b: images[selected|0].color[2],
                a: "1",
            })
        }}
        zIndex={1000}
        zIndexInverse={3000}
        />

        <div className="sketchpicker">
            <Text style={{color:'#ff0000'}}>{images[selectedLayer].name}</Text>
            <div
            style={{
                backgroundColor: `rgba(
                    ${images[selectedLayer].color[0]},
                    ${images[selectedLayer].color[1]},
                    ${images[selectedLayer].color[2]},
                    1)`,
                width: 100,
                height: 50,
                border: "2px solid white",
            }}
            ></div>
        
            <SketchPicker
                onChange={(color) => {
                    setSketchPickerColor(color.rgb);
                    images[selectedLayer].color[0] = color.rgb.r;
                    images[selectedLayer].color[1] = color.rgb.g;
                    images[selectedLayer].color[2] = color.rgb.b;
                    setImages(images)

                }}
                color={(sketchPickerColor)}
            />
        </div>
    </div>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderStyle: "solid",
        borderColor: "#B7B7B7",
        borderRadius: 7,
        borderWidth: 1,
        fontSize: 15,
        height: 50,
        marginHorizontal: 10,
        paddingStart: 10,
        marginBottom: 15,
    },
    label: {
        marginBottom: 7,
        marginStart: 10,
    },
    placeholderStyles: {
        color: "grey",
    },
    dropdownGender: {
        marginHorizontal: 10,
        width: "50%",
        marginBottom: 15,
    },
    dropdownCompany: {
        marginHorizontal: 10,
        marginBottom: 15,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
    },
    getStarted: {
        backgroundColor: "#5188E3",
        color: "white",
        textAlign: "center",
        marginHorizontal: 60,
        paddingVertical: 15,
        borderRadius: 50,
        marginTop: 20,
    },
    logIn: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    links: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "#758580",
    },
});

