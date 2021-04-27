import { useState, useMemo } from 'react';
import ReactCrop from "react-image-crop";
import 'react-image-crop/lib/ReactCrop.scss';

import TemporalPicture from "../../assests/pp.png";
import CustomButton from "../buttons/customButton.component";
import api from "../../services/api";

import "./profilePicture.styles.scss";

const ProfilePicture = () => {
    const [picture, setPicture] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1, width: 100 });
    const [cropImage, setCropImage] = useState("");
    const [imageRef, setImageRef] = useState("");

    const preview = useMemo((() => {
        return picture ? URL.createObjectURL(picture) : TemporalPicture;
    }), [picture]);

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                // window.URL.revokeObjectURL(fileUrl);
                const fileUrl = window.URL.createObjectURL(blob);
                resolve(fileUrl);
            }, 'image/jpeg');
        });
    }

    const makeClientCrop = async (crop) => {
        if (imageRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imageRef,
                crop,
                'newFile.jpeg'
            );
            setCropImage(croppedImageUrl);
            console.log(cropImage);
        }
    }

    const handleImageLoaded = (image) => {
        setImageRef(image);
    }

    const handledCropComplete = (crop) => {
        makeClientCrop(crop);
    }

    return (
        <form className="profile-pics">
            <ReactCrop
                src={preview}
                crop={crop}
                onChange={crop => setCrop(crop)}
                onImageLoaded={handleImageLoaded}
                onComplete={handledCropComplete}
            />
            <label id="picture" className={picture ? 'has-picture' : null}>
                <input type="file" name="picture" onChange={(e) => setPicture(e.target.files[0])} />
                <i className="fas fa-edit">Change Image</i>
            </label>
            {
                cropImage && (
                    <img alt="Crop" style={{ maxWidth: '100%' }} src={cropImage} />
                )}

            <CustomButton>Save Image</CustomButton>
        </form>
    )
}

export default ProfilePicture; 