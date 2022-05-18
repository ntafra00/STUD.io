import React from "react"
import image from "../../assets/drawKit/pictureFive.svg"
import { ImageWrapper } from "./index.styled";

const ImageContainer = () => {
    return (
        <ImageWrapper>
            <img src={image} width="100%"></img>
        </ImageWrapper>
    )
}

export default ImageContainer;