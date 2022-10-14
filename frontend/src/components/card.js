
import React from 'react';
import PropTypes from 'prop-types';

export default function CardComponent( props ) {
    const search = props.search ? props.search : undefined;
    return (
        <>
            <div className="card card-primary" style={props.style}>
                { props.isHeader === true &&
                    <div className="card-header">
                        <div className="float-right">
                            { props.isSearch === true &&
                                <form>
                                    <div className="input-group">
                                        <input type="text" 
                                            className="form-control" 
                                            placeholder="Buscar..." 
                                            value={search}
                                            onChange={ (evt) => props.onSearch(evt.target.value) }
                                        />
                                    <div className="input-group-btn">
                                        <button className="btn btn-secondary"><i className="ion ion-search"></i></button>
                                    </div>
                                    </div>
                                </form>
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
    search: PropTypes.any,
    onSearch: PropTypes.func,
    style: PropTypes.object,
}

CardComponent.defaultProps = {
    actions: <></>,
    header: <></>,
    footer: <></>,
    isSearch: false,
    isHeader: true,
    search: null,
    onSearch: () => {},
    style: {},
}
