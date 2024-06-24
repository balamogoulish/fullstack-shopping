import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { AiOutlinePlusCircle } from "react-icons/ai";
import axiosInstance from '../utils/axios';


const FileUpload = ({onImageChange, images}) => {
    
    const handleDrop = async(files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0]);

        try{
            const response = await axiosInstance.post('/products/image', formData, config);
            onImageChange([...images, response.data.fileName]);
        } catch(err){
            console.error(err);
        }
    }

    const handleDelete=(image)=>{
        const currentIndex = images.indexOf(image);
        let newImages = [...images]; //원본 복사
        newImages.splice(currentIndex, 1) //현재 이미지로부터 1개 지움 => 현재 이미지 지움
        onImageChange(newImages); //지운 상태를 화면에 반영
    }

    return (
        <div className='flex gap-4'>
            <Dropzone onDrop={handleDrop}>
                {({getRootProps, getInputProps}) => (
                    <section className='min-w-[300px] h-300[x] border flex items-center justify-center'>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <AiOutlinePlusCircle className='text-4xl'/>
                        </div>  
                    </section>
                )}
            </Dropzone>
            <div className='flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden'>
                {images.map((image, index)=>(
                    <div onClick={()=> handleDelete(image)} key={image+index}>
                        <img
                            className='min-w-[300px] h-[300px]'
                            src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                            alt=''
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

FileUpload.propTypes = {
    onImageChange: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired
};

export default FileUpload