import * as Yup from 'yup';

export const UploadImageSchema = Yup.object().shape({
    file: Yup.mixed()
      .test('fileType', 'Only image files are allowed', (value) => {
        if (!value) return false;
        return /\.(jpg|jpeg|png|gif)$/i.test(value.type);
      })
      .required('File is required'),
  });