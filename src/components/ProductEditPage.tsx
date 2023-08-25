import * as React from 'react';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from './widgets/Button';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { StatusAlertService } from 'react-status-alert';
import ProductApi from '../api/ProductApi';
import { ProductDAO } from '../types';
import { InputFieldRow } from './product-edit/InputFieldRow';
import { LookupFieldRow } from './product-edit/LookupFieldRow';
import { ImageFieldRow } from './product-edit/ImageFieldRow';

type TParams = {
  id: string
};

export const ProductEditPage = ({match}: RouteComponentProps<TParams>) => {
  const id = match.params.id;
  const isEdit = !!id;
  const [model, setModel] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [yearId, setYearId] = useState(undefined);
  const [brandId, setBrandId] = useState(undefined);
  const [typeId, setTypeId] = useState(undefined);
  const [cpuId, setCpuId] = useState(undefined);
  const [colorId, setColorId] = useState(undefined);
  const [graphicsId, setGraphicsId] = useState(undefined);
  const [osId, setOSId] = useState(undefined);
  const [resolutionId, setResolutionId] = useState(undefined);
  const [ramTypeId, setRamTypeId] = useState(undefined);
  const [ram, setRam] = useState('');
  const [core, setCore] = useState('');
  const [diagonal, setDiagonal] = useState('');
  const [sizeHD, setSizeHD] = useState('');
  const [refreshRate, setRefreshRate] = useState('');
  const [weight, setWeight] = useState('');
  const [thickness, setThickness] = useState('');
  const [cpuModel, setCpuModel] = useState('');
  const [graphicsModel, setGraphicsModel] = useState('');
  const [url, setUrl] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (isEdit) {
      productRetrieve(id);
    }
  }, []);

  const productRetrieve = async (id: string) => {
    const product = await ProductApi.productRetrieve(id);
    setProductState(product);
  }

  const setProductState = (data: ProductDAO): void => {
    setModel(data.model);
    setImage(data.image);
    setImageName(data.image_name);
    setCode(data.code);
    setPrice(data.price.toString());
    setYearId(data.year_id);
    setBrandId(data.brand_id);
    setTypeId(data.type_id);
    setCpuId(data.cpu_id);
    setColorId(data.color_id);
    setGraphicsId(data.graphics_id);
    setOSId(data.os_id);
    setResolutionId(data.resolution_id);
    setRamTypeId(data.ram_type_id);
    setRam(String(data.ram));
    setCore(data.core ? data.core.toString() : '');
    setDiagonal(data.diagonal ? data.diagonal.toString() : '');
    setSizeHD(data.sizeHD ? data.sizeHD.toString() : '');
    setRefreshRate(data.refresh_rate ? data.refresh_rate.toString() : '');
    setWeight(data.weight ? data.weight.toString() : '');
    setThickness(data.thickness ? data.thickness.toString() : '');
    setCpuModel(data.cpu_model ? data.cpu_model : '');
    setGraphicsModel(data.graphics_model ? data.graphics_model : '');
    setUrl(data.url ? data.url : '');
  }

  const getBody = (): string => {
    return JSON.stringify({
      'model': model,
      'image': image,
      'imageName': imageName,
      'code': code,
      'price': price, //implicit conversion of `string` value to `INTEGER` DB type on DB level, validation checks that value is number
      'yearId': yearId,
      'brandId': brandId,
      'typeId': typeId,
      'cpuId': cpuId,
      'colorId': colorId,
      'graphicsId': graphicsId,
      'osId': osId,
      'resolutionId': resolutionId,
      'ramTypeId': ramTypeId,
      'ram': ram,
      'core': core,
      'diagonal': diagonal,
      'sizeHD': sizeHD,
      'refreshRate': refreshRate,
      'weight': weight,
      'thickness': thickness,
      'cpuModel': cpuModel,
      'graphicsModel': graphicsModel,
      'url': url,
    });
  }

  const productCreate = async () => {
    const body = getBody();
    const responseStatus = await ProductApi.productCreate(body);
    if (responseStatus.success) {
      StatusAlertService.showSuccess(responseStatus.message);
      history.push('/');
    } else {
      StatusAlertService.showError(responseStatus.message);
    }
  }
  const productUpdate = async (id: string) => {
    const body = getBody();
    const responseStatus = await ProductApi.productUpdate(id, body);
    if (responseStatus.success) {
      StatusAlertService.showSuccess(responseStatus.message);
      history.push('/');
    } else {
      StatusAlertService.showError(responseStatus.message);
    }
  };

  const handleSubmit = () => {
    const $form: HTMLFormElement = document.querySelector('.form');
    const isValid = $form.checkValidity();
    if (!isValid) {
      $form.reportValidity();
    } else {
      isEdit ? productUpdate(id) : productCreate();
    }
  }

  return <div className="product-edit">
            <form className="product-edit__form form">
              <InputFieldRow fieldName="model" value={model} setValueHandler={setModel} isRequired={true}/>
              <ImageFieldRow image={image} setImageHandler={setImage} imageName={imageName} setImageNameHandler={setImageName}/>
              <InputFieldRow fieldName="code" value={code} setValueHandler={setCode} isRequired={true}/>
              <InputFieldRow fieldName="price" value={price} setValueHandler={setPrice} isRequired={true}/>
              <LookupFieldRow fieldName="year_id" value={yearId} setValueHandler={setYearId}/>
              <LookupFieldRow fieldName="brand_id" value={brandId} setValueHandler={setBrandId}/>
              <LookupFieldRow fieldName="type_id" value={typeId} setValueHandler={setTypeId}/>
              <LookupFieldRow fieldName="cpu_id" value={cpuId} setValueHandler={setCpuId}/>
              <LookupFieldRow fieldName="color_id" value={colorId} setValueHandler={setColorId}/>
              <LookupFieldRow fieldName="graphics_id" value={graphicsId} setValueHandler={setGraphicsId}/>
              <LookupFieldRow fieldName="os_id" value={osId} setValueHandler={setOSId}/>
              <LookupFieldRow fieldName="resolution_id" value={resolutionId} setValueHandler={setResolutionId}/>
              <LookupFieldRow fieldName="ram_type_id" value={ramTypeId} setValueHandler={setRamTypeId}/>
              <InputFieldRow fieldName="ram" value={ram} setValueHandler={setRam} isRequired={true}/>
              <InputFieldRow fieldName="core" value={core} setValueHandler={setCore} isRequired={false}/>
              <InputFieldRow fieldName="diagonal" value={diagonal} setValueHandler={setDiagonal} isRequired={false}/>
              <InputFieldRow fieldName="sizeHD" value={sizeHD} setValueHandler={setSizeHD} isRequired={false}/>
              <InputFieldRow fieldName="refresh_rate" value={refreshRate} setValueHandler={setRefreshRate} isRequired={false}/>
              <InputFieldRow fieldName="weight" value={weight} setValueHandler={setWeight} isRequired={false}/>
              <InputFieldRow fieldName="thickness" value={thickness} setValueHandler={setThickness} isRequired={false}/>
              <InputFieldRow fieldName="cpu_model" value={cpuModel} setValueHandler={setCpuModel} isRequired={false}/>
              <InputFieldRow fieldName="graphics_model" value={graphicsModel} setValueHandler={setGraphicsModel} isRequired={false}/>
              <InputFieldRow fieldName="url" value={url} setValueHandler={setUrl} isRequired={false}/>

              <div className="form__submit-wrapper">
                <Button preventDefault={true} handler={handleSubmit} className="button" label="Submit" iconNode={<FontAwesomeIcon icon={"arrow-down"} />} />
              </div>
            </form>
          </div>
}