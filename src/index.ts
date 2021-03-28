
function removeSpaces (texto:string){
    return texto.replace(/ /g,'');
}
function removeDots(texto:string) {
    return texto.replace(/\./g,'');
}
function removeHyphens(texto:string) {
    return texto.replace(/\-/g,'');
}

function returnEmptyString(){
    return '';
}


    /**
     * Extrae el rut del string entregado, sin digito verificador.
     * @constructor
     * @param {string} rut - rut entregado
     */
     export function extractRut (rut:string){
        let _rut  = getCleanRut(rut);

        if(!isFormatoRutValido(rut)){
            return returnEmptyString();
        }

        return _rut.slice(0,-1);
    }


    /**
     * Extrae el digito verificado del string entregado
     * @constructor
     * @param {string} rut - rut entregado
     */
     export function extractDv(rut:string){
        let _rut  = getCleanRut(rut);
        
        if(!isFormatoRutValido(rut)){
           return returnEmptyString();
        }

        return _rut.slice(-1);
    }



    /**
     * Valida el formato del RUT entregado
     * @constructor
     * @param {string} rut - rut entregado
     */
     export function isFormatoRutValido (rut:string):boolean {
        let _rut = getCleanRut(rut);
        return  /^[0-9]+[0-9kK]{1}$/.test(_rut);
    }



    /**
     * Valida que el RUT entregado sea valido
     * @constructor
     * @param {string} rut - rut entregado
     */
     export function isRutValido (rut:string):boolean {
        return (isFormatoRutValido(rut) && isDvValido(rut));
    }



    /**
     * Valida que el digito verificador entregado es el correcto
     * @constructor
     * @param {string} rut - rut entregado
     */
     export function isDvValido  (rut:string):boolean{
        return (extractDv(rut) === getValidDV(extractRut(rut) ));
    }



    /**
     * Elimina puntos, espacios y guiones del rut entregado con valores en mayuscula
     * @constructor
     * @param {string} rut - rut entregado
     */
     export function getCleanRut  (rut:string) {

        let _rut = rut;
        _rut     = removeSpaces(rut);
        _rut     = removeDots(_rut);
        _rut     = removeHyphens(_rut);
        _rut     = _rut.toUpperCase();
        return _rut;
    }


    /**
     * Entrega el digito verificador que corresponde al rut entregado sin digito verificador
     * @constructor
     * @param {string} rut_sin_dv - rut sin dv
     */  
     export function getValidDV(rut_sin_dv:string):string{

        let _rut    = getCleanRut(rut_sin_dv);
        let  suma   = 0;
        let  factor = 2;
        let  dv     = -1;

        for(let digito = _rut.length -1 ; digito >= 0; digito--) {
            suma += ( (+_rut[digito]) * factor);
            factor = (factor === 7) ? 2 : factor+1;
        }  

        dv =  11 - (suma  -  (Math.floor(suma / 11) * 11));

        return  (dv === 11) ? '0' : (dv === 10)? 'K' : (''+dv);  
    }


    /**
     * Entrega el RUT entregado con puntos y guiones
     * @constructor
     * @param {string} rut - rut entregado
     */
     export function getRutFormato  (rut:string){
        if(rut.length === 1 || !isFormatoRutValido(rut)) {
            return rut;
        }

        let _rut   = extractRut(rut);
        let format = _rut.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return  `${format}-${extractDv(rut)}`;
    }

    
    /**
     * Entrega los distintos caracteristicas del RUT entregado
     * @constructor
     * @param {string} rut_con_dv - rut entregado
     */
    export function getRutStatus  (rut_con_dv:string) {

        return { 
             rut: getCleanRut(extractRut(rut_con_dv)),
             dv:getValidDV(extractRut(rut_con_dv)),
             formato:getRutFormato(rut_con_dv), 
    
             isRutValido :isRutValido(rut_con_dv) ,
             isDvValido:isDvValido(rut_con_dv),
             isFormatoValido:isFormatoRutValido(rut_con_dv)
            };
    }
    


