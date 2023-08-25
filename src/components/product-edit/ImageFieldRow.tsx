import * as React from 'react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { PRODUCT_FIELD_INFO } from '../../constants';
import { Button } from '../widgets/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ImageFieldRowProps = {
  image: string,
  setImageHandler: Dispatch<SetStateAction<string>>,
  imageName: string,
  setImageNameHandler: Dispatch<SetStateAction<string>>,
}

export const ImageFieldRow = (props: ImageFieldRowProps) => {
  const image = props.image;
  const setImageValue = props.setImageHandler;
  const imageName = props.imageName;
  const setImageNameValue = props.setImageNameHandler;

  const imageRef = useRef(null);

  useEffect(() => {
    setImageFile(image, imageName);
  }, [image, imageName]);

  // Load img blob to input
  const setImageFile = (image: string, imageName: string): void => {
    if (image) {
      // parse string to get file type such as `image/jpeg`
      const contentType = image.match(/data:(.+);base/)[1];
      const file = new File([image], imageName,{type: contentType, lastModified: new Date().getTime()});
      const container = new DataTransfer();
      container.items.add(file);
      // update `files` in Image input
      imageRef.current.files = container.files;
    } else {
      imageRef.current.value = '';
    }
  }
  const onClearImage = () => {
    setImageValue('');
    setImageNameValue('');
    setImageFile('', '');
  }
  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];
    const blob = new Blob([file], {type: file.type});
    const reader = new FileReader();
    reader.readAsDataURL(blob); // converts Blob to base64 and calls `onload`

    reader.onload = function() {
      setImageValue(reader.result.toString());
      setImageNameValue(file.name);
    };
  }

  return <>
            <div className="form__row">
              <label className="form__label" htmlFor="image">{PRODUCT_FIELD_INFO.image.label}:</label>
              <input ref={imageRef} id="image" name="image" type="file" className="form__field" accept=".jpg, .jpeg, .png" onChange={onChangeImage}/>
              { image && <Button handler={onClearImage} preventDefault={true} className="button-square form__clear-image-icon" label="" title="Remove file" iconNode={<FontAwesomeIcon icon="trash"/>}/>}
            </div>
            { image && <div className="form__row">
                        <label className="form__label"></label>
                        <img src={image} alt="" className="form__image"/>
                      </div>
            }
        </>
}