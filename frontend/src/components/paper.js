
import React from 'react';
import PropTypes from 'prop-types';

export default function PaperComponent( props ) {
    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>
                            { props.title }
                        </div>
                        { props.create === true &&
                            <div className='float-right'>
                                <button type='button' 
                                    className='btn btn-sm btn-primary' 
                                    onClick={props.onCreate}
                                >
                                    Nuevo
                                </button>
                            </div>
                        }
                    </h1>
                    <div className="row">
                        <div className="col-12" style={{ marginBottom: 50, }}>
                            { props.children }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

PaperComponent.propTypes = {
    title: PropTypes.node,
    create: PropTypes.bool,
    onCreate: PropTypes.func,
}

PaperComponent.defaultProps = {
    title: "",
    create: false,
    onCreate: () => {},
}
