import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'react-learning',
    api_key: '572435937711364',
    api_secret: 'LQZBcXd8P3wPhJc06Y4bd2A3dyg',
   secure: true
});
describe('Pruebas en fileUpload', () => {
   
    test('Debe subir el archivo correctamente a cloudinary', async() => {
        const imageUrl = 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // Eliminar de Cloudinary
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        await cloudinary.api.delete_resources(['journal/' + imageId ], { resource_type: 'image'});
    });

    test('Debe de retornar NULL', async() => {
        
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});