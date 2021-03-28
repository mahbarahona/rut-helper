import { 
    extractRut,
    extractDv,
    isFormatoRutValido,
    isRutValido,
    isDvValido,
    getCleanRut,
    getValidDV,
    getRutFormato,
    getRutStatus
   } from '../index';

describe('Rut Lib',()=>{


    //extractRut()
    it('cuando extractRut(), recibe un rut válido, debe devolver el rut sin el digito verificador',()=>{
        
        const rut_sinPuntos_sinGuion     ='123456789'
        const rut_sinPuntos_conGuion     ='12345678-9'
        const rut_conPuntos_conGuion     ='12.345.678-9'

        const rutEsperado                = '12345678';

        expect(extractRut(rut_sinPuntos_sinGuion)).toEqual(rutEsperado);
        expect(extractRut(rut_sinPuntos_conGuion)).toEqual(rutEsperado);
        expect(extractRut(rut_conPuntos_conGuion)).toEqual(rutEsperado);
    });
    
    it('cuando extractRut(), recibe un rut INVALIDO, debe devolver un string vacio',()=>{
        
        const rut_invalido_noRut     ='1abcde';
        const rut_invalido_largo     ='1';

        expect(extractRut(rut_invalido_noRut)).toBeFalsy();
        expect(extractRut(rut_invalido_largo)).toBeFalsy();
    });
    
    it('cuando extractRut(), recibe un string vacio, debe devolver un string vacio',()=>{
        const rut                = '';
        const respuesta_esperada = '';

        expect(extractRut(rut)).toEqual(respuesta_esperada);
    });

    
    //extractDV()
    it('cuando extractDV(), recibe un rut válido, debe extraer del rut entregado el digito verificador',()=>{
        
        const rut_sinPuntos_sinGuion     ='123456789'
        const rut_sinPuntos_conGuion     ='12345678-9'
        const rut_conPuntos_conGuion     ='12.345.678-9'

        const dvEsperado                = '9';

        expect(extractDv(rut_sinPuntos_sinGuion)).toEqual(dvEsperado);
        expect(extractDv(rut_sinPuntos_conGuion)).toEqual(dvEsperado);
        expect(extractDv(rut_conPuntos_conGuion)).toEqual(dvEsperado);
    });
    
    it('cuando extractDV(), recibe un rut INVALIDO, debe devolver un string vacio',()=>{
        
        const rut_invalido_noRut     ='1abcde';
        const rut_invalido_largo     ='1';

        expect(extractDv(rut_invalido_noRut)).toBeFalsy();
        expect(extractDv(rut_invalido_largo)).toBeFalsy();
    });
    
    it('cuando extractDV(), recibe un string vacio, debe devolver un string vacio',()=>{
        const rut                = '';
        const respuesta_esperada = '';

        expect(extractDv(rut)).toEqual(respuesta_esperada);
    }); 



    // isFormatoRutValido()
    it('cuando isFormatoRutValido(), recibe un rut con formato válido, debe devolver TRUE',()=>{

        const rut_sinPuntos_sinGuion_sinEspacios      ='123456789';
        const rut_sinPuntos_conGuion_sinEspacios      ='12345678-9';
        const rut_conPuntos_conGuion_sinEspacios      ='12.345.678-9';
        const rut_conPuntos_conGuion_conEspacios      ='1 2.345 .678 -9';
        const rut_conK_conPuntos_conGuion_conEspacios ='1 2.345 .678 -k';
        const rut_conKMayus_conPuntos_conGuion_conEspacios ='1 2.345 .678 -K';
        const rut_conPuntos_conGuion_conEspacios_mayor_100M     ='102. 345.678-9';
        const rut_conPuntos_conGuion_conEspacios_menor_10M      ='2.345.678-9';

        expect(isFormatoRutValido(rut_sinPuntos_sinGuion_sinEspacios)).toEqual(true);
        expect(isFormatoRutValido(rut_sinPuntos_conGuion_sinEspacios)).toEqual(true);
        expect(isFormatoRutValido(rut_conPuntos_conGuion_sinEspacios)).toEqual(true);
        expect(isFormatoRutValido(rut_conPuntos_conGuion_conEspacios)).toEqual(true);
        expect(isFormatoRutValido(rut_conK_conPuntos_conGuion_conEspacios)).toEqual(true);
        expect(isFormatoRutValido(rut_conKMayus_conPuntos_conGuion_conEspacios)).toEqual(true);
        expect(isFormatoRutValido(rut_conPuntos_conGuion_conEspacios_menor_10M)).toEqual(true);
        expect(isFormatoRutValido(rut_conPuntos_conGuion_conEspacios_mayor_100M)).toEqual(true);


    }); 

    it('cuando isFormatoRutValido(), recibe un rut con formato INVALIDO, debe devolver FALSE',()=>{
        
        const rut_invalido_con2K     ='12.345.67kK';
        const rut_invalido_conLetras ='a123';
        const rut_invalido_conSignos ='12_345_678-5';
        const rut_invalido_dv        ='123c';
        const rut_invalido_unDigito  ='1';
        const rut_invalido_unaLetra  ='a';

        expect(isFormatoRutValido(rut_invalido_con2K)).toEqual(false);
        expect(isFormatoRutValido(rut_invalido_conLetras)).toEqual(false);
        expect(isFormatoRutValido(rut_invalido_conSignos)).toEqual(false);
        expect(isFormatoRutValido(rut_invalido_dv)).toEqual(false);
        expect(isFormatoRutValido(rut_invalido_unDigito)).toEqual(false);
        expect(isFormatoRutValido(rut_invalido_unaLetra)).toEqual(false);
    }); 

    //isRutValido()
    it('cuando isRutValido(), recibe un rut con fomato valido y con digito verificador valido, debe devolver TRUE',()=>{
        const rut_valido_dv_0 = '14680545-0';
        const rut_valido_dv_1 = '10174274-1';
        const rut_valido_dv_2 = '7231693-2';
        const rut_valido_dv_3 = '16483703-3';
        const rut_valido_dv_4 = '14153621-4';
        const rut_valido_dv_5 = '19235154-5';
        const rut_valido_dv_6 = '13811714-6';
        const rut_valido_dv_7 = '6871733-7';
        const rut_valido_dv_8 = '18603582-8';
        const rut_valido_dv_9 = '20527791-9';
        const rut_valido_dv_k = '19240343-k';
        const rut_valido_dv_mayor_100M = '102.333.444-1';

        expect(isRutValido(rut_valido_dv_0)).toEqual(true);
        expect(isRutValido(rut_valido_dv_1)).toEqual(true);
        expect(isRutValido(rut_valido_dv_2)).toEqual(true);
        expect(isRutValido(rut_valido_dv_3)).toEqual(true);
        expect(isRutValido(rut_valido_dv_4)).toEqual(true);
        expect(isRutValido(rut_valido_dv_5)).toEqual(true);
        expect(isRutValido(rut_valido_dv_6)).toEqual(true);
        expect(isRutValido(rut_valido_dv_7)).toEqual(true);
        expect(isRutValido(rut_valido_dv_8)).toEqual(true);
        expect(isRutValido(rut_valido_dv_9)).toEqual(true);
        expect(isRutValido(rut_valido_dv_k)).toEqual(true);
        expect(isRutValido(rut_valido_dv_mayor_100M)).toEqual(true);
    }); 

    it('cuando isRutValido(), recibe un rut con fomato valido y con digito verificador INVALIDO, debe devolver FALSE',()=>{
        const rut_invalido_dv_0 = '14680545-k';
        const rut_invalido_dv_1 = '10174274-0';
        const rut_invalido_dv_2 = '7231693-0';
        const rut_invalido_dv_3 = '16483703-0';
        const rut_invalido_dv_4 = '14153621-0';
        const rut_invalido_dv_5 = '19235154-0';
        const rut_invalido_dv_6 = '13811714-0';
        const rut_invalido_dv_7 = '6871733-0';
        const rut_invalido_dv_8 = '18603582-0';
        const rut_invalido_dv_9 = '20527791-0';
        const rut_invalido_dv_k = '19240343-0';
        const rut_invalido_dv_mayor_100M = '102.333.445-0';

        expect(isRutValido(rut_invalido_dv_0)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_1)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_2)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_3)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_4)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_5)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_6)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_7)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_8)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_9)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_k)).toEqual(false);
        expect(isRutValido(rut_invalido_dv_mayor_100M)).toEqual(false);
    });     

    // isDvValido()
    it('cuando isDvValido(), recibe un rut con digito verificador valido, debe devolver TRUE ',()=>{

        const rut_valido_dv_0 = '14680545-0';
        const rut_valido_dv_1 = '10174274-1';
        const rut_valido_dv_2 = '7231693-2';
        const rut_valido_dv_3 = '16483703-3';
        const rut_valido_dv_4 = '14153621-4';
        const rut_valido_dv_5 = '19235154-5';
        const rut_valido_dv_6 = '13811714-6';
        const rut_valido_dv_7 = '6871733-7';
        const rut_valido_dv_8 = '18603582-8';
        const rut_valido_dv_9 = '20527791-9';
        const rut_valido_dv_k = '19240343-k';
        const rut_valido_dv_mayor_100M = '102.333.444-1';

        expect(isDvValido(rut_valido_dv_0)).toEqual(true);
        expect(isDvValido(rut_valido_dv_1)).toEqual(true);
        expect(isDvValido(rut_valido_dv_2)).toEqual(true);
        expect(isDvValido(rut_valido_dv_3)).toEqual(true);
        expect(isDvValido(rut_valido_dv_4)).toEqual(true);
        expect(isDvValido(rut_valido_dv_5)).toEqual(true);
        expect(isDvValido(rut_valido_dv_6)).toEqual(true);
        expect(isDvValido(rut_valido_dv_7)).toEqual(true);
        expect(isDvValido(rut_valido_dv_8)).toEqual(true);
        expect(isDvValido(rut_valido_dv_9)).toEqual(true);
        expect(isDvValido(rut_valido_dv_k)).toEqual(true);
        expect(isDvValido(rut_valido_dv_mayor_100M)).toEqual(true);
    });

    it('cuando isDvValido(), recibe un rut con digito verificador INVALIDO, debe devolver FALSE',()=>{
        const rut_invalido_dv_0 = '14680545-k';
        const rut_invalido_dv_1 = '10174274-0';
        const rut_invalido_dv_2 = '7231693-0';
        const rut_invalido_dv_3 = '16483703-0';
        const rut_invalido_dv_4 = '14153621-0';
        const rut_invalido_dv_5 = '19235154-0';
        const rut_invalido_dv_6 = '13811714-0';
        const rut_invalido_dv_7 = '6871733-0';
        const rut_invalido_dv_8 = '18603582-0';
        const rut_invalido_dv_9 = '20527791-0';
        const rut_invalido_dv_k = '19240343-0';
        const rut_invalido_dv_mayor_100M = '102.333.445-0';

        expect(isDvValido(rut_invalido_dv_0)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_1)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_2)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_3)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_4)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_5)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_6)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_7)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_8)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_9)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_k)).toEqual(false);
        expect(isDvValido(rut_invalido_dv_mayor_100M)).toEqual(false);
    });





    //getCleanRut()
    it('cuando getCleanRut(), recibe un rut válido, debe devolver el rut entregado en mayuscula, sin puntos ni guiones',()=>{
        
        const rut_sinPuntos_sinGuion_sinEspacios      ='123456789';
        const rut_sinPuntos_conGuion_sinEspacios      ='12345678-9';
        const rut_conPuntos_conGuion_sinEspacios      ='12.345.678-9';
        const rut_conPuntos_conGuion_conEspacios      ='1 2.345 .678 -9';
        const rut_conK_conPuntos_conGuion_conEspacios ='1 2.345 .678 -k';
      

        const rut_esperado      = '123456789';
        const rut_conK_esperado = '12345678K';


        expect(getCleanRut(rut_sinPuntos_sinGuion_sinEspacios)).toEqual(rut_esperado);
        expect(getCleanRut(rut_sinPuntos_conGuion_sinEspacios)).toEqual(rut_esperado);
        expect(getCleanRut(rut_conPuntos_conGuion_sinEspacios)).toEqual(rut_esperado);
        expect(getCleanRut(rut_conPuntos_conGuion_conEspacios)).toEqual(rut_esperado);
        expect(getCleanRut(rut_conK_conPuntos_conGuion_conEspacios)).toEqual(rut_conK_esperado);
    });

    it('cuando getCleanRut(), recibe un rut INVALIDO, debe devolver el rut entregado en mayuscula, sin puntos ni guiones',()=>{
        
        const rut_invalido_noRut     ='1ab .-cde';
        const rut_invalido_largo     ='.- 1';

        const rut_esperado_invalido_noRut     ='1ABCDE';
        const rut_esperado_invalido_largo     ='1';



        expect(getCleanRut(rut_invalido_noRut)).toEqual(rut_esperado_invalido_noRut);
        expect(getCleanRut(rut_invalido_largo)).toEqual(rut_esperado_invalido_largo);
    });

    it('cuando getCleanRut(), recibe un texto vacio, debe devolver un string vacio',()=>{
        const rut      = '';
        const esperado = '';

        expect(getCleanRut(rut)).toEqual(esperado);
    });


    // getValidDV()
    it('cuando getValidDV(), recibe un rut con formato valido sin digito verificador, debe devolver el digito verficador valido del rut entregado',()=>{
        const rut_valido_dv_0 = '14680545';
        const rut_valido_dv_1 = '10174274';
        const rut_valido_dv_2 = '7231693';
        const rut_valido_dv_3 = '16483703';
        const rut_valido_dv_4 = '14153621';
        const rut_valido_dv_5 = '19235154';
        const rut_valido_dv_6 = '13811714';
        const rut_valido_dv_7 = '6871733';
        const rut_valido_dv_8 = '18603582';
        const rut_valido_dv_9 = '20527791';
        const rut_valido_dv_k = '19240343';
        const rut_valido_dv_mayor_100M = '102.333.444';

        expect(getValidDV(rut_valido_dv_0)).toEqual('0');
        expect(getValidDV(rut_valido_dv_1)).toEqual('1');
        expect(getValidDV(rut_valido_dv_2)).toEqual('2');
        expect(getValidDV(rut_valido_dv_3)).toEqual('3');
        expect(getValidDV(rut_valido_dv_4)).toEqual('4');
        expect(getValidDV(rut_valido_dv_5)).toEqual('5');
        expect(getValidDV(rut_valido_dv_6)).toEqual('6');
        expect(getValidDV(rut_valido_dv_7)).toEqual('7');
        expect(getValidDV(rut_valido_dv_8)).toEqual('8');
        expect(getValidDV(rut_valido_dv_9)).toEqual('9');
        expect(getValidDV(rut_valido_dv_k)).toEqual('K');
        expect(getValidDV(rut_valido_dv_mayor_100M)).toEqual('1');


    });
    it('cuando getValidDV(), recibe un rut con formato INVALIDO, debe devolver un string vacio',()=>{
        const rut_invalido_noRut     ='1ab .-cde';
        const rut_invalido_largo     ='.- 1';
        const rut_invalido_2K        ='12.345.67k-k';
        const rut_invalido_dv_letra  ='12.345.678-c';
        const rut_invalido_letra     ='12.a45.678-1';

        expect(extractRut(rut_invalido_noRut)).toBeFalsy();
        expect(extractRut(rut_invalido_largo)).toBeFalsy();
        expect(extractRut(rut_invalido_2K)).toBeFalsy();
        expect(extractRut(rut_invalido_dv_letra)).toBeFalsy();
        expect(extractRut(rut_invalido_letra)).toBeFalsy();


    });
    
    
    // getRutFormato()
    it('cuando getRutFormato(), recibe un rut con formato valido y  con digito verificador, debe devolver el rut entregado con puntos y guiones',()=>{
        const rut_conPuntos_conGuion_conEspacios_menor_10M  ='2345678-9';
        const rut_sinPuntos_sinGuion_sinEspacios      ='123456789';
        const rut_sinPuntos_conGuion_sinEspacios      ='12345678-9';
        const rut_conPuntos_conGuion_sinEspacios      ='12.345.678-9';
        const rut_conPuntos_conGuion_conEspacios      ='1 2.345 .678 -9';
        const rut_conK_conPuntos_conGuion_conEspacios ='1 2.345 .678 -k';
        const rut_conKMayus_conPuntos_conGuion_conEspacios  ='1 2.345 .678 -K';
        const rut_conPuntos_conGuion_conEspacios_mayor_100M ='102.345.678-9';





        const rut_esperado_menor_10M  = "2.345.678-9";
        const rut_esperado_10M        = "12.345.678-9";
        const rut_esperado_10M_conK    = "12.345.678-K";
        const rut_esperado_mayor_100M = "102.345.678-9";


        //falta de 1 digito
        const rut_digitos_1     ='1';
        const rut_digitos_2     ='12';
        const rut_digitos_3     ='123';
        const rut_digitos_4     ='1234';
        const rut_digitos_5     ='12345';
        const rut_digitos_6     ='123456';
        const rut_digitos_7     ='1234567';
        const rut_digitos_8     ='12345678';
        const rut_digitos_9     ='123456789';
        const rut_digitos_10    ='123456789k';
        
        const rut_esperado_digitos_1     ='1';
        const rut_esperado_digitos_2     ='1-2';
        const rut_esperado_digitos_3     ='12-3';
        const rut_esperado_digitos_4     ='123-4';
        const rut_esperado_digitos_5     ='1.234-5';
        const rut_esperado_digitos_6     ='12.345-6';
        const rut_esperado_digitos_7     ='123.456-7';
        const rut_esperado_digitos_8     ='1.234.567-8';
        const rut_esperado_digitos_9     ='12.345.678-9';
        const rut_esperado_digitos_10    ='123.456.789-K';




        expect(getRutFormato(rut_conPuntos_conGuion_conEspacios_menor_10M)).toEqual(rut_esperado_menor_10M);

        expect(getRutFormato(rut_sinPuntos_sinGuion_sinEspacios)).toEqual(rut_esperado_10M);
        expect(getRutFormato(rut_sinPuntos_conGuion_sinEspacios)).toEqual(rut_esperado_10M);
        expect(getRutFormato(rut_conPuntos_conGuion_conEspacios)).toEqual(rut_esperado_10M);
        expect(getRutFormato(rut_conPuntos_conGuion_sinEspacios)).toEqual(rut_esperado_10M);
        expect(getRutFormato(rut_conK_conPuntos_conGuion_conEspacios)).toEqual(rut_esperado_10M_conK);
        expect(getRutFormato(rut_conKMayus_conPuntos_conGuion_conEspacios)).toEqual(rut_esperado_10M_conK);

        expect(getRutFormato(rut_conPuntos_conGuion_conEspacios_mayor_100M)).toEqual(rut_esperado_mayor_100M);

        expect(getRutFormato(rut_digitos_1)).toEqual(rut_esperado_digitos_1);
        expect(getRutFormato(rut_digitos_2)).toEqual(rut_esperado_digitos_2);
        expect(getRutFormato(rut_digitos_3)).toEqual(rut_esperado_digitos_3);
        expect(getRutFormato(rut_digitos_4)).toEqual(rut_esperado_digitos_4);
        expect(getRutFormato(rut_digitos_5)).toEqual(rut_esperado_digitos_5);
        expect(getRutFormato(rut_digitos_6)).toEqual(rut_esperado_digitos_6);
        expect(getRutFormato(rut_digitos_7)).toEqual(rut_esperado_digitos_7);
        expect(getRutFormato(rut_digitos_8)).toEqual(rut_esperado_digitos_8);
        expect(getRutFormato(rut_digitos_9)).toEqual(rut_esperado_digitos_9);
        expect(getRutFormato(rut_digitos_10)).toEqual(rut_esperado_digitos_10);

    });

    it('cuando getRutFormato(), recibe un rut con formato INVALIDO, debe el mismo rut INVALIDO',()=>{
        const rut_invalido_digitos_1     ='a';
        const rut_invalido_digitos_2     ='a2';
        const rut_invalido_digitos_10    ='a23456789k';


        expect(getRutFormato(rut_invalido_digitos_1)).toEqual('a');
        expect(getRutFormato(rut_invalido_digitos_2)).toEqual(rut_invalido_digitos_2);
        expect(getRutFormato(rut_invalido_digitos_10)).toEqual(rut_invalido_digitos_10);
    });


    // getRutStatus()
    it('cuando getRutStatus(),recibe un rut con digito verificador, ',()=>{

        const rut_valido_dv_k_sinGuion = '19240343k';
        const rut_valido_dv_k_conGuion = '19240343-k';
        const rut_valido_dv_k_conPuntos_sinGuion = '19.240.343k';
        const rut_valido_dv_k_conPuntos_conGuion = '19.240.343-K';

        const objeto_esperado = { 
            rut:'19240343',
            dv:'K',
            formato:'19.240.343-K', 
   
            isRutValido:true,
            isDvValido:true,
            isFormatoValido:true
           }
        
        expect(getRutStatus(rut_valido_dv_k_conGuion)).toEqual(objeto_esperado);
        expect(getRutStatus(rut_valido_dv_k_sinGuion)).toEqual(objeto_esperado);
        expect(getRutStatus(rut_valido_dv_k_conPuntos_sinGuion)).toEqual(objeto_esperado);
        expect(getRutStatus(rut_valido_dv_k_conPuntos_conGuion)).toEqual(objeto_esperado);

    });

});