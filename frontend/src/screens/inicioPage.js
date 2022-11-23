
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthActions } from '../redux/actions/auth/auth.action';

const InicioPage = ( props ) => {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin );
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Dashboard</div>
                    </h1>
                    <div className="row"></div>
                </section>
            </div>
        </>
    )
};

const mapStateToProps = null;

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
};

export default connect(mapStateToProps, mapDispatchToProps)( InicioPage );
