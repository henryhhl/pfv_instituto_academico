
export const saveData = (key, data) => {
    let enco = btoa( btoa(data) );
    localStorage.setItem( key, enco );
};

export const saveMultiData = ( keys = [], datas = [] ) => {
    try {
        if ( keys.length !== datas.length ) return false;
        for (let i = 0; i < datas.length; i++) {
            let data = btoa( btoa( datas[i] ) );
            localStorage.setItem(keys[i], data);
        }
        return true;
    } catch (error) {
        return false;
    }
};

export const readData = (key) => {  
    try {
        let val = localStorage.getItem(key);
        let item = val === null ? null : atob( atob( val ) );
        return item; 
    } catch (error) {
        return null;
    }
};

export const removeData = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        return false;
    }
}

export const removeAllData = () => {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        return false;
    }
}
