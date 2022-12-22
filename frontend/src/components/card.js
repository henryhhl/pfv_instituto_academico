
import React from 'react';
import PropTypes from 'prop-types';

export default function CardComponent( props ) {
    const [ search, onSearch ] = React.useState('');
    const [ timeoutSearch, setTimeoutSearch ] = React.useState( null );

    const setSearch = ( evt ) => {
        onSearch( evt.target.value );
        if ( timeoutSearch ) {
            clearTimeout( timeoutSearch );
            setTimeoutSearch(null);
        }
        let timeoutSearchValue = setTimeout( () => {
            props.onSearch(evt.target.value);
        }, 800);
        setTimeoutSearch( timeoutSearchValue );
    };

    return (
        <>
            <div className="card card-primary" style={props.style}>
                { props.isHeader === true &&
                    <div className="card-header">
                        <div className="float-right">
                            { props.isSearch === true &&
                                <>
                                    <div className="input-group">
                                        <input type="text" 
                                            className="form-control" 
                                            placeholder="Buscar..." 
                                            value={search}
                                            onChange={ setSearch }
                                        />
                                    <div className="input-group-btn">
                                        <button className="btn btn-primary">
                                            <i className="ion ion-search"></i>
                                        </button>
                                    </div>
                                    </div>
                                </>
                            }
                            { props.actions }
                        </div>
                        <h4>
                            { props.header }
                        </h4>
                    </div>
                }
                <div className="card-body pt-1">
                    { props.children }
                </div>
                <div className="card-footer">
                    { props.footer }
                </div>
            </div>
        </>
    );
};

CardComponent.propTypes = {
    actions: PropTypes.node,
    header: PropTypes.node,
    isHeader: PropTypes.bool,
    footer: PropTypes.node,
    isSearch: PropTypes.bool,
    onSearch: PropTypes.func,
    style: PropTypes.object,
}

CardComponent.defaultProps = {
    actions: <></>,
    header: <></>,
    footer: <></>,
    isSearch: false,
    isHeader: true,
    onSearch: () => {},
    style: {},
}
