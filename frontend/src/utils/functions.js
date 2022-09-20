
const cleanObejct = ( object = {} ) => {
    for (let index in object) {
        if ( typeof object[index] === 'boolean' ) {
            object[index] = false;
        } else {
            if ( Array.isArray( object[index] ) ) {
                object[index] = [];
            } else {
                if ( typeof object[index] === 'object' ) {
                    for ( let data in object[index] ) {
                        if ( typeof object[index][data] === 'boolean' ) {
                            object[index][data] = false;
                        } else {
                            if ( Array.isArray( object[index][data] ) ) {
                                object[index][data]= [];
                            } else {
                                object[index][data] = "";
                            }
                        }
                    }
                } else {
                    object[index] = "";
                }
            }
        }
    }
};

export const Functions = {
    cleanObejct,
};
